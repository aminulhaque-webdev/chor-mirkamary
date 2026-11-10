const $ = (s, r = document) => r.querySelector(s);
const bn = n => String(n).replace(/\d/g, d => "০১২৩৪৫৬৭৮৯"[d]);
const av = p => p.photo || `images/avatars/${p.gender === "f" ? "female" : "male"}.svg`;
const nm = p => p.name || "নাম যোগ হয়নি";
const kidRole = p => p.gender === "f" ? "নাতনী" : "নাতি";
const sonRole = c => c.gender === "f" ? "কন্যা" : "পুত্র";
const img = p => `<img src="${av(p)}" alt="${nm(p)}" loading="lazy">`;

const { father, mother, children } = FAMILY;
const grand = children.flatMap(c => c.kids.map(k => ({ ...k, parent: c.name })));

// ---------- Hero slider ----------
const slides = [
  { tag: "পরিবারের মূল", title: "পিতা ও মাতা", big: true,
    people: [{ ...father, label: "পিতা" }, { ...mother, label: "মাতা" }],
    sub: `${bn(children.length)} সন্তান · ${bn(grand.length)} নাতি-নাতনী` },
  ...children.map(c => ({
    tag: `${c.order} সন্তান`, title: c.name,
    people: c.kids.map(k => ({ ...k, label: kidRole(k) })),
    sub: `পিতা: ${father.name} · মাতা: ${mother.name}` }))
];
$("#slides").innerHTML = slides.map(s => `
  <article class="slide"><div class="slide-in">
    <span class="chip">${s.tag}</span><h2>${s.title}</h2><p class="sub">${s.sub}</p>
    <div class="faces ${s.big ? "big" : ""}">${s.people.map(p => `
      <figure>${img(p)}<figcaption><b>${nm(p)}</b><small>${p.label}</small></figcaption></figure>`).join("")}</div>
  </div></article>`).join("");
$("#dots").innerHTML = slides.map((_, i) => `<button aria-label="স্লাইড ${bn(i + 1)}"></button>`).join("");

let cur = 0, timer;
const go = i => {
  cur = (i + slides.length) % slides.length;
  $("#slides").style.transform = `translateX(${-cur * 100}%)`;
  document.querySelectorAll("#dots button").forEach((d, k) => d.classList.toggle("on", k === cur));
};
const play = () => { clearInterval(timer); timer = setInterval(() => go(cur + 1), 5000); };
$("#next").onclick = () => { go(cur + 1); play(); };
$("#prev").onclick = () => { go(cur - 1); play(); };
document.querySelectorAll("#dots button").forEach((d, i) => d.onclick = () => { go(i); play(); });
$("#hero").onmouseenter = () => clearInterval(timer);
$("#hero").onmouseleave = play;
go(0); play();

// ---------- Member profiles: everything in one view ----------
const pcard = (p, cls, role, extra = "") => `
  <div class="card ${cls}">${img(p)}<h3>${nm(p)}</h3><span class="chip sm">${role}</span>${extra}</div>`;
$("#pstage").innerHTML = `
  <div class="pgrid two">${pcard(father, "parents big", "পিতা")}${pcard(mother, "parents big", "মাতা")}</div>
  <div class="vline"></div>
  <h3 class="gh">সন্তান ও তাদের ছেলে-মেয়ে</h3>
  <div class="fams">${children.map((c, i) => `
    <div class="fam">
      <div class="fam-head">${pcard(c, "children", `${c.order} সন্তান · ${sonRole(c)}`, `<span class="no">${bn(i + 1)}</span><p>${bn(c.kids.length)} জন নাতি-নাতনী</p>`)}</div>
      <div class="fam-kids">${c.kids.map(k => pcard(k, "grand", kidRole(k))).join("")}</div>
    </div>`).join("")}</div>`;

// ---------- Stats ----------
$("#stats").innerHTML = [["২", "পিতা-মাতা"], [bn(children.length), "সন্তান"], [bn(grand.length), "নাতি-নাতনী"], [bn(2 + children.length + grand.length), "মোট সদস্য"]]
  .map(([n, l]) => `<div><b>${n}</b><span>${l}</span></div>`).join("");

// ---------- Swipe (touch + mouse drag) ----------
(() => {
  const vp = $(".viewport"); let x0 = null;
  vp.addEventListener("pointerdown", e => { x0 = e.clientX; });
  vp.addEventListener("pointerup", e => {
    if (x0 === null) return; const d = e.clientX - x0; x0 = null;
    if (Math.abs(d) > 40) { go(cur + (d < 0 ? 1 : -1)); play(); }
  });
  vp.addEventListener("pointercancel", () => x0 = null);
})();

