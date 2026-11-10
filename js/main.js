/* Renders the site from SITE (defined in content.js). You should not need to edit this file. */
(function () {
  "use strict";

  const $ = (sel) => document.querySelector(sel);

  // Tiny element builder: h("div", { class: "x", onclick: fn }, child1, "text", ...)
  function h(tag, attrs, ...children) {
    const el = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs || {})) {
      if (v === undefined || v === null || v === false) continue;
      if (k.startsWith("on") && typeof v === "function") el.addEventListener(k.slice(2), v);
      else if (k === "class") el.className = v;
      else el.setAttribute(k, v === true ? "" : v);
    }
    for (const c of children.flat()) {
      if (c === null || c === undefined || c === false) continue;
      el.append(c instanceof Node ? c : document.createTextNode(String(c)));
    }
    return el;
  }

  const has = (s) => typeof s === "string" && s.trim() !== "";
  const isExternal = (url) => /^https?:/.test(url);
  const linkAttrs = (url) =>
    isExternal(url) ? { href: url, target: "_blank", rel: "noopener noreferrer" } : { href: url };

  const STATUS_LABEL = { shipped: "In use", active: "In progress", planned: "Planned" };
  const statusPill = (s) => h("span", { class: `pill status-${s}` }, STATUS_LABEL[s] || s);
  const visibleLinks = (links) => (links || []).filter((l) => has(l.url));

  /* ---------- Theme ---------- */
  function initTheme() {
    $("#themeToggle").addEventListener("click", () => {
      const root = document.documentElement;
      const current =
        root.dataset.theme ||
        (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
      const next = current === "dark" ? "light" : "dark";
      root.dataset.theme = next;
      try {
        localStorage.setItem("theme", next);
      } catch (e) {}
    });
  }

  /* ---------- Hero ---------- */
  function renderHero() {
    document.title = SITE.title ? `${SITE.name} | ${SITE.title}` : SITE.name;
    $("#brand").textContent = SITE.name;
    $("#heroEyebrow").textContent = [SITE.title, SITE.location].filter(has).join("  /  ");
    $("#heroName").textContent = SITE.name;
    $("#heroTagline").textContent = SITE.tagline;
    $("#heroIntro").textContent = SITE.intro;

    const links = visibleLinks(SITE.links);
    const r = SITE.resume || {};
    $("#heroLinks").append(
      ...[
        has(r.pdf) ? h("a", { class: "btn primary", href: r.pdf, download: "" }, "Download resume") : null,
        ...links.map((l, i) =>
          h("a", { class: !has(r.pdf) && i === 0 ? "btn primary" : "btn", ...linkAttrs(l.url) }, l.label)
        ),
      ].filter(Boolean)
    );

    $("#heroStats").append(
      ...(SITE.highlights || []).map((s) =>
        h("div", {}, h("dt", {}, s.label), h("dd", {}, s.value))
      )
    );
  }

  /* ---------- About ---------- */
  function renderAbout() {
    const a = SITE.about || {};
    const g = SITE.goals || {};
    $("#aboutBody").append(
      ...[
      h("div", { class: "about-text" }, (a.paragraphs || []).map((p) => h("p", {}, p))),
      (g.paragraphs || []).length || (g.points || []).length
        ? h(
            "aside",
            { class: "goals" },
            h("h3", { class: "mono" }, g.heading || "What I am looking for"),
            (g.paragraphs || []).map((p) => h("p", {}, p)),
            (g.points || []).length ? h("ul", {}, g.points.map((p) => h("li", {}, p))) : null
          )
        : null,
      ].filter(Boolean)
    );
  }

  /* ---------- Timelines (experience, education) ---------- */
  function timeline(title, items) {
    if (!(items || []).length) return null;
    return h(
      "div",
      { class: "timeline" },
      title ? h("h3", { class: "mono" }, title) : null,
      items.map((x) =>
        h(
          "article",
          {},
          h(
            "div",
            { class: "when mono" },
            [x.start, x.end].filter(has).filter((v, i, a) => a.indexOf(v) === i).join(" - ")
          ),
          h(
            "div",
            {},
            h("h4", {}, x.role),
            h("p", { class: "org" }, x.org),
            (x.points || []).length ? h("ul", {}, x.points.map((pt) => h("li", {}, pt))) : null
          )
        )
      )
    );
  }

  function renderExperience() {
    const r = SITE.resume || {};
    if (has(r.pdf)) {
      $("#resumeDownload").append(h("a", { href: r.pdf, download: "" }, "Download the full resume (PDF)."));
    }
    const t = timeline("", r.experience);
    if (t) $("#experienceBody").append(t);
  }

  /* ---------- Projects ---------- */
  function renderProjects() {
    const wrap = $("#projectGroups");
    for (const group of SITE.projectGroups || []) {
      const items = SITE.projects.filter((p) => p.group === group.id);
      if (!items.length) continue;
      wrap.append(
        h(
          "div",
          { class: "project-group" },
          h("h3", { class: "sub mono" }, group.title),
          has(group.note) ? h("p", { class: "group-note" }, group.note) : null,
          h("div", { class: "grid projects" }, items.map(projectCard))
        )
      );
    }
  }

  function projectCard(p) {
    return h(
      "button",
      { class: "card", onclick: () => openProject(p), "aria-haspopup": "dialog" },
      h(
        "div",
        { class: "card-body" },
        h("div", { class: "card-meta mono" }, h("span", {}, p.year), statusPill(p.status)),
        h("h3", {}, p.title),
        h("p", {}, p.summary),
        (p.tags || []).length ? h("ul", { class: "tags small" }, p.tags.map((t) => h("li", { class: "mono" }, t))) : null,
        h("div", { class: "card-foot" }, h("span", { class: "more mono" }, "Read more →"))
      )
    );
  }

  function openProject(p) {
    const body = $("#modalBody");
    const links = visibleLinks(p.links);
    body.replaceChildren(
      ...[
        h("div", { class: "card-meta mono" }, h("span", {}, p.year), statusPill(p.status)),
        h("h2", { id: "modalTitle" }, p.title),
        h("p", { class: "lede" }, p.summary),
        has(p.image) ? h("img", { class: "modal-img", src: p.image, alt: p.title }) : null,
        (p.tags || []).length ? h("ul", { class: "tags" }, p.tags.map((t) => h("li", { class: "mono" }, t))) : null,
        (p.process || []).length
          ? h("ol", { class: "process" }, p.process.map((s) => h("li", {}, h("h4", {}, s.title), h("p", {}, s.text))))
          : null,
        links.length
          ? h("div", { class: "hero-links" }, links.map((l) => h("a", { class: "btn", ...linkAttrs(l.url) }, l.label)))
          : null,
      ].filter(Boolean)
    );
    history.replaceState(null, "", `#project/${p.id}`);
    $("#projectModal").showModal();
  }

  function initModal() {
    const modal = $("#projectModal");
    $("#modalClose").addEventListener("click", () => modal.close());
    modal.addEventListener("click", (e) => {
      if (e.target === modal) modal.close();
    });
    modal.addEventListener("close", () => {
      if (location.hash.startsWith("#project/")) history.replaceState(null, "", "#projects");
    });
    // Deep link: site.com/#project/pricing-tool opens that project.
    const m = location.hash.match(/^#project\/(.+)$/);
    if (m) {
      const p = SITE.projects.find((x) => x.id === decodeURIComponent(m[1]));
      if (p) openProject(p);
    }
  }

  /* ---------- Skills and education ---------- */
  function renderSkills() {
    $("#skillsBody").append(
      ...Object.entries(SITE.skills || {}).map(([group, items]) =>
        h(
          "div",
          {},
          h("h3", { class: "mono" }, group),
          h("ul", { class: "tags" }, items.map((s) => h("li", { class: "mono" }, s)))
        )
      )
    );
    const t = timeline("Education", (SITE.resume || {}).education);
    if (t) $("#educationBody").append(t);
  }

  /* ---------- Footer ---------- */
  function renderFooter() {
    $("#footerText").textContent = `© ${new Date().getFullYear()} ${SITE.name}`;
    $("#footerLinks").append(...visibleLinks(SITE.links).map((l) => h("a", linkAttrs(l.url), l.label)));
  }

  initTheme();
  renderHero();
  renderAbout();
  renderExperience();
  renderProjects();
  renderSkills();
  renderFooter();
  initModal();
})();
