import SectionHeading from "@/components/shared/SectionHeading";
import { useHashnodePosts } from "@/hooks/useHashnodePosts";
import { ABOUT } from "@/data/about";

export default function Writing() {
  const { posts, status } = useHashnodePosts(ABOUT.hashnodeUsername);

  return (
    <section id="writing" className="section">
      <SectionHeading
        eyebrow="writing"
        title="Writing"
        lede="Long-form on cloud, AI, and security."
      />

      {status === "ready" ? (
        <div className="grid gap-6 md:grid-cols-3">
          {posts.map((p) => (
            <a
              key={p.slug}
              href={p.url}
              target="_blank"
              rel="noreferrer"
              className="card overflow-hidden flex flex-col group hover:-translate-y-1 transition-transform"
            >
              {p.coverImage?.url && (
                <img
                  src={p.coverImage.url}
                  alt=""
                  className="aspect-video w-full object-cover"
                  loading="lazy"
                />
              )}
              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-display italic text-xl text-ink leading-tight">{p.title}</h3>
                <p className="text-sm text-muted mt-2 flex-1">{p.brief}</p>
                <p className="text-xs text-muted mt-3 uppercase tracking-wider">
                  {p.readTimeInMinutes} min read · Hashnode
                </p>
              </div>
            </a>
          ))}
        </div>
      ) : (
        <div className="card p-10 text-center">
          <p className="font-display italic text-2xl text-ink">Posts live on Hashnode</p>
          <p className="text-muted mt-2">Connect a username in <code>about.js</code> to auto-pull the latest 3.</p>
          {ABOUT.links.hashnode && (
            <a
              href={ABOUT.links.hashnode}
              target="_blank"
              rel="noreferrer"
              className="btn-solid mt-6"
            >
              read on hashnode →
            </a>
          )}
        </div>
      )}
    </section>
  );
}
