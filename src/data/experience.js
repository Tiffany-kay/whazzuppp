export const EXPERIENCE = [
  {
    id: "plintcart-freelance",
    company: "PlintCart · Freelance Client",
    role: "Freelance Software Developer",
    period: "2025",
    location: "Remote · Nairobi",
    summary:
      "Solo build of a serverless e-commerce platform for an independent retailer trading in low-bandwidth markets.",
    bullets: [
      "Implemented M-Pesa STK Push and webhook handlers on Netlify Functions with full idempotency.",
      "Hardened Firestore: admin, products, and orders collections each scoped to least-privilege rules.",
      "Added edge caching so checkout stays responsive on patchy 3G connections.",
      "Owned the engagement end-to-end — scoping, delivery, hand-off, post-launch fixes.",
    ],
  },
  {
    id: "adamur",
    company: "Adamur",
    role: "Software Development Intern",
    period: "2025",
    location: "Hybrid · Nairobi",
    summary:
      "Backend contributions on Adamur's core platform, focused on REST API performance and modular extensions.",
    bullets: [
      "Cut user-to-API p95 latency by reworking blocking calls and request batching.",
      "Authored MD70-style technical specs for new platform extension modules.",
      "Integrated third-party services into the backend behind idempotent handlers.",
    ],
  },
  {
    id: "koolabs",
    company: "KooLabs",
    role: "Cloud Architecture Lab",
    period: "2026",
    location: "Huawei Cloud sandbox",
    summary:
      "Architecture lab work on AI inference acceleration and cloud security inside isolated Huawei Cloud environments.",
    bullets: [
      "Profiled inference acceleration modules under sustained load to surface stability ceilings.",
      "Audited VPC, IAM, and security-group configurations against threat models.",
      "Captured findings as repeatable lab playbooks for the rest of the cohort.",
    ],
  },
];
