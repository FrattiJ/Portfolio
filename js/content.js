/*
 * ============================================================
 *  CONTENT FILE: this is the only file you need to edit.
 * ============================================================
 *
 *  Everything on the site is generated from the objects below.
 *  To add a project, video, artwork, or job: copy an existing entry,
 *  paste it, and change the values. Save, refresh, done.
 *
 *  Anything marked TODO is placeholder text for you to replace.
 *
 *  Status values used across the site:
 *    "shipped"  -> done / live
 *    "active"   -> currently working on it
 *    "planned"  -> on the roadmap, not started
 */

const SITE = {
  /* ---------- Identity ---------- */
  name: "FrattiJ",
  realName: "", // TODO: optional, e.g. "Jane Fratti". Leave "" to hide.
  tagline: "I build things, make things, and write down how I did it.",
  intro:
    "TODO: two or three sentences about who you are. What you do, what you care about, " +
    "and what someone should know about you in the first ten seconds.",
  location: "", // TODO: optional, e.g. "Chicago, IL"
  availability: "", // TODO: optional, e.g. "Open to internships for Summer 2027"

  /* ---------- Links (leave url "" to hide a link) ---------- */
  links: [
    { label: "GitHub", url: "https://github.com/FrattiJ" },
    { label: "YouTube", url: "" }, // TODO: add once the channel exists
    { label: "LinkedIn", url: "" }, // TODO
    { label: "Email", url: "" }, // TODO: e.g. "mailto:you@example.com"
  ],

  /* Pull your latest public repos from GitHub automatically.
     Set to "" to turn this off. */
  githubUser: "FrattiJ",
  githubRepoCount: 6,

  /* ---------- About ---------- */
  about: {
    paragraphs: [
      "TODO: Your story. How you got into building things, what you are learning right now, " +
        "and what you want to be doing in a few years.",
      "TODO: A second paragraph about the non-code side of you: art, video, hobbies, whatever " +
        "makes you you.",
    ],
    skills: {
      Languages: ["TODO", "Python", "JavaScript"],
      Tools: ["Git", "TODO"],
      Creative: ["TODO", "Video editing", "Illustration"],
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
      id: "this-site",
      title: "This Portfolio",
      category: "code",
      status: "shipped",
      year: "2026",
      summary:
        "The site you are looking at. A dependency-free static site driven by a single content file.",
      tags: ["HTML", "CSS", "JavaScript", "GitHub Pages"],
      links: [{ label: "Source", url: "https://github.com/FrattiJ/Portfolio" }],
      image: "",
      process: [
        {
          title: "Goal",
          text: "One place that answers \"who is FrattiJ?\": code, resume, videos, and art, plus what is coming next.",
        },
        {
          title: "Approach",
          text: "No framework and no build step. All content lives in js/content.js and the page renders itself from it, so updating the site is editing a list.",
        },
        {
          title: "What I learned",
          text: "TODO: write what you learned once you start customizing it.",
        },
      ],
    },
    {
      id: "code-project-1",
      title: "TODO: Code Project",
      category: "code",
      status: "active",
      year: "2026",
      summary: "TODO: One sentence on what it does and why it exists.",
      tags: ["TODO", "Python"],
      links: [
        { label: "Source", url: "" },
        { label: "Demo", url: "" },
      ],
      image: "",
      process: [
        { title: "Problem", text: "TODO: What were you trying to solve?" },
        { title: "Build", text: "TODO: How did you build it? Key decisions and tools." },
        { title: "Hard part", text: "TODO: What broke, and how did you fix it?" },
        { title: "Result", text: "TODO: What does it do now? Any numbers, users, or feedback?" },
      ],
    },
    {
      id: "art-series-1",
      title: "TODO: Art Series",
      category: "art",
      status: "shipped",
      year: "2025",
      summary: "TODO: A short note about a body of artwork. Pieces go in the Art section below.",
      tags: ["Illustration"],
      links: [],
      image: "",
      process: [
        { title: "Inspiration", text: "TODO" },
        { title: "Medium and tools", text: "TODO" },
      ],
    },
  ],

  /* ---------- Roadmap: what you plan to do ----------
     column: "now" | "next" | "later"
  */
  roadmap: [
    { column: "now", title: "Launch this portfolio", note: "Fill in content and deploy on GitHub Pages." },
    { column: "now", title: "TODO: Current project", note: "TODO" },
    { column: "next", title: "Start the YouTube channel", note: "TODO: what the channel will be about." },
    { column: "next", title: "TODO", note: "TODO" },
    { column: "later", title: "TODO: Big goal", note: "TODO: something ambitious." },
  ],

  /* ---------- YouTube ----------
     channelUrl: link to the channel once it exists.
     videos: add entries with the YouTube video ID (the part after "v=" in the URL).
     While videos is empty, the section shows a "coming soon" panel with the plans below.
  */
  youtube: {
    channelUrl: "",
    pitch: "TODO: One line on what the channel will be. Example: \"Building projects from scratch and showing every mistake along the way.\"",
    plannedTopics: ["TODO: video idea 1", "TODO: video idea 2", "TODO: video idea 3"],
    videos: [
      // { id: "dQw4w9WgXcQ", title: "My first video", date: "2027-01-01" },
    ],
  },

  /* ---------- Art ----------
     Put images in assets/art/ and reference them here.
     Leave image "" to show a placeholder tile.
  */
  art: [
    { title: "TODO: Piece title", medium: "Digital", year: "2025", image: "" },
    { title: "TODO: Piece title", medium: "Ink", year: "2025", image: "" },
    { title: "TODO: Piece title", medium: "Watercolor", year: "2024", image: "" },
    { title: "TODO: Piece title", medium: "Digital", year: "2024", image: "" },
  ],

  /* ---------- Resume ----------
     pdf: put your resume at assets/resume.pdf (or change the path). "" hides the button.
  */
  resume: {
    pdf: "", // TODO: "assets/resume.pdf"
    experience: [
      {
        role: "TODO: Role",
        org: "TODO: Company or organization",
        start: "2025",
        end: "Present",
        points: ["TODO: What you did, with a result if you have one.", "TODO"],
      },
    ],
    education: [
      {
        role: "TODO: Degree, program, or school",
        org: "TODO: Institution",
        start: "2022",
        end: "2026",
        points: ["TODO: Relevant coursework, honors, clubs."],
      },
    ],
  },
};
