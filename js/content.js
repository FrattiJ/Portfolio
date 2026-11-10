/*
 * ============================================================
 *  CONTENT FILE: this is the only file you need to edit.
 * ============================================================
 *
 *  Everything on the site is generated from the objects below.
 *  To add a project, video, artwork, or job: copy an existing entry,
 *  paste it, and change the values. Save, refresh, done.
 *
 *  Anything marked TODO is still waiting on you.
 *
 *  Status values used across the site:
 *    "shipped"  -> done / live
 *    "active"   -> currently working on it
 *    "planned"  -> on the roadmap, not started
 */

const SITE = {
  /* ---------- Identity ---------- */
  name: "FrattiJ",
  realName: "Jacob Fratti",
  tagline: "Pricing analyst by day. I build the tools behind the numbers at work, and small apps for fun at home.",
  intro:
    "Six years in beverage alcohol distribution, now a Pricing Specialist at Reyes Beverage Group, " +
    "finishing an MBA in Business Analytics at UCF. At work I built the Python and Snowflake " +
    "tool our pricing team runs every month. Outside work I build apps in Next.js and Supabase for fun.",
  location: "Orlando, FL",
  availability: "MBA, Business Analytics, August 2027",

  /* ---------- Links (leave url "" to hide a link) ---------- */
  links: [
    { label: "GitHub", url: "https://github.com/FrattiJ" },
    { label: "YouTube", url: "" }, // TODO: "https://www.youtube.com/@Fratti" once the first video is up
    { label: "LinkedIn", url: "" }, // TODO: your profile URL
    { label: "Email", url: "" }, // TODO: "mailto:..." if you want it public
  ],

  /* Pull your latest public repos from GitHub automatically.
     Set to "" to turn this off. */
  githubUser: "FrattiJ",
  githubRepoCount: 6,

  /* ---------- About ---------- */
  about: {
    paragraphs: [
      "I came up through the field side of beverage distribution: five years running analytics and " +
        "reporting for 56 Walgreens and CVS locations, then a year owning performance for high-volume " +
        "Walmart and Target stores. In March 2026 I moved into pricing, where I own costing and pricing " +
        "models for about 150 accounts across 12 supplier portfolios. The part I enjoy most is taking a " +
        "process that eats a day every cycle and turning it into one click.",
      "Code started with the UCF Full Stack boot camp in 2024 and stuck. Now I build things for fun, " +
        "usually tools I want for myself: a backlog and workout tracker, a private newsletter for my family, and a " +
        "character builder for the tabletop games I run. Away from the keyboard I am working through a " +
        "structured drawing curriculum.",
    ],
    skills: {
      "Pricing & Analytics": ["Alteryx Designer", "SQL", "Snowflake", "Excel (advanced)", "Power BI"],
      Code: ["TypeScript", "JavaScript", "Python", "React", "Next.js", "Supabase / Postgres", "Vite"],
      Tools: ["Git", "Vercel", "GitHub Pages", "Salesforce", "Claude Code"],
      Creative: ["Drawing", "Tabletop game design"],
    },
  },

  /* ---------- Projects ----------
     category: "code" | "video" | "art" | "other"
     The "process" list is the "how I did it" write-up shown when someone
     clicks a project. Write each step as a short heading + a sentence or two.
     image: optional path like "assets/projects/my-thing.png"
  */
  projects: [
    {
      id: "pricing-tool",
      title: "Pricing Tool",
      category: "work",
      status: "shipped",
      year: "2026",
      summary:
        "A Python desktop app that runs the pricing team's monthly processes: it pulls the data from Snowflake, validates it, and builds the Excel files the team works from.",
      tags: ["Python", "SQL", "Snowflake", "PyInstaller", "Excel"],
      links: [],
      image: "",
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
      id: "hobbylog",
      title: "Hobbylog",
      category: "code",
      status: "shipped",
      year: "2026",
      summary:
        "One backlog for games, movies, TV, books, manga, hands-on hobbies and workouts, with auto-filled details, friends, and suggestions built from your own habits.",
      tags: ["Next.js 16", "React 19", "TypeScript", "Supabase", "Postgres RLS", "Tailwind", "Vercel"],
      links: [
        { label: "Live app", url: "https://hobbylog-web.vercel.app" },
        { label: "Source", url: "https://github.com/FrattiJ/hobbylog-web" },
      ],
      image: "",
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
      category: "code",
      status: "shipped",
      year: "2026",
      summary:
        "A private site where anyone in the family can post a story. Each one lands on a newspaper-style page and is emailed to everyone at once.",
      tags: ["Next.js 16", "React 19", "TypeScript", "Supabase", "SMTP", "Vercel"],
      links: [{ label: "Source", url: "https://github.com/FrattiJ/Family-Newsletter" }],
      image: "",
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
      category: "code",
      status: "shipped",
      year: "2026",
      summary:
        "A step-by-step character builder for D&D 5e (2024) and the Neon Odyssey homebrew setting, with a live sheet and PDF, PNG and JSON export.",
      tags: ["React", "TypeScript", "Vite", "GitHub Actions", "GitHub Pages"],
      links: [
        { label: "Live app", url: "https://frattij.github.io/DeadInTheWater/" },
        { label: "Source", url: "https://github.com/FrattiJ/DeadInTheWater" },
      ],
      image: "",
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
    {
      id: "drawing-curriculum",
      title: "Learning to Draw, Properly",
      category: "art",
      status: "active",
      year: "2026",
      summary:
        "A structured, multi-year drawing curriculum starting from Drawabox fundamentals: lines, ellipses, boxes, the 250 Box Challenge, organic forms.",
      tags: ["Drawabox", "Ink", "Sketchbook"],
      links: [],
      image: "",
      process: [
        {
          title: "Approach",
          text: "Two fixed sessions a week, worked strictly in order. Behind schedule is fine; skipping ahead is not.",
        },
        {
          title: "What critique taught me",
          text: "Six critiques flagged the same two habits: draw from the shoulder, not the wrist, and plot both end points before every line.",
        },
        {
          title: "Milestone",
          text: "Phase 1 ends at the first checkpoint in February 2027. Finished pages go in the Art section as they come.",
        },
      ],
    },
  ],

  /* ---------- Roadmap: what you plan to do ----------
     column: "now" | "next" | "later"
  */
  roadmap: [
    { column: "now", title: "MBA, Business Analytics", note: "Evening classes at UCF, graduating August 2027." },
    { column: "now", title: "Pricing Tool", note: "Logging the hours and errors it saves each cycle." },
    { column: "now", title: "Drawing fundamentals", note: "Phase 1 of the curriculum, through February 2027." },
    { column: "next", title: "First YouTube upload", note: "Jurassic Park, Random Island: Part 1. Everything but the recording is done." },
    { column: "next", title: "Supply chain network redesign write-up", note: "An MBA case: a distribution network rebuilt around a disruption, profitable over 30 simulated days." },
    { column: "later", title: "Lead a pricing function", note: "Senior pricing or revenue management after graduation, then owning the function." },
  ],

  /* ---------- YouTube ----------
     channelUrl: link to the channel once it exists.
     videos: add entries with the YouTube video ID (the part after "v=" in the URL).
     While videos is empty, the section shows a "coming soon" panel with the plans below.
  */
  youtube: {
    channelUrl: "", // TODO: "https://www.youtube.com/@Fratti"
    pitch: "Long, low-key gaming sessions. Play what you want, no plan.",
    plannedTopics: [
      "Jurassic Park, Random Island: a Jurassic World Evolution 3 series on a random island with no plan",
      "A park tour episode once the island is big enough to show off",
    ],
    videos: [
      // { id: "dQw4w9WgXcQ", title: "Jurassic Park, Random Island: Part 1", date: "2027-01-01" },
    ],
  },

  /* ---------- Art ----------
     Put images in assets/art/ and reference them here.
     While this list is empty the section says finished pages are on the way.
  */
  art: [
    // { title: "250 Box Challenge, page 1", medium: "Ink", year: "2026", image: "assets/art/boxes-01.jpg" },
  ],

  /* ---------- Resume ----------
     pdf: put a copy WITHOUT phone number or home address at assets/resume.pdf
     and set the path here. "" hides the button.
  */
  resume: {
    pdf: "",
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