// ---------- Bangla / Arabic / English date & live clock ----------
const bnMonths = ["বৈশাখ","জ্যৈষ্ঠ","আষাঢ়","শ্রাবণ","ভাদ্র","আশ্বিন","কার্তিক","অগ্রহায়ণ","পৌষ","মাঘ","ফাল্গুন","চৈত্র"];
const bnDays = ["রবিবার","সোমবার","মঙ্গলবার","বুধবার","বৃহস্পতিবার","শুক্রবার","শনিবার"];
const seasons = ["গ্রীষ্ম","গ্রীষ্ম","বর্ষা","বর্ষা","শরৎ","শরৎ","হেমন্ত","হেমন্ত","শীত","শীত","বসন্ত","বসন্ত"];
function banglaDate(d) {
  const y = d.getFullYear(), start = new Date(y, 3, 14);
  const base = d >= new Date(y, 3, 14) ? y : y - 1;
  const st = new Date(base, 3, 14), by = base - 593;
  const leap = (base + 1) % 4 === 0 && ((base + 1) % 100 !== 0 || (base + 1) % 400 === 0);
  const len = [31,31,31,31,31,30,30,30,30,30,leap ? 30 : 29,30];
  let n = Math.floor((new Date(d.getFullYear(), d.getMonth(), d.getDate()) - st) / 864e5), m = 0;
  while (n >= len[m]) n -= len[m++];
  return `${bn(n + 1)} ${bnMonths[m]} ${bn(by)} বঙ্গাব্দ · ঋতু: ${seasons[m]}`;
}
// আরবি (হিজরি) তারিখ — বাংলাদেশে সাধারণত সৌদির চেয়ে ১ দিন পরে চাঁদ দেখা যায়।
// দিন মেলাতে চাইলে নিচের সংখ্যা বদলান: -1 (ডিফল্ট), 0, +1
const HIJRI_OFFSET = -1;
const hijriMonths = ["মুহাররম","সফর","রবিউল আউয়াল","রবিউস সানি","জমাদিউল আউয়াল","জমাদিউস সানি","রজব","শা'বান","রমজান","শাওয়াল","জিলকদ","জিলহজ"];
function hijri(d) {
  const x = new Date(d.getFullYear(), d.getMonth(), d.getDate() + HIJRI_OFFSET, 12);
  const parts = new Intl.DateTimeFormat("en-u-ca-islamic-umalqura", { day: "numeric", month: "numeric", year: "numeric" }).formatToParts(x);
  const g = t => parseInt(parts.find(p => p.type === t).value, 10);
  return `${bn(g("day"))} ${hijriMonths[g("month") - 1]} ${bn(g("year"))} হিজরি`;
}
function tick() {
  const d = new Date();
  $("#dBn").textContent = `${bnDays[d.getDay()]}, ${banglaDate(d)}`;
  $("#dAr").textContent = hijri(d);
  $("#dEn").textContent = new Intl.DateTimeFormat("bn-BD-u-nu-beng", { weekday: "long", day: "numeric", month: "long", year: "numeric" }).format(d);
  $("#clock").textContent = "🕒 " + new Intl.DateTimeFormat("bn-BD-u-nu-beng", { hour: "numeric", minute: "2-digit", second: "2-digit", hour12: true }).format(d);
}
tick(); setInterval(tick, 1000);

// ---------- Sticky menu bar: mobile toggle, active link, shadow ----------
(() => {
  const bar = $(".nav"), btn = $("#burger"), links = [...document.querySelectorAll("#menu a")];
  const setOpen = o => { bar.classList.toggle("open", o); btn.setAttribute("aria-expanded", o); };
  btn.onclick = () => setOpen(!bar.classList.contains("open"));
  links.forEach(a => a.addEventListener("click", () => setOpen(false)));
  document.addEventListener("click", e => { if (!bar.contains(e.target)) setOpen(false); });
  const ids = links.map(a => a.getAttribute("href").slice(1));
  const onScroll = () => {
    bar.classList.toggle("stuck", scrollY > 10);
    let cur = ids[0];
    ids.forEach(id => { const el = document.getElementById(id); if (el && el.getBoundingClientRect().top <= 120) cur = id; });
    links.forEach(a => a.classList.toggle("on", a.getAttribute("href") === "#" + cur));
  };
  addEventListener("scroll", onScroll, { passive: true }); onScroll();
})();

// ---------- Image zoom popup (lightbox) ----------
(() => {
  const box = document.createElement("div");
  box.className = "lb"; box.hidden = true;
  box.innerHTML = `<button class="lb-x" aria-label="বন্ধ করুন">✕</button>
    <figure><img alt=""><figcaption><b></b><small></small></figcaption></figure>`;
  document.body.appendChild(box);
  const im = box.querySelector("img"), nameEl = box.querySelector("b"), roleEl = box.querySelector("small");
  const close = () => { box.hidden = true; document.body.classList.remove("lb-open"); };
  document.addEventListener("click", e => {
    const t = e.target.closest(".faces figure, .card");
    if (!t) return;
    const pic = t.querySelector("img");
    if (!pic || !pic.getAttribute("src").includes("/people/")) return;
    im.src = pic.getAttribute("src").replace("/people/", "/people/large/");
    nameEl.textContent = (t.querySelector("figcaption b, h3") || {}).textContent || "";
    roleEl.textContent = (t.querySelector("figcaption small, .chip") || {}).textContent || "";
    box.hidden = false; document.body.classList.add("lb-open");
  });
  box.addEventListener("click", e => { if (e.target !== im) close(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape") close(); });
})();
