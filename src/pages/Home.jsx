import PageTransition from "@/components/shared/PageTransition";
import SEO from "@/components/seo/SEO";
import Nav from "@/components/shared/Nav";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import ProjectsGrid from "@/components/sections/ProjectsGrid";
import Credentials from "@/components/sections/Credentials";
import Writing from "@/components/sections/Writing";
import Community from "@/components/sections/Community";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <PageTransition className="page-root">
      <SEO
        title="Tiffany Gathoni — Cloud, AI & Security Engineer"
        description="Portfolio of Tiffany Gathoni — Software Developer specializing in Cloud, AI & Security Engineering. Based in Nairobi."
      />
      <Nav />
      <main>
        <Hero />
        <About />
        <Experience />
        <ProjectsGrid />
        <Credentials />
        <Writing />
        <Community />
        <Contact />
      </main>
      <Footer />
    </PageTransition>
  );
}
