// ---------------------------------------------------------------------------
// SITE CONTENT
// Everything on the page that's actual text/data lives here so you can edit
// copy without touching component or animation code.
// Sourced from Ben's LinkedIn (Sept 2026). Items still needing input are
// marked TODO.
// ---------------------------------------------------------------------------

export const site = {
  name: "Benedict Dielenberg-Loo",
  shortName: "Ben",
  title: "Full-Cycle Account Manager at Acme Group",
  location: "Sydney, NSW, Australia",
  tagline:
    "I build client relationships and the systems behind them, from wholesale account growth to the automation that runs quietly underneath.",
  email: "benedictwhloo@gmail.com",
  social: {
    linkedin: "https://www.linkedin.com/in/", // TODO: add your LinkedIn slug
    lesyeuxmedia: "https://lesyeuxmedia.com",
  },
};

export const about = {
  heading: "About",
  paragraphs: [
    "I'm Ben, a full-cycle account manager at Acme Group, a Sydney-based national B2B wholesale business in uniforms, workwear and promotional products. I joined as an SDR building outbound pipeline from scratch, and now run accounts end to end across corporate, government, SME, sporting club, charity and school clients.",
    "The route here was not a straight line. Technical support and IT analysis at Atlassian and Blackbird, where I spent most of my time automating things that shouldn't have been manual. Investment analysis at Cana Capital, building an automated trading system and assessing ECM opportunities. Sales at Microsoft and Apple before that. It adds up to a way of working that is equal parts relationship-first and systems-minded.",
    "Alongside Acme I run Les Yeux Media, a photo and video practice, and work independently as an NDIS support worker. Most of my spare attention goes to AI tooling and automation, this site included.",
  ],
};

export const stats = [
  { to: 13, suffix: "", label: "Organisations worked with" },
  { to: 3, suffix: "", label: "Roles running in parallel" },
  { to: 11, suffix: "+", label: "Years in sales and tech" },
];

export type ExperienceEntry = {
  role: string;
  org: string;
  period: string;
  description: string;
};

export const experience: ExperienceEntry[] = [
  {
    role: "Full-Cycle Account Manager",
    org: "Acme Group",
    period: "Feb 2026 — Present",
    description:
      "Running B2B accounts end to end for a national wholesale distributor of uniforms, workwear and branded merchandise. Joined May 2025 as a Sales Development Representative, building a self-sourced outbound pipeline across industry verticals, holding a 100% same-day response rate on inbound quote requests, and working a catalogue of 3,000+ locally and internationally sourced items. Moved into full-cycle account management in Feb 2026.",
  },
  {
    role: "Founder & Creative Director",
    org: "Les Yeux Media",
    period: "Jul 2023 — Present",
    description:
      "Photography and videography practice based in Sydney, covering commercial and event work. I handle the shooting, the edit, the client relationship and the business behind it.",
  },
  {
    role: "Investment Analyst",
    org: "Cana Capital",
    period: "Aug 2024 — Apr 2025",
    description:
      "Executed forex trading strategies using technical analysis and built an automated trading system on GitHub and AWS Lightsail for remote execution and backtesting of technical strategies. Analysed ECM opportunities up to $5M with a focus on event-driven IPOs, and developed broker relationships across domestic and international markets to source dealflow.",
  },
  {
    role: "IT Analyst",
    org: "Blackbird",
    period: "Feb 2023 — Jul 2023",
    description:
      "Led a revamp of internal processes to standardise technology practice across the firm. Implemented MDM tooling (JAMF, SentinelOne, Cisco Meraki) that cut device setup time by 50%, worked with external consultants on ISO/IEC 27017 and GDPR compliance, and automated 100+ internal tasks through Zapier.",
  },
  {
    role: "Junior Technical Support Analyst",
    org: "Atlassian",
    period: "Jun 2021 — Jan 2023",
    description:
      "Hardware and software asset management across JAMF, Workspace One, Apple Business Manager and Jira, plus custom Python workflow automation and a Slack API integration. Managed Active Directory for 2,500 users and built 30+ Confluence documentation resources that cut support ticket volume by 15%.",
  },
  {
    role: "Previously",
    org: "Microsoft · Apple · CathRx · National Australia Bank",
    period: "2014 — 2021",
    description:
      "SMB and EDU cloud sales at Microsoft. Operations and product specialist roles at Apple Broadway. Product development engineering on reposable catheters at CathRx. A corporate and private banking internship at NAB. Earlier still, robotics education and luxury retail at Christian Louboutin.",
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
    title: "Les Yeux Media",
    blurb:
      "My photo and video practice. Commercial and event work around Sydney, run end to end from first contact through to final delivery.",
    tags: ["Photography", "Video", "Founder"],
    href: "https://lesyeuxmedia.com",
  },
  {
    title: "Horse Racing Industry Directory",
    blurb:
      "A researched PDF and contact directory covering major Australian thoroughbred studs and trainers, built to open new business development conversations at Acme.",
    tags: ["Business Development", "Research"],
  },
  {
    title: "Automated Trading System",
    blurb:
      "Built at Cana Capital on GitHub and AWS Lightsail, enabling remote trade execution and backtesting of technical strategies.",
    tags: ["Python", "AWS", "Finance"],
  },
  {
    title: "This Site",
    blurb:
      "Built with Next.js, GSAP and Lenis. Scroll-driven animation, GSAP-animated geometric shapes and interactive UI, put together end to end.",
    tags: ["Next.js", "GSAP", "Lenis"],
    href: "https://github.com/benedictwhloo/itsbenedict",
  },
];

export const writing = {
  heading: "Writing",
  intro:
    "Notes and longer-form pieces will land here. TODO: wire this up to real posts (MDX, a CMS, or hand-written pages) once you have content ready.",
  placeholderPosts: [
    {
      title: "Coming soon",
      excerpt: "This section is scaffolded and ready, drop your first post in.",
      date: "TBD",
    },
  ],
};

export const contact = {
  heading: "Get in touch",
  blurb:
    "Best way to reach me is email. Open to conversations about B2B growth, account strategy, or AI-assisted workflows.",
};