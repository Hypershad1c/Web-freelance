import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Pillars from "@/components/Pillars";
import Quartiers from "@/components/Quartiers";
import AmbianceGallery from "@/components/AmbianceGallery";
import Biens from "@/components/Biens";
import Personas from "@/components/Personas";
import Funnel from "@/components/Funnel";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <Pillars />
      <Quartiers />
      <AmbianceGallery lang="fr" />
      <Biens />
      <Personas />
      <Funnel />
      <Testimonials />
      <Contact />
      <Footer />
      <ScrollReveal />
    </>
  );
}
