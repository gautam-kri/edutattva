"use client";

import { useEffect, useState } from "react";
import { PAGE_READY_EVENT, onPageReady } from "@/lib/pageReady";

/**
 * Phase 1 of the load: an instant structural skeleton of the page.
 *
 * This is deliberately self-contained. Every rule it needs is in the <style>
 * block below, inlined into the document, and it uses no Tailwind class and no
 * token from globals.css. That is the whole point: it paints correctly on the
 * very first frame even before the external stylesheet and the brand webfonts
 * have arrived, which is what stops the page flashing as unstyled HTML.
 *
 * It is lifted by the inline script below, which runs while the document is
 * still parsing, once the fonts are in and the hero has sized itself (HeroFit),
 * so no layout shuffles into place in front of the visitor. The promo panel
 * needs no wait: it ships open in the HTML.
 *
 * The real page content is already in the HTML too, so the overlay must never
 * wait indefinitely for the React bundle; MAX_WAIT_MS caps it. React only
 * unmounts the (already invisible) node afterwards.
 */

/** Never hold the page behind the skeleton longer than this. */
const MAX_WAIT_MS = 2000;
const FADE_MS = 420;

const CSS = `
#ets-skel{position:fixed;inset:0;z-index:100;background:#fff;display:flex;
  flex-direction:column;opacity:1;transition:opacity ${FADE_MS}ms cubic-bezier(.25,1,.5,1)}
#ets-skel .r{background:#dbe5f4;border-radius:999px}
#ets-skel .pulse{animation:etsPulse 1.5s ease-in-out infinite}
@keyframes etsPulse{0%,100%{opacity:.75}50%{opacity:1}}

#ets-skel .bar{height:72px;flex:none;display:flex;align-items:center;
  justify-content:space-between;gap:16px;padding:0 20px;border-bottom:1px solid #d7e5fa;background:#fff}
#ets-skel .brand{display:flex;align-items:center;gap:10px}
#ets-skel .mark{width:42px;height:42px;border-radius:10px;background:#e3ebf8}
#ets-skel .word{display:flex;flex-direction:column;gap:6px}
#ets-skel .nav{display:none;align-items:center;gap:22px}
#ets-skel .cta{width:190px;height:44px;border-radius:999px;background:#fbe6a6}

#ets-skel .hero{flex:1;min-height:0;background:#0a1f44;
  background-image:radial-gradient(rgba(255,255,255,.10) 1px,transparent 1px);background-size:22px 22px;
  display:flex;flex-direction:column;justify-content:center;gap:14px;padding:32px 20px}
#ets-skel .hero .r{background:rgba(255,255,255,.09)}
#ets-skel .chips{display:flex;gap:10px;margin-bottom:6px}
#ets-skel .btns{display:flex;gap:12px;margin-top:14px}
#ets-skel .wrap{width:100%;max-width:1280px;margin:0 auto}

@media (min-width:768px){
  #ets-skel .bar{padding:0 32px}
  #ets-skel .nav{display:flex}
  #ets-skel .hero{padding:56px 32px}
}
@media (prefers-reduced-motion:reduce){
  #ets-skel{transition:none}
  #ets-skel .pulse{animation:none}
}
`;

/**
 * Lifts the overlay as soon as the brand fonts are in, and unconditionally
 * after MAX_WAIT_MS, so a slow bundle or a font that never arrives can never
 * keep the page hidden. Deliberately dependency-free and inlined.
 */
const BOOT = `(function(){
var el=document.getElementById("ets-skel");if(!el)return;var done=false;
function reveal(){if(done)return;done=true;window.__etsPageReady=true;
el.style.opacity="0";el.style.pointerEvents="none";
setTimeout(function(){el.style.display="none";},${FADE_MS});
window.dispatchEvent(new Event("${PAGE_READY_EVENT}"));}
setTimeout(reveal,${MAX_WAIT_MS});
function heroOK(){if(document.readyState==="loading")return false;
if(document.querySelector("[data-herofit]")&&!window.__etsHeroReady)return false;
return true;}
function wait(){if(heroOK()){requestAnimationFrame(function(){requestAnimationFrame(reveal);});}
else{requestAnimationFrame(wait);}}
var f=document.fonts&&document.fonts.ready;
if(f&&f.then){f.then(wait).catch(reveal);}
else{wait();}
})();`;

export default function PageSkeleton() {
  const [gone, setGone] = useState(false);

  // The inline script has already hidden the overlay by the time this runs;
  // this just drops the now-invisible node out of the tree.
  useEffect(() => onPageReady(() => setGone(true)), []);

  if (gone) return null;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      {/* Without JS nothing would ever lift the overlay, so hide it outright. */}
      <noscript>
        <style dangerouslySetInnerHTML={{ __html: `#ets-skel{display:none!important}` }} />
      </noscript>

      {/*
        The boot script sets opacity/pointer-events/display on this node before
        React hydrates, so the server HTML and the live DOM legitimately differ.
        That is the design, not a bug, hence suppressHydrationWarning.
      */}
      <div id="ets-skel" aria-hidden="true" suppressHydrationWarning>
        <div className="bar">
          <div className="brand">
            <div className="mark pulse" />
            <div className="word">
              <div className="r pulse" style={{ width: 168, height: 15 }} />
              <div className="r pulse" style={{ width: 132, height: 9 }} />
            </div>
          </div>
          <div className="nav">
            {[52, 54, 78, 60, 58, 84, 62].map((w, i) => (
              <div key={i} className="r pulse" style={{ width: w, height: 13 }} />
            ))}
          </div>
          <div className="cta pulse" />
        </div>

        <div className="hero">
          <div className="wrap">
            <div className="chips">
              <div className="r pulse" style={{ width: 168, height: 26 }} />
              <div className="r pulse" style={{ width: 104, height: 26 }} />
            </div>
            <div className="r pulse" style={{ width: "min(560px,88%)", height: 46, borderRadius: 12, marginTop: 20 }} />
            <div className="r pulse" style={{ width: "min(470px,74%)", height: 46, borderRadius: 12, marginTop: 14 }} />
            <div className="r pulse" style={{ width: "min(330px,56%)", height: 46, borderRadius: 12, marginTop: 14 }} />
            <div className="r pulse" style={{ width: "min(420px,70%)", height: 20, marginTop: 26 }} />
            <div className="r pulse" style={{ width: "min(360px,62%)", height: 14, marginTop: 14 }} />
            <div className="btns">
              <div className="r pulse" style={{ width: 196, height: 48 }} />
              <div className="r pulse" style={{ width: 176, height: 48 }} />
            </div>
          </div>
        </div>
      </div>

      {/* Runs during parse, immediately after the overlay exists. */}
      <script dangerouslySetInnerHTML={{ __html: BOOT }} />
    </>
  );
}
