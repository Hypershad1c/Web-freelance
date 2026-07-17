import { z } from "zod";

export const leadSchema = z.object({
  fullName: z.string().min(2, "Nom trop court"),
  phone: z.string().min(9, "Numéro invalide"),
  email: z.string().email().optional().or(z.literal("")),
  preferredLocale: z.enum(["fr", "ar", "en"]).default("fr"),
  intent: z.enum(["BUYING", "SELLING"]).optional(),
  budgetMin: z.number().int().positive().optional(),
  budgetMax: z.number().int().positive().optional(),
  neighborhoodPref: z.string().optional(),
  propertyTypePref: z
    .enum(["APARTMENT", "VILLA", "RIVAD", "PENTHOUSE", "LAND", "OFFICE", "COMMERCIAL"])
    .optional(),
  bedroomsPref: z.number().int().min(0).optional(),
  moveInTimeline: z.string().optional(),
  source: z.enum([
    "CONTACT_FORM",
    "PROPERTY_INQUIRY",
    "WHATSAPP_CLICK",
    "VALUATION_FORM",
    "SCHEDULE_VISIT",
  ]),
  notes: z.string().optional(),
  propertyId: z.string().optional(),
});

export type LeadInput = z.infer<typeof leadSchema>;

// Property Valuation form extends the base lead with address/surface details.
// These live in `notes` as structured text for now — promote to dedicated
// columns if valuation volume justifies it later.
export const valuationSchema = leadSchema.extend({
  propertyAddress: z.string().min(5),
  surfaceM2: z.number().int().positive(),
  bedrooms: z.number().int().min(0),
  bathrooms: z.number().int().min(0),
});

export type ValuationInput = z.infer<typeof valuationSchema>;
