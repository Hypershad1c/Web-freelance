import { PrismaClient, PropertyType, PropertyStatus, ListingPurpose, AgentRole } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // --- Admin agent ---
  // Change this password after first login. This is seed data, not a
  // production credential — do not deploy with this literal password.
  const passwordHash = await bcrypt.hash("Ok123456", 10);
  const admin = await prisma.agent.upsert({
    where: { email: "admin@domify.ma" },
    update: {},
    create: {
      name: "Zakaria — Admin",
      email: "admin@domify.ma",
      passwordHash,
      role: AgentRole.ADMIN,
    },
  });

  // --- Neighborhoods ---
  const neighborhoods = [
    {
      slug: "californie",
      name: "Californie",
      avgPriceM2: 22000,
      demandLevel: "high",
      translations: {
        fr: { description: "Quartier résidentiel prisé, proche des grands axes.", lifestyle: "Familial, calme", nearbyServices: ["Écoles internationales", "Centres commerciaux"] },
        ar: { description: "حي راقي وهادئ، قريب من الطرق الرئيسية.", lifestyle: "عائلي، هادئ", nearbyServices: ["مدارس دولية", "مراكز تجارية"] },
        en: { description: "Sought-after residential area, close to main roads.", lifestyle: "Family-friendly, quiet", nearbyServices: ["International schools", "Shopping centers"] },
      },
    },
    {
      slug: "ain-diab",
      name: "Ain Diab",
      avgPriceM2: 26000,
      demandLevel: "high",
      translations: {
        fr: { description: "Bord de mer, quartier animé et prestigieux.", lifestyle: "Balnéaire, dynamique", nearbyServices: ["Plages", "Restaurants", "Corniche"] },
        ar: { description: "حي على البحر، معروف بالرقي والحيوية.", lifestyle: "على البحر، نشيط", nearbyServices: ["الشاطئ", "مطاعم", "الكورنيش"] },
        en: { description: "Seafront, lively and prestigious district.", lifestyle: "Beachfront, vibrant", nearbyServices: ["Beaches", "Restaurants", "Corniche"] },
      },
    },
    {
      slug: "maarif",
      name: "Maarif",
      avgPriceM2: 19000,
      demandLevel: "medium",
      translations: {
        fr: { description: "Quartier central, commerçant et bien desservi.", lifestyle: "Urbain, pratique", nearbyServices: ["Commerces", "Transports"] },
        ar: { description: "حي فوسط المدينة، فيه جميع المرافق والمحلات.", lifestyle: "مديني، عملي", nearbyServices: ["محلات", "مواصلات"] },
        en: { description: "Central, commercial, well-served district.", lifestyle: "Urban, convenient", nearbyServices: ["Shops", "Transport"] },
      },
    },
    {
      slug: "racine",
      name: "Racine",
      avgPriceM2: 21000,
      demandLevel: "medium",
      translations: {
        fr: { description: "Quartier résidentiel élégant proche du centre.", lifestyle: "Chic, résidentiel", nearbyServices: ["Cliniques", "Écoles"] },
        ar: { description: "حي راقي وقريب من وسط المدينة.", lifestyle: "راقي، سكني", nearbyServices: ["مصحات", "مدارس"] },
        en: { description: "Elegant residential district near downtown.", lifestyle: "Upscale, residential", nearbyServices: ["Clinics", "Schools"] },
      },
    },
    {
      slug: "bouskoura",
      name: "Bouskoura",
      avgPriceM2: 14000,
      demandLevel: "high",
      translations: {
        fr: { description: "Zone en forte croissance, villas et golf.", lifestyle: "Vert, résidentiel", nearbyServices: ["Golf", "Forêt", "Nouvelles écoles"] },
        ar: { description: "منطقة كتطور بسرعة، فيها فيلات ومساحات خضراء.", lifestyle: "أخضر، سكني", nearbyServices: ["الغولف", "الغابة", "مدارس جديدة"] },
        en: { description: "Fast-growing area, villas and golf.", lifestyle: "Green, residential", nearbyServices: ["Golf course", "Forest", "New schools"] },
      },
    },
  ];

  const createdNeighborhoods = [];
  for (const n of neighborhoods) {
    const record = await prisma.neighborhood.upsert({
      where: { slug: n.slug },
      update: {},
      create: n,
    });
    createdNeighborhoods.push(record);
  }

  // --- Properties (2 per neighborhood, mix of types) ---
  const propertyTemplates = [
    { type: PropertyType.APARTMENT, bedrooms: 3, bathrooms: 2, surfaceM2: 120, price: 2400000, hasPool: false, hasParking: true, hasGarden: false },
    { type: PropertyType.VILLA, bedrooms: 5, bathrooms: 4, surfaceM2: 350, price: 8500000, hasPool: true, hasParking: true, hasGarden: true },
  ];

  let ref = 1;
  for (const neighborhood of createdNeighborhoods) {
    for (const template of propertyTemplates) {
      const reference = `DOM-${String(ref).padStart(4, "0")}`;
      const slug = `${neighborhood.slug}-${template.type.toLowerCase()}-${ref}`;
      await prisma.property.upsert({
        where: { reference },
        update: {},
        create: {
          slug,
          reference,
          type: template.type,
          purpose: ListingPurpose.SALE,
          status: PropertyStatus.PUBLISHED,
          price: template.price,
          surfaceM2: template.surfaceM2,
          bedrooms: template.bedrooms,
          bathrooms: template.bathrooms,
          hasPool: template.hasPool,
          hasParking: template.hasParking,
          hasGarden: template.hasGarden,
          neighborhoodId: neighborhood.id,
          agentId: admin.id,
          featured: ref <= 3,
          translations: {
            fr: {
              title: `${template.type === "VILLA" ? "Villa" : "Appartement"} à ${neighborhood.name}`,
              description: `Beau bien de ${template.surfaceM2}m² situé à ${neighborhood.name}, proche de toutes commodités.`,
              amenities: template.hasPool ? ["Piscine", "Jardin", "Parking"] : ["Parking", "Ascenseur"],
            },
            ar: {
              title: `${template.type === "VILLA" ? "فيلا" : "شقة"} فـ ${neighborhood.name}`,
              description: `عقار زوين بمساحة ${template.surfaceM2} متر مربع، كاين فـ ${neighborhood.name} وقريب من جميع المرافق.`,
              amenities: template.hasPool ? ["بيسين", "جردة", "باركينغ"] : ["باركينغ", "أسانسور"],
            },
            en: {
              title: `${template.type === "VILLA" ? "Villa" : "Apartment"} in ${neighborhood.name}`,
              description: `Beautiful ${template.surfaceM2}m² property located in ${neighborhood.name}, close to all amenities.`,
              amenities: template.hasPool ? ["Pool", "Garden", "Parking"] : ["Parking", "Elevator"],
            },
          },
        },
      });
      ref++;
    }
  }

  console.log(`Seeded: 1 admin agent, ${createdNeighborhoods.length} neighborhoods, ${ref - 1} properties.`);
  console.log(`Admin login: admin@domify.ma / ChangeMe123!  (change this before going live)`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
