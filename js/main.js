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

  const STATUS_LABEL = { shipped: "Shipped", active: "In progress", planned: "Planned" };
  const CATEGORY_LABEL = { work: "Work tool", code: "Hobby code", video: "Video", art: "Art", other: "Other" };

  // Deterministic gradient for placeholder tiles, so each card looks distinct.
  function hue(str) {
    let n = 0;
    for (const ch of str) n = (n * 31 + ch.charCodeAt(0)) % 360;
    return n;
  }
  function placeholder(label, seed) {
    const hh = hue(seed || label);
    const el = h("div", { class: "ph", "aria-hidden": "true" }, h("span", { class: "mono" }, label));
    el.style.setProperty("--h", hh);
    return el;
  }

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
    document.title = SITE.realName ? `${SITE.name} | ${SITE.realName}` : SITE.name;
    $("#brand").textContent = SITE.name;

    const bits = [SITE.location, SITE.availability].filter(has);
    $("#heroEyebrow").textContent = bits.length ? bits.join("  /  ") : "Hi, I'm";
    $("#heroName").textContent = SITE.realName ? `${SITE.realName}` : SITE.name;
    if (SITE.realName) $("#heroName").append(h("span", { class: "handle mono" }, ` aka ${SITE.name}`));
    $("#heroTagline").textContent = SITE.tagline;
    $("#heroIntro").textContent = SITE.intro;

    const links = visibleLinks(SITE.links);
    $("#heroLinks").append(
      h("a", { class: "btn primary", href: "#work" }, "See my work"),
      ...links.map((l) => h("a", { class: "btn", ...linkAttrs(l.url) }, l.label))
    );

    const stats = [
      ["Projects", SITE.projects.length],
      ["Shipped", SITE.projects.filter((p) => p.status === "shipped").length],
      ["In progress", SITE.projects.filter((p) => p.status === "active").length],
      ["Artworks", SITE.art.length],
    ].filter(([, v]) => v > 0);
    $("#heroStats").append(
      ...stats.map(([k, v]) => h("div", {}, h("dt", { class: "mono" }, k), h("dd", {}, v)))
    );
  }

  /* ---------- Projects ---------- */
  function renderProjects() {
    const cats = ["all", ...new Set(SITE.projects.map((p) => p.category))];
    const filters = $("#filters");
    const grid = $("#projectGrid");

    function draw(filter) {
      grid.replaceChildren(
        ...SITE.projects
          .filter((p) => filter === "all" || p.category === filter)
          .map(projectCard)
      );
      for (const b of filters.children) b.setAttribute("aria-selected", b.dataset.cat === filter);
    }

    filters.append(
      ...cats.map((c) =>
        h(
          "button",
          { role: "tab", "data-cat": c, onclick: () => draw(c) },
          c === "all" ? "All" : CATEGORY_LABEL[c] || c
        )
      )
    );
    draw("all");
  }

  function projectCard(p) {
    const media = has(p.image)
      ? h("img", { src: p.image, alt: "", loading: "lazy" })
      : placeholder(CATEGORY_LABEL[p.category] || p.category, p.id);
    return h(
      "button",
      { class: "card", onclick: () => openProject(p), "aria-haspopup": "dialog" },
      h("div", { class: "card-media" }, media),
      h(
        "div",
        { class: "card-body" },
        h("div", { class: "card-meta mono" }, h("span", {}, CATEGORY_LABEL[p.category] || p.category), h("span", {}, p.year)),
        h("h3", {}, p.title),
        h("p", {}, p.summary),
        h(
          "div",
          { class: "card-foot" },
          statusPill(p.status),
          h("span", { class: "more mono" }, "How I did it →")
        )
      )
    );
  }

  function openProject(p) {
    const body = $("#modalBody");
    const links = visibleLinks(p.links);
    body.replaceChildren();
    body.append(
      ...[
      h(
        "div",
        { class: "card-meta mono" },
        h("span", {}, CATEGORY_LABEL[p.category] || p.category),
        h("span", {}, p.year),
        statusPill(p.status)
      ),
      h("h2", { id: "modalTitle" }, p.title),
      h("p", { class: "lede" }, p.summary),
      has(p.image) ? h("img", { class: "modal-img", src: p.image, alt: p.title }) : null,
      (p.tags || []).length ? h("ul", { class: "tags" }, p.tags.map((t) => h("li", { class: "mono" }, t))) : null,
      (p.process || []).length
        ? h(
            "ol",
            { class: "process" },
            p.process.map((s) => h("li", {}, h("h4", {}, s.title), h("p", {}, s.text)))
          )
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
      if (location.hash.startsWith("#project/")) history.replaceState(null, "", "#work");
    });
    // Deep link: site.com/#project/this-site opens that project.
    const m = location.hash.match(/^#project\/(.+)$/);
    if (m) {
      const p = SITE.projects.find((x) => x.id === decodeURIComponent(m[1]));
      if (p) openProject(p);
    }
  }

  /* ---------- GitHub repos (live) ---------- */
  async function renderRepos() {
    if (!has(SITE.githubUser)) return;
    try {
      const res = await fetch(
        `https://api.github.com/users/${encodeURIComponent(SITE.githubUser)}/repos?sort=pushed&per_page=30`
      );
      if (!res.ok) return;
      const repos = (await res.json())
        .filter((r) => !r.fork)
        .slice(0, SITE.githubRepoCount || 6);
      if (!repos.length) return;
      $("#repoList").append(
        ...repos.map((r) =>
          h(
            "a",
            { class: "repo", ...linkAttrs(r.html_url) },
            h("strong", { class: "mono" }, r.name),
            h("p", {}, r.description || "No description yet."),
            h(
              "div",
              { class: "repo-meta mono" },
              r.language ? h("span", {}, r.language) : null,
              h("span", {}, `★ ${r.stargazers_count}`),
              h("span", {}, `Updated ${new Date(r.pushed_at).toLocaleDateString()}`)
            )
          )
        )
      );
      $("#reposWrap").hidden = false;
    } catch (e) {
      /* Offline or rate-limited: the section just stays hidden. */
    }
  }

  /* ---------- Roadmap ---------- */
  function renderRoadmap() {
    const cols = [
      ["now", "Now"],
      ["next", "Next"],
      ["later", "Later"],
    ];
    $("#roadmapBoard").append(
      ...cols.map(([key, label]) =>
        h(
          "div",
          { class: `col col-${key}` },
          h("h3", { class: "mono" }, label),
          h(
            "ul",
            {},
            SITE.roadmap
              .filter((r) => r.column === key)
              .map((r) => h("li", {}, h("strong", {}, r.title), has(r.note) ? h("p", {}, r.note) : null))
          )
        )
      )
    );
  }

  /* ---------- Videos ---------- */
  function renderVideos() {
    const yt = SITE.youtube || {};
    $("#videoPitch").textContent = yt.pitch || "";
    const body = $("#videoBody");
    const videos = yt.videos || [];

    if (!videos.length) {
      body.append(
        h(
          "div",
          { class: "coming" },
          h("span", { class: "pill status-planned" }, "Channel coming soon"),
          h("h3", {}, "Planned videos"),
          h("ul", {}, (yt.plannedTopics || []).map((t) => h("li", {}, t))),
          has(yt.channelUrl)
            ? h("a", { class: "btn primary", ...linkAttrs(yt.channelUrl) }, "Subscribe on YouTube")
            : null
        )
      );
      return;
    }

    body.append(
      h(
        "div",
        { class: "grid videos" },
        videos.map((v) =>
          h(
            "figure",
            { class: "video" },
            h(
              "div",
              { class: "video-frame" },
              h("iframe", {
                src: `https://www.youtube-nocookie.com/embed/${encodeURIComponent(v.id)}`,
                title: v.title,
                loading: "lazy",
                allow: "accelerometer; encrypted-media; gyroscope; picture-in-picture",
                allowfullscreen: true,
              })
            ),
            h("figcaption", {}, h("strong", {}, v.title), v.date ? h("span", { class: "mono" }, v.date) : null)
          )
        )
      ),
      has(yt.channelUrl)
        ? h("p", { class: "center" }, h("a", { class: "btn primary", ...linkAttrs(yt.channelUrl) }, "See the full channel"))
        : null
    );
  }

  /* ---------- Art ---------- */
  function renderArt() {
    const lb = $("#lightbox");
    $("#lightboxClose").addEventListener("click", () => lb.close());
    lb.addEventListener("click", (e) => {
      if (e.target === lb) lb.close();
    });

    if (!SITE.art.length) {
      $("#gallery").replaceWith(
        h("p", { class: "coming" }, "Finished pages are on the way. The drawing work in progress is under Work, filtered to Art.")
      );
      return;
    }
    $("#gallery").append(
      ...SITE.art.map((a, i) => {
        const caption = [a.title, a.medium, a.year].filter(has).join("  /  ");
        if (!has(a.image)) {
          return h(
            "figure",
            { class: "art" },
            placeholder(a.medium || "Art", a.title + i),
            h("figcaption", { class: "mono" }, caption)
          );
        }
        return h(
          "figure",
          { class: "art" },
          h(
            "button",
            {
              class: "art-btn",
              "aria-label": `Enlarge ${a.title}`,
              onclick: () => {
                $("#lightboxImg").src = a.image;
                $("#lightboxImg").alt = a.title;
                $("#lightboxCaption").textContent = caption;
                lb.showModal();
              },
            },
            h("img", { src: a.image, alt: a.title, loading: "lazy" })
          ),
          h("figcaption", { class: "mono" }, caption)
        );
      })
    );
  }

  /* ---------- Resume ---------- */
  function renderResume() {
    const r = SITE.resume || {};
    if (has(r.pdf)) {
      $("#resumeDownload").append(h("a", { href: r.pdf, download: "" }, "Download the PDF."));
    }
    const block = (title, items) =>
      (items || []).length
        ? h(
            "div",
            { class: "timeline" },
            h("h3", { class: "mono" }, title),
            items.map((x) =>
              h(
                "article",
                {},
                h("div", { class: "when mono" }, [x.start, x.end].filter(has).filter((v, i, a) => a.indexOf(v) === i).join(" - ")),
                h(
                  "div",
                  {},
                  h("h4", {}, x.role),
                  h("p", { class: "org" }, x.org),
                  (x.points || []).length ? h("ul", {}, x.points.map((pt) => h("li", {}, pt))) : null
                )
              )
            )
          )
        : null;
    $("#resumeBody").append(
      ...[block("Experience", r.experience), block("Education", r.education)].filter(Boolean)
    );
  }

  /* ---------- About ---------- */
  function renderAbout() {
    const a = SITE.about || {};
    $("#aboutBody").append(
      h("div", { class: "about-text" }, (a.paragraphs || []).map((p) => h("p", {}, p))),
      h(
        "div",
        { class: "skills" },
        Object.entries(a.skills || {}).map(([group, items]) =>
          h(
            "div",
            {},
            h("h3", { class: "mono" }, group),
            h("ul", { class: "tags" }, items.map((s) => h("li", { class: "mono" }, s)))
          )
        )
      )
    );
  }

  /* ---------- Footer ---------- */
  function renderFooter() {
    $("#footerText").textContent = `© ${new Date().getFullYear()} ${SITE.realName || SITE.name}. Built by hand, hosted on GitHub Pages.`;
    $("#footerLinks").append(
      ...visibleLinks(SITE.links).map((l) => h("a", linkAttrs(l.url), l.label))
    );
  }

  initTheme();
  renderHero();
  renderProjects();
  renderRoadmap();
  renderVideos();
  renderArt();
  renderResume();
  renderAbout();
  renderFooter();
  initModal();
  renderRepos();
})();
