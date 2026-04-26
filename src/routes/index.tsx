import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { Stats } from "@/components/site/Stats";
import { Domaines } from "@/components/site/Domaines";
import { Profil } from "@/components/site/Profil";
import { Approche } from "@/components/site/Approche";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div style={{ backgroundColor: "#ffffff" }}>
      <Nav />
      <main>
        <Hero />
        <Stats />
        <Domaines />
        <Profil />
        <Approche />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
