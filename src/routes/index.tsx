import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { Marquee } from "@/components/site/Marquee";
import { Stats } from "@/components/site/Stats";
import { Domaines } from "@/components/site/Domaines";
import { Profil } from "@/components/site/Profil";
import { Approche } from "@/components/site/Approche";
import { Testimonials } from "@/components/site/Testimonials";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";
import { ScrollProgress } from "@/components/anim/ScrollProgress";
import { SectionDivider } from "@/components/anim/SectionDivider";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div style={{ backgroundColor: "#ffffff" }}>
      <ScrollProgress />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Stats />
        <SectionDivider />
        <Domaines />
        <SectionDivider />
        <Profil />
        <SectionDivider />
        <Approche />
        <SectionDivider />
        <Testimonials />
        <SectionDivider />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
