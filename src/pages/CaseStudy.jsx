import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import PageTransition from "@/components/shared/PageTransition";
import SEO from "@/components/seo/SEO";
import Nav from "@/components/shared/Nav";
import Footer from "@/components/sections/Footer";
import { PROJECTS } from "@/data/projects";

export default function CaseStudy() {
  const { slug } = useParams();
  const project = PROJECTS.find((p) => p.slug === slug);

  if (!project) {
    return (
      <PageTransition className="page-root">
        <Nav />
        <main className="section text-center">
          <p className="font-display italic text-3xl text-ink">No fruit by that name.</p>
          <Link to="/" className="btn-solid mt-6 inline-flex">
            <ArrowLeft size={16} /> back home
          </Link>
        </main>
        <Footer />
      </PageTransition>
    );
  }

  return (
    <PageTransition className="page-root">
      <SEO title={`${project.name} — Case Study`} description={project.summary} />
      <Nav />
      <main className="section max-w-prose">
        <Link to="/#work" className="inline-flex items-center gap-2 text-sm text-muted hover:text-ink">
          <ArrowLeft size={14} /> back to work
        </Link>
        <span className="pill mt-6">{project.status}</span>
        <h1 className="mt-4 font-display italic text-5xl md:text-6xl text-ink leading-[1.05]">
          {project.name}
        </h1>
        <p className="mt-3 eyebrow">
          {project.role} · {project.year}
        </p>
        <p className="mt-8 text-lg text-muted leading-relaxed">{project.description}</p>
        <div className="mt-8 flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span
              key={t}
              className="text-xs font-medium px-2.5 py-1 rounded-full border border-ink/20 text-muted"
            >
              {t}
            </span>
          ))}
        </div>
        <div className="mt-12 card p-8">
          <p className="eyebrow">case study</p>
          <p className="font-display italic text-2xl text-ink mt-2">
            Long-form write-up coming soon.
          </p>
          <p className="text-muted mt-2">
            Architecture diagrams, decisions log, and outcomes will live here.
          </p>
        </div>
      </main>
      <Footer />
    </PageTransition>
  );
}
