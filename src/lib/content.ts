// ---------------------------------------------------------------------------
// SITE CONTENT
// Everything on the page that's actual text/data lives here so you can edit
// your bio, roles, and links without touching component/animation code.
// Replace the placeholder/draft bits (marked TODO) with your own wording.
// ---------------------------------------------------------------------------

export const site = {
  name: "Benedict Dielenberg-Loo",
  shortName: "Ben",
  title: "Key Account Manager & B2B Growth Operator",
  location: "Sydney, NSW, Australia",
  tagline:
    "I build client relationships and the systems behind them — from wholesale account growth to the automation that runs quietly underneath.",
  email: "benedictwhloo@gmail.com",
  social: {
    linkedin: "https://www.linkedin.com/in/", // TODO: add your LinkedIn slug
    github: "https://github.com/", // TODO: add if you use GitHub
  },
};

export const about = {
  heading: "About",
  paragraphs: [
    "I'm Ben — a Key Account Manager at Acme Group, a Sydney-based national B2B wholesale business specialising in uniforms, workwear, and promotional products. My work spans sales, account management, business development, and product data operations across WooCommerce and Shopify, serving corporate, government, SME, sporting club, charity, and school clients across Australia.",
    "Before Acme, I picked up range across Apple, Microsoft, Atlassian, CathRx, and Les Yeux Media — a mix of retail, big tech, medtech, and media that shapes how I approach client work: equal parts relationship-first and systems-minded.",
    "Outside the day job, I work independently as an NDIS support worker, and I spend a fair amount of time exploring AI tooling and automation — this site included.",
  ],
};

export type ExperienceEntry = {
  role: string;
  org: string;
  period: string;
  description: string;
};

export const experience: ExperienceEntry[] = [
  {
    role: "Key Account Manager",
    org: "Acme Group",
    period: "Current",
    description:
      "Sales, account management, and business development for a national B2B wholesale business (uniforms, workwear, promotional products), plus product data operations across WooCommerce and Shopify.",
  },
  {
    role: "NDIS Support Worker",
    org: "Independent (Sole Trader)",
    period: "Ongoing",
    description:
      "Operating independently under my own ABN, providing support work alongside my role at Acme.",
  },
  {
    role: "Prior experience",
    org: "Apple · Microsoft · Atlassian · CathRx · Les Yeux Media",
    period: "TODO: add dates",
    description:
      "Roles spanning retail and technical support, enterprise software, medical device technology, and media production. TODO: expand each into its own entry with specifics.",
  },
];

export type ProjectEntry = {
  title: string;
  blurb: string;
  tags: string[];
  href?: string;
};

export const projects: ProjectEntry[] = [
  {
    title: "Horse Racing Industry BD Directory",
    blurb:
      "A researched PDF and contact directory covering major Australian thoroughbred studs and trainers, built to support new business development outreach.",
    tags: ["Business Development", "Research"],
  },
  {
    title: "AI Tooling & Automation Exploration",
    blurb:
      "Ongoing hands-on work with Claude Code, Claude Desktop, MCP servers, and agent architectures — applied to real workflows rather than kept theoretical.",
    tags: ["AI", "Automation"],
  },
  {
    title: "This Site",
    blurb:
      "A personal site built with Next.js, GSAP, and Lenis — scroll-driven animation, GSAP-animated geometric shapes, and interactive UI put together end to end.",
    tags: ["Next.js", "GSAP", "Lenis"],
    href: "https://github.com/", // TODO: link the repo once it's pushed
  },
  // TODO: add more projects — case studies, side projects, whatever you want visible.
];

export const writing = {
  heading: "Writing",
  intro:
    "Notes and longer-form pieces will land here. TODO: wire this up to real posts (MDX, a CMS, or hand-written pages) once you have content ready.",
  placeholderPosts: [
    {
      title: "Coming soon",
      excerpt: "This section is scaffolded and ready — drop your first post in.",
      date: "TBD",
    },
  ],
};

export const contact = {
  heading: "Get in touch",
  blurb:
    "Best way to reach me is email. Open to conversations about B2B growth, account strategy, or AI-assisted workflows.",
};
