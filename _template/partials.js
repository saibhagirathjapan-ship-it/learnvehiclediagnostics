// _template/partials.js — the ONE shared page chrome for the whole course.
// Every renderer (render.js modules · render-hub.js the hub · render-map.js the Foundation
// map · make-stubs.js placeholders) builds its top bar from topbar() here, so the chrome is
// identical everywhere and can never drift. Change the chrome in ONE place: this file.
//
//   topbar({home, brand, expand})  → the sticky dark-grey top bar markup
//   TOPBAR_SCRIPT                   → its behaviour (setTbh/--crh/--stick + lang cycle + theme)
//   FONTS                           → the shared Google-fonts <link> block
//   esc()                           → HTML escaper (shared so callers agree on escaping)

const esc = s => String(s == null ? '' : s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');

// Shared web-font link (map + modules use the CDN link; per-page self-containment is via the
// inlined blueprint.css, fonts are the one external dep — see COURSE.md "bundle EN fonts" TODO).
const FONTS = `<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@500;600;700&family=Space+Grotesk:wght@500;600;700&family=Noto+Sans+JP:wght@400;500;700&display=swap" rel="stylesheet">`;

// single-icon toggles: one globe (cycles EN → 日本語 → EN+JP) + one theme flip (sun ↔ moon)
const IC_GLOBE = '<svg viewBox="0 0 20 20" width="15" height="15" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="10" cy="10" r="7.5"/><path d="M2.6 10h14.8M10 2.5c2.2 2 2.2 13 0 15M10 2.5c-2.2 2-2.2 13 0 15"/></svg>';
const IC_SUN = '<svg class="ic-sun" viewBox="0 0 20 20" width="15" height="15" fill="none" stroke="currentColor" stroke-width="1.7"><circle cx="10" cy="10" r="3.4"/><g stroke-linecap="round"><path d="M10 2.4v2M10 15.6v2M2.4 10h2M15.6 10h2M4.6 4.6l1.4 1.4M14 14l1.4 1.4M15.4 4.6L14 6M6 14l-1.4 1.4"/></g></svg>';
const IC_MOON = '<svg class="ic-moon" viewBox="0 0 20 20" width="15" height="15" fill="currentColor"><path d="M12.9 2.5a7.5 7.5 0 1 0 4.6 9.4 6 6 0 0 1-4.6-9.4z"/></svg>';

// The constant brand is "Automotive Diagnostics", a home link, everywhere (session-9 decision).
// `home` = relative path to the course hub from this page. `expand` adds the module-only
// Expand/Collapse-legs segment. `brand` overrides the label (default is the constant).
function topbar({ home = '../../index.html', brand = 'Automotive Diagnostics', expand = false } = {}) {
  return `<header class="topbar"><div class="topbar-in">` +
    `<a class="brand" href="${esc(home)}" aria-label="Automotive Diagnostics — home"><span class="dot"></span><span class="btxt">${esc(brand)}</span></a>` +
    `<div class="tb-spacer"></div><div class="tb-ctl">` +
    `<button class="tb-icobtn" id="langbtn" data-v="en" title="Language · 言語" aria-label="Change language">${IC_GLOBE}<span class="tb-lc">EN</span></button>` +
    `<button class="tb-icobtn tb-theme" id="themebtn" title="Toggle light / dark" aria-label="Toggle light / dark theme">${IC_SUN}${IC_MOON}</button>` +
    (expand ? `<div class="tb-seg" id="allseg"><button data-a="open">Expand</button><button data-a="close">Collapse</button></div>` : '') +
    `</div></div></header>`;
}

// Behaviour for the shared chrome, self-contained in one IIFE so it can be dropped onto any page
// exactly once alongside a page's own script. Measures the sticky stack (topbar + breadcrumb) into
// --tbh / --crh / --stick so every sticky offset below stays honest (FB4).
const TOPBAR_SCRIPT = `<script>
(function(){var root=document.querySelector('.stage');if(!root)return;
function stick(){var t=document.querySelector('.topbar'),c=document.querySelector('.crumbs');
  var th=t?t.offsetHeight:0,ch=c?c.offsetHeight:0,d=document.documentElement.style;
  d.setProperty('--tbh',th+'px');d.setProperty('--crh',ch+'px');d.setProperty('--stick',(th+ch)+'px');}
stick();addEventListener('resize',stick);addEventListener('load',stick);
var order=['en','jp','both'],lbl={en:'EN',jp:'日本語',both:'EN+JP'},b=document.getElementById('langbtn');
if(b)b.addEventListener('click',function(){var v=order[(order.indexOf(b.dataset.v)+1)%3];b.dataset.v=v;root.setAttribute('data-lang',v);var t=b.querySelector('.tb-lc');if(t)t.textContent=lbl[v];stick();});
var tb=document.getElementById('themebtn');if(tb)tb.addEventListener('click',function(){root.setAttribute('data-theme',root.getAttribute('data-theme')==='dark'?'light':'dark');});
})();
</script>`;

module.exports = { esc, FONTS, topbar, TOPBAR_SCRIPT };
