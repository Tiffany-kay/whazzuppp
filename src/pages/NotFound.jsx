import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import PageTransition from "@/components/shared/PageTransition";
import SEO from "@/components/seo/SEO";
import Nav from "@/components/shared/Nav";
import Footer from "@/components/sections/Footer";

export default function NotFound() {
  return (
    <PageTransition className="page-root">
      <SEO title="Lost in the canopy — 404" description="This branch doesn't exist." />
      <Nav />
      <main className="section text-center flex-1 flex flex-col items-center justify-center">
        <p className="eyebrow">404</p>
        <h1 className="mt-3 font-display italic font-black text-6xl md:text-7xl text-ink">
          Lost in the canopy.
        </h1>
        <p className="text-muted mt-4 max-w-md">
          That branch doesn't exist. Let's head back to the trunk.
        </p>
        <Link to="/" className="btn-solid mt-8 inline-flex">
          <ArrowLeft size={16} /> back home
        </Link>
      </main>
      <Footer />
    </PageTransition>
  );
}
