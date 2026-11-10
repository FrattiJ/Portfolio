/*
 * ============================================================
 *  CONTENT FILE: this is the only file you need to edit.
 * ============================================================
 *
 *  Everything on the site is generated from the objects below.
 *  Copy an existing entry, paste it, change the values. Save, refresh, done.
 */

const SITE = {
  /* ---------- Identity ---------- */
  name: "Jacob Fratti",
  title: "Pricing and Analytics",
  location: "Orlando, FL",
  tagline: "I build the automation that replaces manual pricing work, and I measure what it saves.",
  intro:
    "Six years in beverage alcohol distribution, from field analytics for national retail chains to " +
    "pricing for a multi-supplier portfolio. Pricing Specialist at Reyes Beverage Group, and finishing " +
    "an MBA in Business Analytics at UCF in August 2027.",

  /* ---------- Links (leave url "" to hide a link). The first one is the main button. ---------- */
  links: [
    { label: "LinkedIn", url: "https://www.linkedin.com/in/jacob-fratti" },
    { label: "GitHub", url: "https://github.com/FrattiJ" },
  ],

  /* ---------- The numbers under the intro ---------- */
  highlights: [
    { value: "6 yrs", label: "Beverage alcohol distribution" },
    { value: "~150", label: "Accounts priced, across 12 supplier portfolios" },
    { value: "6 hrs to 1 min", label: "Chain cost file, after automation" },
    { value: "1,800", label: "SKUs validated per supplier price book" },
  ],

  /* ---------- About ---------- */
  about: {
    paragraphs: [
      "I came up through the field side of beverage distribution: five years running analytics and " +
        "reporting for 56 Walgreens and CVS locations, then a year owning performance for high-volume " +
        "Walmart and Target stores. In March 2026 I moved into pricing, where I own costing and pricing " +
        "models for about 150 accounts across 12 supplier portfolios.",
      "The part I enjoy most is taking a process that eats a day every cycle and turning it into one " +
        "click. That is what the work projects below are. Outside work I write code for fun, which is " +
        "where the personal projects come from.",
    ],
  },

  /* ---------- Career goals (shown beside About) ---------- */
  goals: {
    heading: "Where I am headed",
    paragraphs: [
      "I am a pricing person who automates his own work. Six years of industry knowledge plus the " +
        "ability to build the tools behind the numbers is the combination I want to keep building on.",
      "Long term, I want to own pricing as a discipline: senior pricing analyst, then pricing manager, " +
        "then leading a pricing or revenue management function.",
    ],
    points: [
      "Pricing, cost and revenue analytics",
      "Most interested in defense and aerospace contract pricing, hospitality and travel revenue management, and healthcare",
      "Based in Orlando",
    ],
  },

  /* ---------- Projects ----------
     group: "work" | "personal" (the order and titles are set in projectGroups)
     The "process" list is the write-up shown when someone opens a project.
     status: "shipped" (shown as "In use") | "active" | "planned"
  */
  projectGroups: [
    { id: "work", title: "At work", note: "Internal tools. The code is not public, so these are write-ups." },
    { id: "personal", title: "Personal projects", note: "Built for fun, to learn, and because I wanted them to exist." },
  ],
  projects: [
    {
      id: "pricing-tool",
      title: "Pricing Tool",
      group: "work",
      status: "shipped",
      year: "2026",
      summary:
        "A Python desktop app that runs the pricing team's monthly processes: it pulls the data from Snowflake, validates it, and builds the Excel files the team works from.",
      tags: ["Python", "SQL", "Snowflake", "PyInstaller", "Excel"],
      links: [],
      process: [
        {
          title: "Problem",
          text: "The team's monthly pricing work (pricing runs, deal sheets, validation) was repetitive spreadsheet work done by hand every cycle.",
        },
        {
          title: "Build",
          text: "A Python app that runs the Snowflake queries, checks the results, and writes finished Excel output. Packaged with PyInstaller so teammates run it without installing Python.",
        },
        {
          title: "Shipping it",
          text: "Distributed through a shared folder, so everyone on the team gets each new version automatically.",
        },
        {
          title: "The constraint",
          text: "Data governance prohibits direct system writes, so the tool automates everything up to the controlled submission step and stops there. The code is internal and not public.",
        },
      ],
    },
    {
      id: "alteryx-workflows",
      title: "Alteryx Pricing Workflows",
      group: "work",
      status: "shipped",
      year: "2026",
      summary:
        "Two Alteryx workflows: one builds a chain's cost file in under a minute instead of six hours, the other validates a supplier's price book and generates the upload forms.",
      tags: ["Alteryx", "SQL", "Snowflake", "Excel"],
      links: [],
      process: [
        {
          title: "Chain cost file",
          text: "Extracts the pricing master, compares it against the chain's price file, surfaces every variance and outputs a corrected cost file for submission. Six hours of manual reconciliation across 400 SKUs became a single-click run of under a minute.",
        },
        {
          title: "Supplier price book",
          text: "Reconciles a 1,800-SKU supplier price book against internal records and generates the roughly 150 system upload forms each cycle needs. A multi-week process now takes about eight hours, with no transcription errors.",
        },
        {
          title: "The constraint",
          text: "Data governance prohibits direct system writes, so both workflows automate everything up to the controlled submission step and stop there.",
        },
      ],
    },
    {
      id: "hobbylog",
      title: "Hobbylog",
      group: "personal",
      status: "shipped",
      year: "2026",
      summary:
        "One backlog for games, movies, TV, books, manga, hands-on hobbies and workouts, with auto-filled details, friends, and suggestions built from your own habits.",
      tags: ["Next.js 16", "React 19", "TypeScript", "Supabase", "Postgres RLS", "Tailwind", "Vercel"],
      links: [
        { label: "Live app", url: "https://hobbylog-web.vercel.app" },
        { label: "Source", url: "https://github.com/FrattiJ/hobbylog-web" },
      ],
      process: [
        {
          title: "Problem",
          text: "I had a backlog tracker and a workout logger as two separate desktop apps, and neither synced to my phone. I wanted one place for everything I play, watch, read and lift, that friends could use with no setup.",
        },
        {
          title: "Build",
          text: "A server-rendered Next.js app on Vercel, backed by Supabase. A data adapter mirrors the old desktop app's API, so most of the UI ported over almost unchanged. Catalog searches (RAWG, TMDB, OpenLibrary, MyAnimeList, Steam) run server-side so the API keys stay secret.",
        },
        {
          title: "Hard part",
          text: "Keeping it multi-user and safe. Every table is protected by row-level security, friends read each other's libraries through a gated policy, and aggregate stats go through restricted database functions. Reading the stored session instead of asking the auth server on every call cut dozens of requests per screen on mobile.",
        },
        {
          title: "What Next",
          text: "Suggestions with no AI calls and no cost: a taste profile (genre affinity, finish rate by length, pace) built as a pure function over your own history, then used to rank your backlog, judge what to finish or drop, and ration new picks against how deep your backlog already is.",
        },
        {
          title: "Result",
          text: "Seven hobby types, an 873-exercise workout catalog, imports from MyAnimeList, Letterboxd and Goodreads, and a dependency-free Excel export. Live and in daily use.",
        },
      ],
    },
    {
      id: "family-newsletter",
      title: "The Family Newsletter",
      group: "personal",
      status: "shipped",
      year: "2026",
      summary:
        "A private site where anyone in the family can post a story. Each one lands on a newspaper-style page and is emailed to everyone at once.",
      tags: ["Next.js 16", "React 19", "TypeScript", "Supabase", "SMTP", "Vercel"],
      links: [{ label: "Source", url: "https://github.com/FrattiJ/Family-Newsletter" }],
      process: [
        {
          title: "Problem",
          text: "Family news was scattered across group texts. I wanted something a grandparent could use on a phone with nothing to learn: write a story, or read the newsletter.",
        },
        {
          title: "Build",
          text: "Next.js server actions for login and publishing, Supabase for stories and a private photo bucket, and plain SMTP for email so it runs free with no domain. Locally it needs no accounts at all: stories save to disk and emails are written to an outbox folder.",
        },
        {
          title: "Privacy",
          text: "One shared family password checked on the server, rate-limited guessing, sessions that all end when the password changes, photos served only through the site, one email per person so nobody sees anyone else's address, and the family list kept out of the repository entirely.",
        },
        {
          title: "Result",
          text: "Deployed on Vercel for free. Deleting a story is a soft delete, so a wrong tap can be undone.",
        },
      ],
    },
    {
      id: "dead-in-the-water",
      title: "Dead in the Water: Character Builder",
      group: "personal",
      status: "shipped",
      year: "2026",
      summary:
        "A step-by-step character builder for D&D 5e (2024) and the Neon Odyssey homebrew setting, with a live sheet and PDF, PNG and JSON export.",
      tags: ["React", "TypeScript", "Vite", "GitHub Actions", "GitHub Pages"],
      links: [
        { label: "Live app", url: "https://frattij.github.io/DeadInTheWater/" },
        { label: "Source", url: "https://github.com/FrattiJ/DeadInTheWater" },
      ],
      process: [
        {
          title: "Problem",
          text: "I ran a sci-fi one-shot on a homebrew ruleset layered over D&D, and building characters by hand from two rulebooks was the slowest part of the night.",
        },
        {
          title: "Build",
          text: "Both rulesets share one content schema, so the wizard, rules engine and sheet do not care which setting is loaded. The D&D side is generated from the CC-BY SRD datasets; the homebrew side is a hand-edited base file plus a reskin layer that clones SRD classes and renames them.",
        },
        {
          title: "Design choice",
          text: "No \"pick your game\" step. Every class shows both names, subclasses from both games are pooled, and a naming toggle flips the whole sheet between flavors without changing a single number.",
        },
        {
          title: "Result",
          text: "All 13 classes playable at levels 1 to 20, a print-exact two-page sheet modeled on the pregens, autosave, and automatic deploys to GitHub Pages.",
        },
      ],
    },
  ],

  /* ---------- Skills ---------- */
  skills: {
    "Pricing and analysis": ["Product costing", "Price reconciliation", "Variance analysis", "KPI reporting", "Demand forecasting"],
    "Data and BI": ["SQL", "Snowflake", "Alteryx Designer", "Excel (advanced)", "Power BI"],
    Programming: ["Python", "JavaScript"],
    Systems: ["Salesforce", "Proof CRM", "Git"],
  },

  /* ---------- Resume ---------- */
  resume: {
    experience: [
      {
        role: "Pricing Specialist, Shared Services Pricing",
        org: "Reyes Beverage Group, Orlando, FL",
        start: "Mar 2026",
        end: "Present",
        points: [
          "Built an Alteryx, SQL and Snowflake reconciliation workflow that compares the pricing master against customer price files and outputs a corrected cost file, cutting a six-hour, 400-SKU manual process to a one-click run under a minute.",
          "Built a supplier price book validation tool that reconciles 1,800-SKU price books against system records and generates the ~150 upload forms each cycle needs, compressing a multi-week process to about eight hours.",
          "Own product costing and pricing models for 9 chain accounts and about 150 total accounts across 12 supplier portfolios in spirits, RTD and non-alcoholic.",
          "Automate the full process up to the controlled submission boundary, within data governance rules that prohibit direct system writes.",
        ],
      },
      {
        role: "Sales Consultant II, Advantage Chains",
        org: "Southern Glazer's Wine & Spirits, Orlando, FL",
        start: "May 2025",
        end: "Mar 2026",
        points: [
          "Owned performance analysis and execution for 12 high-volume Walmart and Target locations.",
          "Analyzed sales, inventory and execution data to forecast demand and reduce out-of-stock risk.",
          "Built weekly and monthly KPI reporting in Salesforce and Proof CRM for account stakeholders.",
        ],
      },
      {
        role: "Sales Consultant, Advantage Chains",
        org: "Southern Glazer's Wine & Spirits, Orlando, FL",
        start: "Feb 2020",
        end: "May 2025",
        points: [
          "Managed analytics, reporting and operational planning for 56 Walgreens and CVS locations.",
        ],
      },
    ],
    education: [
      {
        role: "MBA, Business Analytics",
        org: "University of Central Florida",
        start: "",
        end: "Expected Aug 2027",
        points: [
          "Coursework: Business Intelligence, Data Visualization, Business Analytics with Python and R, Applied Business Research Tools, Managerial Accounting Analysis.",
        ],
      },
      {
        role: "Certificate, Full Stack Software Development",
        org: "University of Central Florida Coding Boot Camp",
        start: "2024",
        end: "2024",
        points: [],
      },
      {
        role: "BA, Communication",
        org: "Florida Gulf Coast University",
        start: "",
        end: "Dec 2019",
        points: [],
      },
    ],
  },
};
