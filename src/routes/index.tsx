import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { Stats } from "@/components/site/Stats";
import { Domaines } from "@/components/site/Domaines";
import { Profil } from "@/components/site/Profil";
import { Approche } from "@/components/site/Approche";
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
        <SectionDivider />
        <Stats />
        <SectionDivider />
        <Domaines />
        <SectionDivider />
        <Profil />
        <SectionDivider />
        <Approche />
        <SectionDivider />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
