/* ======================================================================
   网站脚本：负责把 js/config.js 里的内容渲染到页面，并处理交互。
   日常改内容请去 config.js；只有想改"行为"时才需要动这个文件。
   ====================================================================== */

"use strict";

const CONFIG = window.SITE_CONFIG;

/* ---------------- 小工具 ---------------- */

// 转义特殊字符，防止内容里的 < > 破坏页面结构
function esc(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const $  = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

/* ---------------- 内置小图标（SVG）----------------
   想加新图标：在 ICONS 里加一项，然后在 config 里写 icon: "名字" */
const ICONS = {
  email: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/></svg>`,
  github: `<svg viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z"/></svg>`,
  chat: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>`,
  link: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>`,
};

/* ---------------- 渲染：板块标题（自动编号 01/02/03...）---------------- */
let sectionNo = 0;
function renderHead(sel, title, subtitle) {
  sectionNo += 1;
  const no = String(sectionNo).padStart(2, "0");
  $(sel).innerHTML = `
    <p class="section-tag mono">// section_${no}</p>
    <h2>${esc(title)}</h2>
    ${subtitle ? `<p class="section-sub">${esc(subtitle)}</p>` : ""}`;
}

/* ---------------- 渲染：导航栏 ---------------- */
function renderNav() {
  $("#nav-logo").innerHTML = esc(CONFIG.nav.logo);
  const links = CONFIG.nav.links
    .map((l) => `<li><a href="${esc(l.href)}">${esc(l.text)}</a></li>`)
    .join("");
  $("#nav-links").innerHTML = links;            // 桌面端
  $("#mobile-menu").innerHTML = `<ul class="mobile-links">${links}</ul>`; // 手机端复用同一份
}

/* ---------------- 渲染：首屏 Hero ---------------- */
function renderHero() {
  const b = CONFIG.basic;
  document.title = `${b.name} · 个人主页`;
  const metaDesc = $('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute("content", `${b.name} —— ${b.role}，${b.slogan}。`);

  // 头像：有图片显示图片，否则显示文字
  const avatar = $("#avatar");
  if (b.avatarImg) {
    avatar.innerHTML = `<img src="${esc(b.avatarImg)}" alt="${esc(b.name)}的头像">`;
  } else {
    avatar.textContent = b.avatarText;
  }

  $(".hero-greeting").textContent = `> ${b.greeting}`;
  $(".hero-name").textContent = b.name;
  $(".hero-role").textContent = b.role;
  $(".hero-slogan").textContent = `“${b.slogan}”`;
  $(".hero-desc").textContent = b.description;
  $("#hero-tags").innerHTML = (b.tags || []).map((t) => `<span>${esc(t)}</span>`).join("");
  $("#hero-btns").innerHTML = (b.buttons || [])
    .map((btn) => `<a class="btn btn-${esc(btn.style)}" href="${esc(btn.target)}">${esc(btn.text)}</a>`)
    .join("");
}

/* ---------------- 渲染：关于我 ---------------- */
function renderAbout() {
  renderHead("#about .section-head", CONFIG.about.title, CONFIG.about.subtitle);
  $("#about-text").innerHTML = CONFIG.about.paragraphs
    .map((p) => `<p>${esc(p)}</p>`)
    .join("");
  $("#about-highlights").innerHTML = CONFIG.about.highlights
    .map((h) => `<li class="highlight-card"><span class="highlight-icon">${esc(h.icon)}</span><span>${esc(h.label)}</span></li>`)
    .join("");
}

/* ---------------- 渲染：技能（进度条在滚动到可视区域时才开始填充）---------------- */
function renderSkills() {
  renderHead("#skills .section-head", CONFIG.skills.title, CONFIG.skills.subtitle);
  $("#skills-list").innerHTML = CONFIG.skills.items
    .map((s, i) => {
      const level = Math.max(0, Math.min(100, Number(s.level) || 0));
      return `
      <li class="skill reveal" style="--d:${(i * 0.07).toFixed(2)}s">
        <div class="skill-head">
          <span class="skill-name">${esc(s.name)}</span>
          <span class="skill-num mono">${level}%</span>
        </div>
        <div class="skill-bar"><div class="skill-fill" style="--level:${level}%"></div></div>
      </li>`;
    })
    .join("");
}

/* ---------------- 渲染：项目 / 作品 ---------------- */
function renderProjects() {
  renderHead("#projects .section-head", CONFIG.projects.title, CONFIG.projects.subtitle);
  $("#projects-list").innerHTML = CONFIG.projects.items
    .map((p, i) => {
      // 有配图用 <img>，没有就用 emoji 占位
      const media = p.image
        ? `<img class="proj-img" src="${esc(p.image)}" alt="${esc(p.title)}配图" loading="lazy">`
        : `<span class="proj-emoji">${esc(p.emoji || "🚀")}</span>`;
      // embed 有值时：配图上叠加"在线试玩"按钮，点击后在卡片内直接运行作品
      const playBtn = p.embed
        ? `<button class="play-btn" data-embed="${esc(p.embed)}" title="不用离开网站，直接体验">🎮 在线试玩</button>`
        : "";
      const tags = (p.tags || []).map((t) => `<span class="tag">${esc(t)}</span>`).join("");
      const links = [
        p.link ? `<a class="proj-link" href="${esc(p.link)}" target="_blank" rel="noopener">查看项目 →</a>` : "",
        p.repo ? `<a class="proj-link" href="${esc(p.repo)}" target="_blank" rel="noopener">代码仓库 →</a>` : "",
      ].join("");
      return `
      <article class="proj-card${p.featured ? " featured" : ""} reveal" style="--d:${(i * 0.08).toFixed(2)}s">
        <div class="proj-media">${media}${playBtn}</div>
        <div class="proj-body">
          ${p.featured ? `<span class="proj-badge">🏆 参赛作品</span>` : ""}
          <h3>${esc(p.title)}</h3>
          <p>${esc(p.description)}</p>
          <div class="proj-tags">${tags}</div>
          <div class="proj-links">${links}</div>
        </div>
      </article>`;
    })
    .join("");
}

/* ---------------- 交互：项目卡片内嵌"在线试玩" ---------------- */
function setupProjectEmbeds() {
  const list = $("#projects-list");
  if (!list) return;
  list.addEventListener("click", (e) => {
    const btn = e.target.closest(".play-btn");
    if (!btn) return;
    const media = btn.closest(".proj-media");
    media.closest(".proj-card").classList.add("playing");
    // 用 iframe 替换配图，把作品直接跑在卡片里
    media.innerHTML = `<iframe class="play-iframe" src="${btn.dataset.embed}" title="在线试玩" allow="pointer-lock; fullscreen" allowfullscreen></iframe>`;
  });
}

/* ---------------- 渲染：经历时间线 ---------------- */
function renderTimeline() {
  renderHead("#timeline .section-head", CONFIG.timeline.title, CONFIG.timeline.subtitle);
  $("#timeline-list").innerHTML = CONFIG.timeline.items
    .map((t, i) => `
      <li class="tl-item reveal" style="--d:${(i * 0.1).toFixed(2)}s">
        <span class="tl-dot" aria-hidden="true"></span>
        <div class="tl-card">
          <p class="tl-time mono">${esc(t.time)}</p>
          <h3>${esc(t.title)}</h3>
          <p>${esc(t.description)}</p>
        </div>
      </li>`)
    .join("");
}

/* ---------------- 渲染：荣誉证书墙 ---------------- */
function renderHonors() {
  renderHead("#honors .section-head", CONFIG.honors.title, CONFIG.honors.subtitle);
  $("#honors-list").innerHTML = CONFIG.honors.items
    .map((h, i) => {
      // 有扫描件显示图片（可点击放大），没有就用 emoji 占位
      const media = h.image
        ? `<img class="honor-img" src="${esc(h.image)}" alt="${esc(h.title)}证书" loading="lazy">
           <span class="honor-zoom-hint">🔍 点击放大</span>`
        : `<span class="honor-emoji">${esc(h.emoji || "🏅")}</span>`;
      const meta = [h.issuer, h.time].filter(Boolean).join(" · ");
      return `
      <figure class="honor-card${h.image ? " has-img" : ""} reveal" style="--d:${(i * 0.07).toFixed(2)}s" data-index="${i}">
        <div class="honor-media">${media}</div>
        <figcaption class="honor-body">
          <h3>${esc(h.title)}</h3>
          <p class="honor-meta mono">${esc(meta)}</p>
        </figcaption>
      </figure>`;
    })
    .join("");
}

/* ---------------- 交互：证书灯箱（点击放大预览）---------------- */
function setupLightbox() {
  const box = $("#lightbox");
  const list = $("#honors-list");
  if (!box || !list) return;
  const imgEl = $("#lightbox-img");
  const capEl = $("#lightbox-caption");

  const close = () => {
    box.classList.remove("open");
    box.setAttribute("aria-hidden", "true");
    document.body.style.overflow = ""; // 恢复页面滚动
  };

  list.addEventListener("click", (e) => {
    const card = e.target.closest(".honor-card.has-img");
    if (!card) return; // 没有扫描件的占位卡片不响应
    const item = CONFIG.honors.items[Number(card.dataset.index)];
    if (!item || !item.image) return;
    imgEl.src = item.image;
    imgEl.alt = `${item.title} 证书大图`;
    capEl.textContent = [item.title, item.issuer, item.time].filter(Boolean).join(" · ");
    box.classList.add("open");
    box.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden"; // 打开时锁定页面滚动
  });

  // 点关闭按钮、点背景空白处，或按 Esc 都能关闭
  box.addEventListener("click", (e) => {
    if (e.target.closest("#lightbox-close") || !e.target.closest(".lightbox-body")) close();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && box.classList.contains("open")) close();
  });
}

/* ---------------- 渲染：联系我 ---------------- */
function renderContact() {
  renderHead("#contact .section-head", CONFIG.contact.title, CONFIG.contact.subtitle);
  $("#contact-list").innerHTML = CONFIG.contact.items
    .map((c, i) => {
      const icon = ICONS[c.icon] || ICONS.link;
      const inner = `
        <span class="contact-icon">${icon}</span>
        <span class="contact-text">
          <span class="contact-label">${esc(c.label)}</span>
          <span class="contact-value">${esc(c.value)}</span>
        </span>`;
      // 有 link 就渲染成 <a>（外链新窗口打开），没有就渲染成 <div>
      const attrs = c.link
        ? ` href="${esc(c.link)}"${/^https?:/i.test(c.link) ? ' target="_blank" rel="noopener"' : ""}`
        : "";
      const tag = c.link ? "a" : "div";
      return `<${tag} class="contact-card reveal" style="--d:${(i * 0.08).toFixed(2)}s"${attrs}>${inner}</${tag}>`;
    })
    .join("");
}

/* ---------------- 渲染：页脚 ---------------- */
function renderFooter() {
  $("#footer-text").textContent = CONFIG.footer.copyright.replace("{year}", new Date().getFullYear());
}

/* ---------------- 交互：深色 / 浅色模式切换 ---------------- */
function setupTheme() {
  const btn = $("#theme-toggle");
  const root = document.documentElement;
  const syncLabel = () =>
    btn.setAttribute("aria-label", root.dataset.theme === "dark" ? "切换到浅色模式" : "切换到深色模式");

  btn.addEventListener("click", () => {
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch (e) { /* 隐私模式下可能无法存储，忽略 */ }
    syncLabel();
  });
  syncLabel();
}

/* ---------------- 交互：手机端菜单 ---------------- */
function setupMobileMenu() {
  const btn = $("#menu-toggle");
  const menu = $("#mobile-menu");
  const close = () => {
    menu.classList.remove("open");
    btn.classList.remove("open");
    btn.setAttribute("aria-expanded", "false");
  };
  btn.addEventListener("click", () => {
    const open = menu.classList.toggle("open");
    btn.classList.toggle("open", open);
    btn.setAttribute("aria-expanded", String(open));
  });
  // 点击菜单里的链接后自动收起
  menu.addEventListener("click", (e) => {
    if (e.target.closest("a")) close();
  });
}

/* ---------------- 渲染：跑马灯 + 底部常驻操作条 ---------------- */
function renderMarquee() {
  const items = CONFIG.marquee.items || [];
  // 一半内容：奇数项用描边字，项与项之间用 ✦ 分隔
  const half = items
    .map((text, i) => `<span class="mq-item${i % 2 ? " alt" : ""}">${esc(text)}</span><span class="mq-star">✦</span>`)
    .join("");
  // 两份相同内容首尾相接：轨道平移 -50% 正好一圈，实现无缝循环
  $("#marquee-track").innerHTML = half + half;
}

function renderCtaBar() {
  const c = CONFIG.ctaBar;
  $("#cta-bar").innerHTML = `
    <a class="cta-btn primary" href="${esc(c.primary.target)}">${esc(c.primary.text)}</a>
    <a class="cta-btn ghost" href="${esc(c.ghost.target)}">${esc(c.ghost.text)}</a>`;
}

/* ---------------- 核心滚动系统：一个数值驱动全部动效 ----------------
   --scroll-progress：首屏滚动进度 0~1 → 首屏文字退场、粒子淡出、操作条升起
   --page-progress  ：整页滚动进度 0~1 → 跑马灯滚筒转动
   导航栏状态、返回顶部按钮也在同一次计算里更新，全局只有一个滚动入口 */
let scrollTicking = false;
function updateScrollDriven() {
  const doc = document.documentElement;
  const heroProgress = Math.min(1, Math.max(0, window.scrollY / window.innerHeight));
  const total = doc.scrollHeight - window.innerHeight;
  const pageProgress = total > 0 ? Math.min(1, Math.max(0, window.scrollY / total)) : 0;

  doc.style.setProperty("--scroll-progress", heroProgress.toFixed(4));
  doc.style.setProperty("--page-progress", pageProgress.toFixed(4));

  document.getElementById("cta-bar")?.classList.toggle("rise", heroProgress > 0.6);
  document.getElementById("navbar")?.classList.toggle("scrolled", window.scrollY > 10);
  document.getElementById("back-to-top")?.classList.toggle("show", window.scrollY > 400);
}

/* ---------------- 交互：导航栏滚动状态 + 返回顶部 ---------------- */
function setupScrollEffects() {
  const topBtn = $("#back-to-top");
  window.addEventListener(
    "scroll",
    () => {
      if (scrollTicking) return; // 用 rAF 合并滚动事件，保证性能
      scrollTicking = true;
      requestAnimationFrame(() => {
        updateScrollDriven();
        scrollTicking = false;
      });
    },
    { passive: true }
  );
  updateScrollDriven();
  topBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}

/* ---------------- 交互：鼠标探照灯（揭示第二层地层背景）----------------
   复刻 lithos 的"挖矿"效果：光斑用缓动跟随鼠标，柔和不生硬。
   触屏设备没有鼠标悬停，自动跳过（保持底层地形图不变）。 */
function setupSpotlight() {
  const reveal = document.querySelector(".site-bg-reveal");
  if (!reveal || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

  let targetX = window.innerWidth / 2;
  let targetY = window.innerHeight / 2;
  let curX = targetX;
  let curY = targetY;

  window.addEventListener(
    "mousemove",
    (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
    },
    { passive: true }
  );

  (function loop() {
    curX += (targetX - curX) * 0.1;
    curY += (targetY - curY) * 0.1;
    reveal.style.setProperty("--mx", curX.toFixed(1) + "px");
    reveal.style.setProperty("--my", curY.toFixed(1) + "px");
    requestAnimationFrame(loop);
  })();
}

/* ---------------- 交互：滚动淡入动画 ---------------- */
function setupReveal() {
  const els = $$(".reveal");
  // 老浏览器不支持 IntersectionObserver 时，直接显示全部内容
  if (!("IntersectionObserver" in window)) {
    els.forEach((el) => el.classList.add("visible"));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          io.unobserve(entry.target); // 动画只播放一次
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );
  els.forEach((el) => io.observe(el));
}

/* ---------------- 首屏粒子背景（纯 Canvas，很轻量）---------------- */
function setupParticles() {
  const canvas = $("#particles");
  if (!canvas || !canvas.getContext) return;
  // 用户系统设置了"减少动态效果"时，不播放动画
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const ctx = canvas.getContext("2d");
  let w = 0, h = 0, points = [], timer = null;

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = canvas.offsetWidth;
    h = canvas.offsetHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function build() {
    // 按面积决定粒子数量，最多 70 个，保证流畅
    const count = Math.min(70, Math.round((w * h) / 16000));
    points = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 1.6 + 0.6,
    }));
  }

  function frame() {
    ctx.clearRect(0, 0, w, h);
    // 粒子颜色跟随主题（CSS 变量 --particle）
    const color =
      getComputedStyle(document.documentElement).getPropertyValue("--particle").trim() || "#60A5FA";

    // 更新位置，碰到边缘就反弹
    for (const p of points) {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x <= 0 || p.x >= w) p.vx *= -1;
      if (p.y <= 0 || p.y >= h) p.vy *= -1;
    }

    // 距离近的粒子之间画连线
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        const dist = Math.hypot(points[i].x - points[j].x, points[i].y - points[j].y);
        if (dist < 120) {
          ctx.globalAlpha = (1 - dist / 120) * 0.35;
          ctx.beginPath();
          ctx.moveTo(points[i].x, points[i].y);
          ctx.lineTo(points[j].x, points[j].y);
          ctx.stroke();
        }
      }
    }
    // 画粒子点
    ctx.globalAlpha = 0.7;
    for (const p of points) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    timer = requestAnimationFrame(frame);
  }

  function start() { if (timer === null) frame(); }
  function stop() { cancelAnimationFrame(timer); timer = null; }

  resize();
  build();
  start();
  window.addEventListener("resize", () => { resize(); build(); });
  // 切到后台标签页时暂停动画，省电省资源
  document.addEventListener("visibilitychange", () => (document.hidden ? stop() : start()));
}

/* ---------------- 启动 ---------------- */
function init() {
  renderNav();
  renderMarquee();
  renderCtaBar();
  renderHero();
  renderAbout();
  renderSkills();
  renderProjects();
  setupProjectEmbeds();
  renderTimeline();
  renderHonors();
  renderContact();
  renderFooter();
  setupTheme();
  setupMobileMenu();
  setupLightbox();
  setupSpotlight();
  setupScrollEffects();
  setupReveal();
  setupParticles();
}

document.addEventListener("DOMContentLoaded", init);
