import { useState } from "react";
import toast from "react-hot-toast";
import { Github, Linkedin, Mail, PenLine } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";
import { ABOUT } from "@/data/about";

export default function Contact() {
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    // Stub: wire to Formspree / serverless endpoint later.
    await new Promise((r) => setTimeout(r, 600));
    toast.success("Message queued — wiring this up next.");
    setSubmitting(false);
    e.target.reset();
  }

  return (
    <section id="contact" className="section">
      <SectionHeading
        eyebrow="contact"
        title="Let's build something."
        lede="Open to roles, collabs, and mentoring conversations."
      />

      <div className="grid gap-8 md:grid-cols-2">
        <div className="card p-6">
          <p className="eyebrow mb-3">book a call</p>
          <p className="font-display italic text-2xl text-ink">Calendly slots open here.</p>
          <p className="text-sm text-muted mt-2">
            Embed plugs in once <code>react-calendly</code> is installed and a URL is set.
          </p>
          <a
            href={ABOUT.links.calendly}
            target="_blank"
            rel="noreferrer"
            className="btn-solid mt-6 inline-flex"
          >
            open calendly →
          </a>
        </div>

        <form onSubmit={onSubmit} className="card p-6 space-y-4">
          <p className="eyebrow">drop a line</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field name="name" label="name" required />
            <Field name="email" type="email" label="email" required />
          </div>
          <Field name="subject" label="subject" required />
          <Field name="message" label="message" textarea required />
          <button type="submit" className="btn-solid" disabled={submitting}>
            {submitting ? "sending…" : "send →"}
          </button>
        </form>
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        <SocialLink href={`mailto:${ABOUT.links.email}`} icon={Mail} label="email" />
        <SocialLink href={ABOUT.links.github} icon={Github} label="github" />
        <SocialLink href={ABOUT.links.linkedin} icon={Linkedin} label="linkedin" />
        <SocialLink href={ABOUT.links.hashnode} icon={PenLine} label="hashnode" />
      </div>
    </section>
  );
}

function Field({ name, label, type = "text", textarea, required }) {
  const className =
    "w-full bg-bg/40 border border-ink/15 rounded-lg px-3 py-2 text-sm text-ink placeholder:text-muted/60 focus:outline-none focus:border-accent";
  return (
    <label className="block">
      <span className="block text-xs uppercase tracking-wider text-muted mb-1">{label}</span>
      {textarea ? (
        <textarea name={name} required={required} rows={4} className={className} />
      ) : (
        <input name={name} type={type} required={required} className={className} />
      )}
    </label>
  );
}

function SocialLink({ href, icon: Icon, label }) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel="noreferrer"
      className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-ink/20 text-sm text-ink hover:-translate-y-0.5 hover:border-ink/50 transition-all"
    >
      <Icon size={16} />
      <span className="uppercase tracking-wider text-xs font-semibold">{label}</span>
    </a>
  );
}
