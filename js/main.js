/* Renders the site from SITE (defined in content.js). You should not need to edit this file. */
(function () {
  "use strict";

  const $ = (sel) => document.querySelector(sel);
  const root = document.documentElement;

  // Straight quotes and three dots in content.js come out as the typographic ones on the page.
  const typo = (s) =>
    String(s)
      .replace(/\.\.\./g, "…")
      .replace(/(^|[\s(\[{])"/g, "$1“")
      .replace(/"/g, "”")
      .replace(/(^|[\s(\[{])'/g, "$1‘")
      .replace(/'/g, "’");

  // Tiny element builder: h("div", { class: "x", onclick: fn }, child1, "text", ...)
  function h(tag, attrs, ...children) {
    const el = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs || {})) {
      if (v === undefined || v === null || v === false) continue;
      if (k.startsWith("on") && typeof v === "function") el.addEventListener(k.slice(2), v);
      else if (k === "class") el.className = v;
      else el.setAttribute(k, v === true ? "" : v);
    }
    for (const c of children.flat(Infinity)) {
      if (c === null || c === undefined || c === false) continue;
      el.append(c instanceof Node ? c : document.createTextNode(typo(c)));
    }
    return el;
  }

  const has = (s) => typeof s === "string" && s.trim() !== "";
  const isExternal = (url) => /^https?:/.test(url);
  const linkAttrs = (url) =>
    isExternal(url) ? { href: url, target: "_blank", rel: "noopener noreferrer" } : { href: url };
  const newTabNote = (url) => (isExternal(url) ? h("span", { class: "vh" }, " (opens in a new tab)") : null);
  const visibleLinks = (links) => (links || []).filter((l) => has(l.url));

  const nb = (t) => String(t).replace(/ /g, "\u00A0"); // keeps a figure and its unit on one line
  const STATUS_LABEL = { shipped: "In use", active: "In progress", planned: "Planned" };
  const statusStamp = (s) => h("span", { class: "stamp" }, STATUS_LABEL[s] || s);
  const range = (x) =>
    [x.start, x.end]
      .filter(has)
      .filter((v, i, a) => a.indexOf(v) === i)
      .join(" to ");

  /* ---------- Brush lettering ----------
     The title font draws capitals in both cases, and its lowercase slots hold a second drawing of
     most letters. Every repeat of a letter takes the other drawing, so the two Ts in FRATTI are not
     the same stamp twice. The real text goes in aria-label; the lettered copy is decoration. */
  function alternates(text) {
    const seen = {};
    return [...text].map((ch) => {
      const key = ch.toLowerCase();
      if (!/[a-z]/.test(key)) return { ch, alt: false };
      seen[key] = (seen[key] || 0) + 1;
      return { ch, alt: seen[key] % 2 === 0 };
    });
  }
  function brush(text) {
    const words = [[]];
    for (const part of alternates(typo(text))) {
      if (/\s/.test(part.ch)) words.push([]);
      else words[words.length - 1].push(part.alt ? h("span", { class: "alt" }, part.ch) : part.ch);
    }
    const filled = words.filter((w) => w.length);
    return h(
      "span",
      { class: "brush", "aria-hidden": "true" },
      filled.map((w, i) => [h("span", { class: "w" }, w), i < filled.length - 1 ? " " : null])
    );
  }
  const lettered = (el, text) => {
    el.setAttribute("aria-label", text);
    el.replaceChildren(brush(text));
    return el;
  };

  /* ---------- Theme ---------- */
  const THEME_COLOR = { light: "#e8e8e3", dark: "#0e0e0e" };
  const systemDark = matchMedia("(prefers-color-scheme: dark)");
  const activeTheme = () => root.dataset.theme || (systemDark.matches ? "dark" : "light");

  function initTheme() {
    const btn = $("#themeToggle");
    const sync = () => btn.setAttribute("aria-pressed", String(activeTheme() === "dark"));
    btn.addEventListener("click", () => {
      const next = activeTheme() === "dark" ? "light" : "dark";
      root.dataset.theme = next;
      document
        .querySelectorAll('meta[name="theme-color"]')
        .forEach((m) => m.setAttribute("content", THEME_COLOR[next]));
      try {
        localStorage.setItem("theme", next);
      } catch (e) {}
      sync();
    });
    systemDark.addEventListener("change", sync);
    sync();
  }

  /* ---------- Hero ---------- */
  function renderHero() {
    document.title = SITE.title ? `${SITE.name} | ${SITE.title}` : SITE.name;

    const brand = $("#brand");
    brand.textContent = SITE.name;
    brand.setAttribute("aria-label", `${SITE.name}, back to top`);

    lettered($("#heroName"), SITE.name);
    $("#heroMeta").append(
      ...[SITE.title, SITE.location]
        .filter(has)
        .flatMap((t, i) => [i ? h("span", { class: "vh" }, ", ") : null, h("span", { class: "tape", style: `--i:${i}` }, t)])
        .filter(Boolean)
    );
    $("#heroTagline").textContent = typo(SITE.tagline || "");
    $("#heroIntro").textContent = typo(SITE.intro || "");

    $("#heroLinks").append(
      ...visibleLinks(SITE.links).map((l, i) =>
        h("a", { class: i === 0 ? "btn btn-ink" : "btn", ...linkAttrs(l.url) }, l.label, newTabNote(l.url))
      )
    );

    // The numbers go on as price stickers. A "was" value prints as a markdown: old figure struck out.
    $("#heroStats").append(
      ...(SITE.highlights || []).map((s, i) =>
        h(
          "div",
          { class: "sticker", style: `--i:${i}` },
          h("dt", {}, s.label),
          has(s.was)
            ? h(
                "dd",
                {},
                h("span", { class: "vh" }, "was "),
                h("s", {}, nb(s.was)),
                h("span", { class: "vh" }, ", now "),
                " ",
                h("b", {}, nb(s.value))
              )
            : h("dd", {}, nb(s.value))
        )
      )
    );

    drawFocusLines();
    fitName();
  }

  // Manga focus lines: thin ink wedges running in from the page edge toward the name.
  // Seeded, so the cover is the same drawing on every visit.
  function drawFocusLines() {
    const path = $("#focusLines path");
    if (!path) return;
    let seed = 20260311;
    const rnd = () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296);
    const cx = 480;
    const cy = 300;
    const count = 210;
    let d = "";
    for (let i = 0; i < count; i++) {
      const a = ((i + rnd() * 0.85) / count) * Math.PI * 2;
      const half = 0.001 + rnd() * rnd() * 0.0085;
      const reach = 0.72 + rnd() * 0.85; // how close the tip gets: 1 is the edge of the clear zone
      const far = 1700;
      // the clear zone is shallower above the name than below it, so lines frame the title all round
      const tipX = cx + Math.cos(a) * 560 * reach;
      const tipY = cy + Math.sin(a) * (Math.sin(a) < 0 ? 250 : 400) * reach;
      const p = (ang) => `${(cx + Math.cos(ang) * far).toFixed(1)} ${(cy + Math.sin(ang) * far).toFixed(1)}`;
      d += `M${p(a - half)}L${p(a + half)}L${tipX.toFixed(1)} ${tipY.toFixed(1)}Z`;
    }
    path.setAttribute("d", d);
  }

  // Size the name to the width of the cover. The ratios are measured from the real font, so a
  // different name in content.js still fills the line.
  function fitName() {
    const el = $("#heroName");
    if (!document.fonts || !document.fonts.load) return;
    const shown = (text) =>
      alternates(text)
        .map((p) => (p.alt ? p.ch.toLowerCase() : p.ch.toUpperCase()))
        .join("");
    document.fonts.load('100px "Dracutaz"').then(
      () => {
        const ctx = document.createElement("canvas").getContext("2d");
        if (!ctx) return;
        ctx.font = '100px "Dracutaz"';
        const full = shown(SITE.name);
        const line = ctx.measureText(full).width / 100;
        const word = Math.max(...full.split(/\s+/).map((w) => ctx.measureText(w).width)) / 100;
        if (!(line > 0)) return;
        el.style.setProperty("--fit-line", (line * 1.05).toFixed(3));
        el.style.setProperty("--fit-word", (word * 1.08).toFixed(3));
      },
      () => {}
    );
  }

  /* ---------- About ---------- */
  function renderAbout() {
    const a = SITE.about || {};
    const g = SITE.goals || {};
    const hasGoals = (g.paragraphs || []).length || (g.points || []).length;
    $("#aboutBody").append(
      ...[
        h("div", { class: "about-text" }, (a.paragraphs || []).map((p) => h("p", {}, p))),
        hasGoals
          ? h(
              "aside",
              { class: "note", "aria-labelledby": "goalsTitle" },
              h("h3", { class: "hand", id: "goalsTitle" }, g.heading || "What I am looking for"),
              (g.paragraphs || []).map((p) => h("p", {}, p)),
              (g.points || []).length ? h("ul", {}, g.points.map((p) => h("li", {}, p))) : null
            )
          : null,
      ].filter(Boolean)
    );
  }

  /* ---------- Experience: one manga panel per role ---------- */
  const pointList = (points) =>
    (points || []).length ? h("ul", { class: "points" }, points.map((pt) => h("li", {}, pt))) : null;

  function renderExperience() {
    const items = (SITE.resume || {}).experience || [];
    $("#experienceBody").append(
      ...items.map((x, i) =>
        h(
          "article",
          { class: "panel" },
          h(
            "div",
            { class: "panel-in" },
            // a click, lettered the way a manga panel would: the newest role is the one-click work
            i === 0 ? h("p", { class: "sfx sfx-panel", lang: "ja", "aria-hidden": "true" }, "カチッ") : null,
            has(range(x)) ? h("p", { class: "when" }, range(x)) : null,
            h("h3", {}, x.role),
            h("p", { class: "org" }, x.org),
            pointList(x.points)
          )
        )
      )
    );
  }

  /* ---------- Projects: a shelf of covers ---------- */
  function renderProjects() {
    const wrap = $("#projectGroups");
    for (const group of SITE.projectGroups || []) {
      const items = (SITE.projects || []).filter((p) => p.group === group.id);
      if (!items.length) continue;
      wrap.append(
        h(
          "div",
          { class: "shelf-group" },
          h("h3", { class: "hand" }, group.title),
          has(group.note) ? h("p", { class: "group-note" }, group.note) : null,
          h("div", { class: "shelf" }, items.map(projectCover))
        )
      );
    }
  }

  const techTags = (tags) =>
    (tags || []).length ? h("ul", { class: "tags", translate: "no" }, tags.map((t) => h("li", {}, t))) : null;

  function projectCover(p) {
    const open = lettered(h("button", { type: "button", "aria-haspopup": "dialog", onclick: () => openProject(p) }), p.title);
    return h(
      "article",
      { class: "vol" },
      h(
        "div",
        { class: "vol-cover" },
        h("p", { class: "vol-meta" }, h("span", {}, p.year), statusStamp(p.status)),
        h("h4", { class: "vol-title" }, open)
      ),
      h(
        "div",
        { class: "vol-body" },
        h("p", {}, p.summary),
        techTags(p.tags),
        h("p", { class: "vol-cue", "aria-hidden": "true" }, "Open the write-up")
      )
    );
  }

  /* ---------- Reader: the project write-up ---------- */
  function openProject(p) {
    const modal = $("#projectModal");
    const links = visibleLinks(p.links);
    $("#modalBody").replaceChildren(
      ...[
        h("p", { class: "reader-meta" }, h("span", {}, p.year), statusStamp(p.status)),
        lettered(h("h2", { id: "modalTitle" }), p.title),
        h("p", { class: "reader-lede" }, p.summary),
        has(p.image)
          ? h("img", { class: "reader-img", src: p.image, alt: p.imageAlt || `${p.title} screenshot`, decoding: "async" })
          : null,
        techTags(p.tags),
        (p.process || []).length
          ? h("ol", { class: "steps" }, p.process.map((s) => h("li", {}, h("h3", {}, s.title), h("p", {}, s.text))))
          : null,
        links.length
          ? h(
              "div",
              { class: "links" },
              links.map((l) => h("a", { class: "btn", ...linkAttrs(l.url) }, l.label, newTabNote(l.url)))
            )
          : null,
      ].filter(Boolean)
    );
    if (location.hash !== `#project/${p.id}`) history.replaceState(null, "", `#project/${p.id}`);
    if (!modal.open) modal.showModal();
    modal.scrollTop = 0;
  }

  // Each write-up has a link of its own: site.com/#project/pricing-tool opens it directly.
  function projectInHash() {
    const m = location.hash.match(/^#project\/(.+)$/);
    if (!m) return null;
    let id = m[1];
    try {
      id = decodeURIComponent(id);
    } catch (e) {}
    return (SITE.projects || []).find((x) => x.id === id) || null;
  }

  function initReader() {
    const modal = $("#projectModal");
    $("#modalClose").addEventListener("click", () => modal.close());
    modal.addEventListener("click", (e) => {
      if (e.target === modal) modal.close();
    });
    modal.addEventListener("close", () => {
      if (location.hash.startsWith("#project/")) history.replaceState(null, "", "#projects");
    });
    const syncToHash = () => {
      const p = projectInHash();
      if (p) openProject(p);
      else if (modal.open) modal.close();
    };
    window.addEventListener("hashchange", syncToHash);
    if (projectInHash()) syncToHash();
  }

  /* ---------- Skills and education ---------- */
  function renderSkills() {
    $("#skillsBody").append(
      ...Object.entries(SITE.skills || {}).map(([group, items]) =>
        h(
          "div",
          { class: "kit-group" },
          h("h3", { class: "hand" }, group),
          h("ul", { class: "tags" }, items.map((s) => h("li", {}, s)))
        )
      )
    );

    const education = (SITE.resume || {}).education || [];
    if (education.length) {
      $("#educationBody").append(
        h("h3", { class: "hand" }, "Education"),
        h(
          "ol",
          { class: "edu" },
          education.map((x) =>
            h(
              "li",
              {},
              has(range(x)) ? h("p", { class: "when" }, range(x)) : null,
              h("h4", {}, x.role),
              h("p", { class: "org" }, x.org),
              pointList(x.points)
            )
          )
        )
      );
    } else {
      $("#educationBody").remove();
    }
  }

  /* ---------- Footer ---------- */
  function renderFooter() {
    $("#footerText").textContent = `© ${new Date().getFullYear()} ${SITE.name}`;
    $("#footerLinks").append(
      ...visibleLinks(SITE.links).map((l) => h("a", linkAttrs(l.url), l.label, newTabNote(l.url)))
    );
  }

  /* ---------- Section marker in the top bar ---------- */
  function initSectionMarker() {
    if (!("IntersectionObserver" in window)) return;
    const links = [...document.querySelectorAll(".sections a")];
    const byId = new Map(links.map((a) => [a.getAttribute("href").slice(1), a]));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          links.forEach((a) => a.removeAttribute("aria-current"));
          const link = byId.get(e.target.id);
          if (link) link.setAttribute("aria-current", "location");
        }
      },
      { rootMargin: "-45% 0px -54% 0px" }
    );
    document.querySelectorAll("main > section[id]").forEach((s) => io.observe(s));
  }

  initTheme();
  renderHero();
  renderAbout();
  renderExperience();
  renderProjects();
  renderSkills();
  renderFooter();
  initReader();
  initSectionMarker();
})();
