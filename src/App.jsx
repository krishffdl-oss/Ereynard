import { useState, useEffect, useRef, useCallback } from "react";

// ═══════════════════════════════════════════════════════════════════
// GLOBAL STYLES — Montserrat + Playfair Display, balanced typography
// ═══════════════════════════════════════════════════════════════════
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400&family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&display=swap');

    :root{
      --Y:#f0c845;--Y2:#ffd966;--Y3:#d4a800;
      --B:#080930;--B2:#0e104b;--B3:#080a38;--B4:#12145a;
      --FM:'Montserrat',sans-serif;
      --FI:'Playfair Display',serif;
      --ease:cubic-bezier(.4,0,.2,1);
      --spring:cubic-bezier(.34,1.56,.64,1);
    }
    *,*::before,*::after{margin:0;padding:0;box-sizing:border-box;}
    html{scroll-behavior:smooth;}
    body{font-family:var(--FM);background:var(--B);color:var(--Y);overflow-x:hidden;cursor:none;font-size:15px;line-height:1.6;}
    ::-webkit-scrollbar{width:3px;}
    ::-webkit-scrollbar-track{background:var(--B3);}
    ::-webkit-scrollbar-thumb{background:var(--Y);border-radius:2px;}
    a{text-decoration:none;color:inherit;}

    /* ─── CURSOR ─── */
    #cur{position:fixed;width:9px;height:9px;background:var(--Y);border-radius:50%;pointer-events:none;z-index:99999;transform:translate(-50%,-50%);transition:width .18s,height .18s;top:0;left:0;}
    #cur-r{position:fixed;width:36px;height:36px;border:1.5px solid rgba(240,200,69,.38);border-radius:50%;pointer-events:none;z-index:99998;transform:translate(-50%,-50%);transition:width .28s,height .28s,opacity .28s;top:0;left:0;}
    body.hov #cur{width:16px;height:16px;}
    body.hov #cur-r{width:58px;height:58px;opacity:.22;}
    .ctr{position:fixed;border-radius:50%;pointer-events:none;z-index:99997;transform:translate(-50%,-50%);}

    /* ─── PAGE TRANSITION ─── */
    .pt-overlay{position:fixed;inset:0;z-index:99990;pointer-events:none;display:flex;}
    .pt-panel{flex:1;background:var(--Y);transform:scaleY(0);transform-origin:bottom;}
    .pt-enter .pt-panel{animation:ptIn .5s var(--ease) forwards;}
    .pt-enter .pt-panel:nth-child(2){animation-delay:.05s;}
    .pt-enter .pt-panel:nth-child(3){animation-delay:.1s;}
    .pt-exit .pt-panel{animation:ptOut .5s var(--ease) forwards;}
    .pt-exit .pt-panel:nth-child(2){animation-delay:.05s;}
    .pt-exit .pt-panel:nth-child(3){animation-delay:.1s;}
    @keyframes ptIn{from{transform:scaleY(0);transform-origin:bottom;}to{transform:scaleY(1);transform-origin:bottom;}}
    @keyframes ptOut{from{transform:scaleY(1);transform-origin:top;}to{transform:scaleY(0);transform-origin:top;}}

    /* ─── LOADER ─── */
    #loader{position:fixed;inset:0;background:var(--B3);z-index:999999;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:22px;overflow:hidden;transition:opacity .6s ease;}
    #loader.hide{opacity:0;pointer-events:none;}
    #loader::before{content:'';position:absolute;inset:0;background-image:radial-gradient(rgba(240,200,69,.04) 1px,transparent 1px);background-size:32px 32px;}
    .ld-fox{font-size:64px;animation:foxBounce 1.5s ease-in-out infinite;}
    @keyframes foxBounce{0%,100%{transform:translateY(0) rotate(-6deg);}50%{transform:translateY(-18px) rotate(6deg);}}
    .ld-brand{font-family:var(--FM);font-size:clamp(40px,7vw,78px);font-weight:800;letter-spacing:.06em;display:flex;overflow:hidden;}
    .ld-c{display:inline-block;opacity:0;animation:ldropIn .5s var(--ease) forwards;}
    .ld-c.y{color:var(--Y);}
    .ld-c.o{color:transparent;-webkit-text-stroke:1.5px var(--Y);}
    .ld-bar-wrap{width:220px;height:2px;background:rgba(240,200,69,.1);border-radius:2px;}
    .ld-bar{height:100%;width:0;background:linear-gradient(90deg,var(--Y3),var(--Y),var(--Y2));border-radius:2px;animation:lbarFill 2.3s var(--ease) forwards;}
    @keyframes ldropIn{from{opacity:0;transform:translateY(-26px);}to{opacity:1;transform:none;}}
    @keyframes lbarFill{to{width:100%;}}
    .ld-tagline{font-family:var(--FI);font-style:italic;font-size:15px;color:rgba(240,200,69,.38);animation:fadeInA 1s 1.2s forwards;opacity:0;}
    @keyframes fadeInA{to{opacity:1;}}

    /* ─── NAV ─── */
    nav{position:fixed;top:0;left:0;right:0;z-index:1000;padding:20px 56px;display:flex;align-items:center;justify-content:space-between;transition:all .4s var(--ease);}
    nav.sc{background:rgba(8,9,48,.97);backdrop-filter:blur(20px);padding:13px 56px;border-bottom:1px solid rgba(240,200,69,.1);box-shadow:0 4px 32px rgba(0,0,0,.4);}
    .nav-logo{font-family:var(--FM);font-size:20px;font-weight:800;letter-spacing:.06em;color:var(--Y);display:flex;align-items:center;gap:7px;transition:transform .3s;cursor:pointer;background:none;border:none;}
    .nav-logo:hover{transform:scale(1.04);}
    .nav-links{display:flex;gap:24px;list-style:none;}
    .nav-links button{color:rgba(240,200,69,.5);font-size:11px;letter-spacing:.12em;text-transform:uppercase;font-weight:600;transition:color .3s;position:relative;background:none;border:none;cursor:pointer;font-family:var(--FM);padding:0;}
    .nav-links button::after{content:'';position:absolute;bottom:-3px;left:0;width:0;height:1.5px;background:var(--Y);transition:width .3s var(--ease);}
    .nav-links button:hover,.nav-links button.active{color:var(--Y);}
    .nav-links button:hover::after,.nav-links button.active::after{width:100%;}
    .nav-cta{background:var(--Y);color:var(--B);font-family:var(--FM);font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;padding:10px 24px;clip-path:polygon(0 0,calc(100% - 8px) 0,100% 8px,100% 100%,0 100%);transition:all .3s;position:relative;overflow:hidden;border:none;cursor:pointer;}
    .nav-cta::before{content:'';position:absolute;inset:0;background:var(--B2);transform:translateX(-105%);transition:transform .3s;}
    .nav-cta:hover::before{transform:translateX(0);}
    .nav-cta:hover{color:var(--Y);}
    .nav-cta span{position:relative;z-index:1;}
    .hburg{display:none;flex-direction:column;gap:5px;cursor:pointer;background:none;border:none;padding:0;}
    .hburg i{display:block;width:24px;height:2px;background:var(--Y);transition:all .3s;}
    .hburg.open i:nth-child(1){transform:rotate(45deg) translate(5px,5px);}
    .hburg.open i:nth-child(2){opacity:0;}
    .hburg.open i:nth-child(3){transform:rotate(-45deg) translate(5px,-5px);}
    .mob-menu{position:fixed;inset:0;z-index:999;background:var(--B3);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;clip-path:circle(0% at 95% 5%);transition:clip-path .7s var(--ease);}
    .mob-menu.open{clip-path:circle(150% at 95% 5%);}
    .mob-menu button{font-family:var(--FM);font-weight:800;font-size:clamp(32px,6vw,52px);color:var(--Y);letter-spacing:.04em;transition:all .3s;background:none;border:none;cursor:pointer;text-transform:uppercase;}
    .mob-menu button:hover{color:transparent;-webkit-text-stroke:1.5px var(--Y);}

    /* ─── SECTION COMMONS ─── */
    .sec{padding:84px 56px;position:relative;}
    .sec-label{display:flex;align-items:center;gap:10px;margin-bottom:8px;font-size:10px;letter-spacing:.28em;text-transform:uppercase;font-weight:600;}
    .sec-label::before{content:'';width:20px;height:1.5px;flex-shrink:0;}
    .on-navy .sec-label{color:rgba(240,200,69,.48);}
    .on-navy .sec-label::before{background:rgba(240,200,69,.4);}
    .on-yellow .sec-label{color:rgba(14,16,75,.52);}
    .on-yellow .sec-label::before{background:rgba(14,16,75,.38);}
    .sec-title{font-family:var(--FM);font-weight:800;font-size:clamp(36px,4.5vw,64px);line-height:1.05;letter-spacing:-.01em;margin-bottom:6px;}
    .on-navy .sec-title{color:var(--Y);}
    .on-navy .sec-title .out{color:transparent;-webkit-text-stroke:1px rgba(240,200,69,.22);}
    .on-yellow .sec-title{color:var(--B);}
    .on-yellow .sec-title .out{color:transparent;-webkit-text-stroke:1px rgba(14,16,75,.18);}
    .sec-sub{font-family:var(--FI);font-style:italic;font-size:15px;line-height:1.7;margin-top:8px;}
    .on-navy .sec-sub{color:rgba(240,200,69,.4);}
    .on-yellow .sec-sub{color:rgba(14,16,75,.48);}
    .sec-intro{font-size:14px;line-height:1.82;margin-top:12px;max-width:640px;}
    .on-navy .sec-intro{color:rgba(240,200,69,.5);}
    .on-yellow .sec-intro{color:rgba(14,16,75,.58);}

    /* ─── REVEAL ANIMATIONS ─── */
    .reveal{opacity:0;transform:translateY(44px);transition:opacity .8s var(--ease),transform .8s var(--ease);}
    .reveal.v{opacity:1;transform:none;}
    .rev-l{opacity:0;transform:translateX(-44px);transition:opacity .8s var(--ease),transform .8s var(--ease);}
    .rev-l.v{opacity:1;transform:none;}
    .rev-r{opacity:0;transform:translateX(44px);transition:opacity .8s var(--ease),transform .8s var(--ease);}
    .rev-r.v{opacity:1;transform:none;}
    .rev-scale{opacity:0;transform:scale(.94);transition:opacity .8s var(--ease),transform .8s var(--ease);}
    .rev-scale.v{opacity:1;transform:none;}

    /* ─── BUTTONS ─── */
    .btn-p{background:var(--Y);color:var(--B);font-family:var(--FM);font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;padding:14px 38px;border:none;cursor:pointer;display:inline-flex;align-items:center;gap:9px;clip-path:polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,0 100%);transition:all .3s;position:relative;overflow:hidden;}
    .btn-p::after{content:'';position:absolute;inset:0;background:var(--B3);transform:translateX(-105%);transition:transform .3s;}
    .btn-p:hover::after{transform:translateX(0);}
    .btn-p:hover{transform:translateY(-2px);}
    .btn-p>*{position:relative;z-index:1;}
    .btn-p:hover span{color:var(--Y);}
    .btn-g{color:var(--Y);font-size:11px;font-weight:600;letter-spacing:.09em;text-transform:uppercase;display:inline-flex;align-items:center;gap:8px;border-bottom:1.5px solid rgba(240,200,69,.22);padding-bottom:2px;transition:all .3s;opacity:.6;background:none;border-top:none;border-left:none;border-right:none;cursor:pointer;font-family:var(--FM);}
    .btn-g:hover{opacity:1;gap:14px;border-bottom-color:var(--Y);}
    .btn-out{color:var(--B);font-size:11px;font-weight:600;letter-spacing:.09em;text-transform:uppercase;display:inline-flex;align-items:center;gap:8px;border-bottom:1.5px solid rgba(14,16,75,.22);padding-bottom:2px;transition:all .3s;opacity:.6;background:none;border-top:none;border-left:none;border-right:none;cursor:pointer;font-family:var(--FM);}
    .btn-out:hover{opacity:1;gap:14px;border-bottom-color:var(--B);}
    .ripple{position:absolute;border-radius:50%;background:rgba(240,200,69,.2);transform:scale(0);animation:rippleA .6s linear;pointer-events:none;}
    @keyframes rippleA{to{transform:scale(4);opacity:0;}}

    /* ─── MARQUEE ─── */
    .mq{background:var(--Y);padding:12px 0;overflow:hidden;}
    .mq-t{display:flex;width:max-content;animation:mqScroll 22s linear infinite;}
    .mq-t:hover{animation-play-state:paused;}
    .mq-item{font-family:var(--FM);font-size:12px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--B);padding:0 22px;white-space:nowrap;display:flex;align-items:center;gap:22px;}
    .mq-dot{width:4px;height:4px;border-radius:50%;background:rgba(14,16,75,.28);}
    @keyframes mqScroll{from{transform:translateX(0);}to{transform:translateX(-50%);}}

    /* ─── HERO SLIDER ─── */
    .hero-wrap{min-height:100vh;position:relative;overflow:hidden;background:var(--B3);}
    .hero-slide{position:absolute;inset:0;opacity:0;transition:opacity 1.2s var(--ease);pointer-events:none;}
    .hero-slide.active{opacity:1;pointer-events:all;}
    .hs-bg{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;filter:saturate(.4) contrast(1.1);transform:scale(1.06);transition:transform 8s var(--ease);}
    .hero-slide.active .hs-bg{transform:scale(1);}
    .hs-ov{position:absolute;inset:0;background:linear-gradient(135deg,rgba(8,9,48,.94) 0%,rgba(8,9,48,.72) 50%,rgba(8,9,48,.45) 100%);}
    .hero-canvas{position:absolute;inset:0;width:100%;height:100%;opacity:.15;}
    .h-grid{position:absolute;inset:0;opacity:.018;background-image:linear-gradient(rgba(240,200,69,1) 1px,transparent 1px),linear-gradient(90deg,rgba(240,200,69,1) 1px,transparent 1px);background-size:64px 64px;}
    .hero-content-wrap{position:relative;z-index:10;min-height:100vh;display:flex;align-items:center;padding:0 56px;}
    .hero-content{max-width:760px;}
    .hero-eyebrow{display:flex;align-items:center;gap:10px;margin-bottom:16px;opacity:0;animation:slideUp .7s .5s var(--ease) forwards;}
    .hero-eyebrow::before{content:'';width:24px;height:1.5px;background:rgba(240,200,69,.45);}
    .hero-eyebrow span{font-size:10px;font-weight:600;letter-spacing:.26em;text-transform:uppercase;color:rgba(240,200,69,.52);}
    .slide-line{opacity:0;animation:slideUp .8s var(--ease) forwards;}
    .hero-kicker{font-family:var(--FI);font-style:italic;font-size:clamp(18px,2.4vw,28px);color:rgba(240,200,69,.52);margin-bottom:10px;line-height:1.4;}
    .hero-headline{font-family:var(--FM);font-weight:800;font-size:clamp(44px,7.5vw,102px);line-height:1.0;letter-spacing:-.02em;color:var(--Y);margin-bottom:6px;}
    .hero-headline .stroke-txt{color:transparent;-webkit-text-stroke:2px rgba(240,200,69,.3);}
    .hero-headline .accent{font-family:var(--FI);font-style:italic;font-weight:400;font-size:.72em;}
    .hero-sub{font-size:15px;line-height:1.75;color:rgba(240,200,69,.52);margin-top:14px;max-width:520px;}
    .hero-actions{margin-top:36px;display:flex;gap:14px;align-items:center;flex-wrap:wrap;opacity:0;animation:slideUp .8s 1.1s var(--ease) forwards;}
    .hero-stats-row{display:flex;gap:0;margin-top:48px;opacity:0;animation:slideUp .8s 1.3s var(--ease) forwards;}
    .hs-stat{padding:16px 24px;border-right:1px solid rgba(240,200,69,.12);background:rgba(8,9,48,.55);backdrop-filter:blur(12px);}
    .hs-stat:last-child{border-right:none;}
    .hs-stat-n{font-family:var(--FM);font-size:28px;font-weight:800;color:var(--Y);line-height:1;}
    .hs-stat-l{font-size:9px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:rgba(240,200,69,.38);margin-top:3px;}
    /* Slider nav */
    .slider-nav{position:absolute;bottom:36px;left:56px;z-index:12;display:flex;gap:8px;align-items:center;}
    .sn-dot{width:28px;height:3px;background:rgba(240,200,69,.25);transition:all .4s;cursor:pointer;border:none;}
    .sn-dot.active{background:var(--Y);width:48px;}
    .slider-arrows{position:absolute;right:56px;bottom:36px;z-index:12;display:flex;gap:8px;}
    .sl-arr{width:44px;height:44px;border:1.5px solid rgba(240,200,69,.3);background:rgba(8,9,48,.55);backdrop-filter:blur(10px);display:flex;align-items:center;justify-content:center;font-size:16px;color:var(--Y);cursor:pointer;transition:all .3s;}
    .sl-arr:hover{background:var(--Y);color:var(--B);border-color:var(--Y);}
    .hero-scroll{position:absolute;bottom:42px;left:50%;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;gap:6px;opacity:0;animation:fadeInA 1s 2s forwards;z-index:12;}
    .h-scl{width:1px;height:52px;background:linear-gradient(to bottom,transparent,var(--Y));animation:scrollAnim 2.2s ease-in-out infinite;}
    .hero-scroll span{font-size:8px;font-weight:600;letter-spacing:.2em;text-transform:uppercase;color:rgba(240,200,69,.28);writing-mode:vertical-rl;}
    /* Deco shapes */
    .h-deco{position:absolute;pointer-events:none;z-index:5;}
    .h-deco1{top:12%;right:7%;opacity:0;animation:decoIn 1s 1.5s forwards;}
    .h-deco2{bottom:20%;right:15%;opacity:0;animation:decoIn 1s 1.7s forwards;}
    .h-deco3{top:55%;right:4%;opacity:0;animation:decoIn 1s 1.9s forwards;}
    @keyframes decoIn{to{opacity:.28;}}
    @keyframes slideUp{from{opacity:0;transform:translateY(32px);}to{opacity:1;transform:none;}}
    @keyframes scrollAnim{0%{transform:scaleY(0);transform-origin:top;}50%{transform:scaleY(1);transform-origin:top;}51%{transform-origin:bottom;}100%{transform:scaleY(0);transform-origin:bottom;}}

    /* ─── ABOUT ─── */
    .about-bg{background:var(--Y);position:relative;overflow:hidden;}
    .about-bg::before{content:'';position:absolute;inset:0;background-image:radial-gradient(rgba(14,16,75,.035) 1px,transparent 1px);background-size:24px 24px;pointer-events:none;}
    .ab-grid{display:grid;grid-template-columns:1fr 1.1fr;gap:68px;align-items:center;}
    .ab-vis{position:relative;height:500px;}
    .ab-img-a{position:absolute;top:0;left:0;right:46px;height:262px;overflow:hidden;clip-path:polygon(0 0,calc(100% - 13px) 0,100% 13px,100% 100%,0 100%);}
    .ab-img-a img{width:100%;height:100%;object-fit:cover;filter:saturate(.7) contrast(1.1);transition:transform .7s var(--ease);}
    .ab-img-a:hover img{transform:scale(1.05);}
    .ab-img-a::after{content:'';position:absolute;inset:0;background:linear-gradient(to bottom,transparent 40%,rgba(14,16,75,.5));pointer-events:none;}
    .ab-img-b{position:absolute;bottom:0;right:0;left:46px;height:215px;overflow:hidden;clip-path:polygon(0 0,calc(100% - 13px) 0,100% 13px,100% 100%,0 100%);}
    .ab-img-b img{width:100%;height:100%;object-fit:cover;filter:saturate(.45) contrast(1.15);transition:transform .7s var(--ease);}
    .ab-img-b:hover img{transform:scale(1.05);}
    .ab-stat-a{position:absolute;top:11px;left:11px;background:var(--B);padding:16px 20px;z-index:5;}
    .ab-stat-b{position:absolute;bottom:11px;right:58px;background:var(--B3);padding:16px 20px;z-index:5;}
    .ab-stat-n{font-family:var(--FM);font-size:48px;font-weight:800;color:var(--Y);line-height:1;}
    .ab-stat-l{font-size:9px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:rgba(240,200,69,.38);margin-top:2px;}
    .ab-badge{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:84px;height:84px;background:var(--Y);border:3px solid rgba(14,16,75,.2);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:34px;z-index:10;box-shadow:0 0 0 12px rgba(14,16,75,.1);}
    .ab-badge::before{content:'';position:absolute;inset:-10px;border-radius:50%;border:1px dashed rgba(14,16,75,.18);animation:rotateSpin 22s linear infinite;}
    @keyframes rotateSpin{to{transform:rotate(360deg);}}
    .ab-txt p{font-size:14px;line-height:1.82;color:rgba(14,16,75,.65);margin-bottom:12px;}
    .ab-txt strong{color:var(--B);font-weight:700;}
    .pills{display:flex;gap:7px;flex-wrap:wrap;margin-top:18px;}
    .pill{border:1.5px solid var(--B);padding:7px 14px;font-size:10px;font-weight:600;letter-spacing:.09em;text-transform:uppercase;color:var(--B);transition:all .3s;cursor:pointer;background:none;font-family:var(--FM);}
    .pill:hover{background:var(--B);color:var(--Y);}
    .team-row{display:flex;align-items:center;gap:12px;margin-top:22px;padding-top:18px;border-top:1px solid rgba(14,16,75,.09);}
    .team-avs{display:flex;}
    .tav{width:34px;height:34px;border-radius:50%;overflow:hidden;border:2px solid var(--Y);margin-right:-9px;}
    .tav img{width:100%;height:100%;object-fit:cover;}
    .team-cp{font-size:11px;color:rgba(14,16,75,.46);}
    .team-cp strong{color:var(--B);display:block;font-size:12px;font-weight:700;}
    .shimmer{position:relative;overflow:hidden;}
    .shimmer::after{content:'';position:absolute;top:0;left:-100%;width:60%;height:100%;background:linear-gradient(90deg,transparent,rgba(255,255,255,.07),transparent);transform:skewX(-20deg);transition:left .8s ease;}
    .shimmer:hover::after{left:160%;}

    /* ─── BRAND STORY ─── */
    .bs-bg{background:var(--B3);position:relative;overflow:hidden;}
    .bs-bg-txt{position:absolute;bottom:-16px;left:-10px;font-family:var(--FM);font-weight:900;font-size:clamp(68px,11vw,185px);color:rgba(240,200,69,.016);user-select:none;pointer-events:none;white-space:nowrap;line-height:1;z-index:0;}
    .bs-two{display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center;margin-bottom:64px;}
    .bs-img-wrap{position:relative;height:320px;overflow:hidden;clip-path:polygon(0 0,calc(100% - 17px) 0,100% 17px,100% 100%,0 100%);}
    .bs-img-wrap img{width:100%;height:100%;object-fit:cover;filter:grayscale(1) contrast(1.15);transition:filter .6s,transform .6s;}
    .bs-img-wrap:hover img{filter:grayscale(.3);transform:scale(1.04);}
    .bs-img-wrap::after{content:'';position:absolute;inset:0;background:linear-gradient(to top,rgba(8,9,48,.86),transparent 52%);}
    .bs-img-lbl{position:absolute;bottom:14px;left:14px;font-size:8px;font-weight:600;letter-spacing:.2em;text-transform:uppercase;color:rgba(240,200,69,.58);background:rgba(240,200,69,.08);border:1px solid rgba(240,200,69,.22);padding:4px 9px;z-index:1;}
    .bs-inspo{background:var(--Y);padding:44px 48px;clip-path:polygon(0 0,calc(100% - 20px) 0,100% 20px,100% 100%,0 100%);margin-bottom:64px;position:relative;overflow:hidden;}
    .bs-inspo-inner{display:grid;grid-template-columns:auto 1fr;gap:34px;align-items:center;position:relative;z-index:1;}
    .bs-inspo-icon{font-size:clamp(52px,7vw,76px);line-height:1;filter:drop-shadow(0 5px 12px rgba(14,16,75,.16));}
    .bs-inspo-title{font-family:var(--FM);font-weight:800;font-size:clamp(22px,3.2vw,40px);color:var(--B);line-height:1.1;margin-bottom:12px;}
    .bs-inspo-text{font-size:13px;line-height:1.82;color:rgba(14,16,75,.6);max-width:640px;}
    .bs-1945{position:absolute;top:-22px;right:10px;font-family:var(--FM);font-weight:900;font-size:clamp(76px,12vw,162px);color:rgba(14,16,75,.048);user-select:none;pointer-events:none;line-height:1;}
    .bs-scoops{display:grid;grid-template-columns:repeat(3,1fr);gap:2px;margin-bottom:64px;}
    .bs-scoop{background:var(--B4);padding:36px 28px;border:1px solid rgba(240,200,69,.07);position:relative;overflow:hidden;transition:all .4s var(--ease);cursor:default;}
    .bs-scoop:hover{background:var(--Y);transform:translateY(-7px);}
    .bs-scoop:hover *{color:var(--B)!important;-webkit-text-stroke:0!important;}
    .bs-scoop:hover .bs-icon-w{background:rgba(14,16,75,.1)!important;border-color:rgba(14,16,75,.16)!important;}
    .bs-sc-bg{position:absolute;top:-5px;right:-5px;font-size:100px;opacity:.038;line-height:1;pointer-events:none;}
    .bs-icon-w{width:44px;height:44px;background:rgba(240,200,69,.08);border:1px solid rgba(240,200,69,.16);display:flex;align-items:center;justify-content:center;font-size:20px;margin-bottom:16px;transition:all .4s;}
    .bs-sc-n{font-size:9px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:rgba(240,200,69,.24);margin-bottom:6px;}
    .bs-sc-t{font-family:var(--FM);font-weight:800;font-size:clamp(17px,1.5vw,22px);color:var(--Y);margin-bottom:9px;line-height:1.15;}
    .bs-sc-d{font-size:12px;line-height:1.76;color:rgba(240,200,69,.38);margin-bottom:13px;}
    .bs-sc-a{display:flex;align-items:center;gap:6px;font-size:10px;font-weight:700;letter-spacing:.09em;text-transform:uppercase;color:rgba(240,200,69,.36);}
    .bs-scoop:hover .bs-sc-a{gap:13px;}
    .bs-promise{border:1px solid rgba(240,200,69,.09);padding:46px;position:relative;overflow:hidden;}
    .bs-promise::before{content:'';position:absolute;inset:0;background-image:radial-gradient(rgba(240,200,69,.018) 1px,transparent 1px);background-size:24px 24px;}
    .bs-promise-grid{display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:center;position:relative;z-index:1;}
    .bs-p-item{border-left:2px solid var(--Y);background:rgba(240,200,69,.04);padding:16px 20px;display:flex;align-items:flex-start;gap:13px;transition:background .3s;margin-bottom:12px;}
    .bs-p-item:hover{background:rgba(240,200,69,.08);}
    .bs-p-item:last-child{margin-bottom:0;}
    .bs-p-icon{font-size:24px;flex-shrink:0;line-height:1;}
    .bs-p-title{font-family:var(--FM);font-weight:700;font-size:16px;color:var(--Y);margin-bottom:4px;}
    .bs-p-txt{font-size:12px;line-height:1.7;color:rgba(240,200,69,.38);}

    /* ─── SERVICES MINI (home) ─── */
    .svc-bg{background:var(--B2);}
    .svc-mini{display:grid;grid-template-columns:repeat(3,1fr);gap:2px;margin-top:32px;}
    .svc-mini-card{background:rgba(240,200,69,.04);border:1px solid rgba(240,200,69,.07);padding:20px 22px;cursor:pointer;transition:all .3s;display:flex;align-items:center;gap:12px;}
    .svc-mini-card:hover{background:rgba(240,200,69,.1);border-color:rgba(240,200,69,.2);}
    .svc-mini-icon{font-size:19px;flex-shrink:0;}
    .svc-mini-name{font-family:var(--FM);font-size:13px;font-weight:700;color:var(--Y);letter-spacing:.02em;}
    .svc-mini-arrow{margin-left:auto;font-size:12px;color:rgba(240,200,69,.3);transition:transform .3s;}
    .svc-mini-card:hover .svc-mini-arrow{transform:translateX(3px);color:var(--Y);}

    /* ─── SERVICES FULL (services page) ─── */
    .svc-full-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:2px;margin-top:40px;}
    .scard{background:var(--B4);padding:36px 30px;border:1px solid rgba(240,200,69,.07);position:relative;overflow:hidden;cursor:pointer;transition:all .4s var(--ease);}
    .scard::before{content:'';position:absolute;bottom:0;left:0;right:0;height:0;background:var(--Y);transition:height .4s var(--ease);z-index:0;}
    .scard:hover::before{height:100%;}
    .scard>*{position:relative;z-index:1;}
    .scard:hover .sn,.scard:hover .si,.scard:hover .st,.scard:hover .sd,.scard:hover .sa{color:var(--B)!important;}
    .sn{font-size:10px;font-weight:700;letter-spacing:.18em;color:rgba(240,200,69,.2);margin-bottom:16px;}
    .si{font-size:26px;display:block;margin-bottom:11px;transition:transform .4s;}
    .scard:hover .si{transform:scale(1.16) rotate(-7deg);}
    .st{font-family:var(--FM);font-weight:800;font-size:18px;color:var(--Y);margin-bottom:8px;}
    .sd{font-size:12px;line-height:1.7;color:rgba(240,200,69,.34);}
    .sa{display:inline-flex;align-items:center;gap:6px;margin-top:16px;font-size:10px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:rgba(240,200,69,.48);transition:gap .3s,color .4s;opacity:.75;}
    .scard:hover .sa{gap:13px;opacity:1;}
    /* Services page detailed list */
    .svc-detail-list{display:flex;flex-direction:column;gap:2px;margin-top:40px;}
    .svc-detail-row{display:grid;grid-template-columns:280px 1fr auto;gap:32px;align-items:center;background:var(--B4);border:1px solid rgba(240,200,69,.07);padding:26px 32px;cursor:pointer;transition:all .3s;position:relative;overflow:hidden;}
    .svc-detail-row::after{content:'';position:absolute;left:0;top:0;bottom:0;width:0;background:var(--Y);transition:width .4s var(--ease);z-index:0;}
    .svc-detail-row:hover::after{width:4px;}
    .svc-detail-row:hover{background:rgba(240,200,69,.06);}
    .svc-detail-row>*{position:relative;z-index:1;}
    .sdr-left{display:flex;align-items:center;gap:14px;}
    .sdr-icon{font-size:26px;flex-shrink:0;}
    .sdr-name{font-family:var(--FM);font-weight:800;font-size:16px;color:var(--Y);}
    .sdr-num{font-size:10px;font-weight:700;letter-spacing:.14em;color:rgba(240,200,69,.28);}
    .sdr-desc{font-size:13px;line-height:1.68;color:rgba(240,200,69,.42);}
    .sdr-tags{display:flex;gap:6px;flex-wrap:wrap;}
    .sdr-tag{font-size:9px;font-weight:600;letter-spacing:.08em;background:rgba(240,200,69,.07);border:1px solid rgba(240,200,69,.14);color:rgba(240,200,69,.55);padding:3px 9px;}

    /* ─── STATS ─── */
    .stats-bg{background:var(--Y);padding:64px 56px;}
    .stats-grid{display:grid;grid-template-columns:repeat(4,1fr);}
    .s-item{padding:28px 20px;border-right:1.5px solid rgba(14,16,75,.1);text-align:center;position:relative;overflow:hidden;}
    .s-item:last-child{border-right:none;}
    .s-item::before{content:'';position:absolute;inset:0;background:rgba(14,16,75,.04);transform:scaleX(0);transform-origin:left;transition:transform .5s var(--ease);}
    .s-item:hover::before{transform:scaleX(1);}
    .s-num{font-family:var(--FM);font-weight:800;font-size:64px;color:var(--B);line-height:1;}
    .s-lbl{font-size:10px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:rgba(14,16,75,.42);margin-top:4px;}

    /* ─── IMAGE BAND ─── */
    .imgband{background:var(--B);overflow:hidden;display:flex;height:240px;}
    .ibt{display:flex;width:max-content;animation:ibScroll 28s linear infinite;height:100%;}
    .ibt:hover{animation-play-state:paused;}
    .ib-item{width:250px;height:100%;flex-shrink:0;overflow:hidden;position:relative;border-right:2px solid var(--B);}
    .ib-item img{width:100%;height:100%;object-fit:cover;filter:saturate(.25) contrast(1.18);transition:filter .5s;}
    .ib-item:hover img{filter:saturate(1) contrast(1);}
    .ib-item::after{content:'';position:absolute;inset:0;background:rgba(8,9,48,.38);pointer-events:none;transition:background .5s;}
    .ib-item:hover::after{background:rgba(8,9,48,.07);}
    .ib-tag{position:absolute;bottom:11px;left:11px;font-size:8px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:rgba(240,200,69,.58);background:rgba(8,9,48,.68);padding:3px 8px;}
    @keyframes ibScroll{from{transform:translateX(0);}to{transform:translateX(-50%);}}

    /* ─── PROCESS SHORT (home) ─── */
    .process-bg{background:var(--B);}
    .proc-steps-short{display:grid;grid-template-columns:repeat(4,1fr);gap:2px;margin-top:36px;}
    .pstep-s{padding:28px 22px;background:var(--B4);border:1px solid rgba(240,200,69,.07);position:relative;overflow:hidden;transition:background .3s;cursor:default;}
    .pstep-s::after{content:'';position:absolute;bottom:0;left:0;right:0;height:2px;background:var(--Y);transform:scaleX(0);transform-origin:left;transition:transform .5s var(--ease);}
    .pstep-s:hover::after{transform:scaleX(1);}
    .pstep-s:hover{background:rgba(240,200,69,.04);}
    .ps-num{font-family:var(--FM);font-weight:800;font-size:48px;color:rgba(240,200,69,.06);line-height:1;margin-bottom:12px;}
    .pstep-s h3{font-family:var(--FM);font-weight:800;font-size:16px;color:var(--Y);margin-bottom:7px;}
    .pstep-s p{font-size:12px;line-height:1.7;color:rgba(240,200,69,.34);}
    /* PROCESS FULL (process page) */
    .proc-steps-full{display:grid;grid-template-columns:repeat(2,1fr);gap:3px;margin-top:40px;}
    .pstep-f{background:var(--B4);border:1px solid rgba(240,200,69,.07);overflow:hidden;position:relative;transition:border-color .3s;}
    .pstep-f:hover{border-color:rgba(240,200,69,.22);}
    .pstep-f-img{width:100%;height:200px;overflow:hidden;position:relative;}
    .pstep-f-img img{width:100%;height:100%;object-fit:cover;filter:saturate(.2) contrast(1.25);transition:filter .5s,transform .5s;}
    .pstep-f:hover .pstep-f-img img{filter:saturate(.7) contrast(1.05);transform:scale(1.04);}
    .pstep-f-img::after{content:'';position:absolute;inset:0;background:linear-gradient(to bottom,transparent 45%,var(--B4));}
    .pstep-f-body{padding:28px 30px 32px;}
    .pstep-f-num{font-family:var(--FM);font-weight:900;font-size:11px;letter-spacing:.18em;color:rgba(240,200,69,.28);margin-bottom:8px;}
    .pstep-f-title{font-family:var(--FM);font-weight:800;font-size:22px;color:var(--Y);margin-bottom:10px;}
    .pstep-f-desc{font-size:13px;line-height:1.78;color:rgba(240,200,69,.42);margin-bottom:14px;}
    .pstep-f-items{display:flex;flex-direction:column;gap:6px;}
    .pstep-f-item{display:flex;align-items:center;gap:9px;font-size:12px;color:rgba(240,200,69,.5);}
    .pstep-f-item::before{content:'';width:4px;height:4px;border-radius:50%;background:var(--Y);flex-shrink:0;}

    /* ─── WORK ─── */
    .work-bg{background:var(--Y);}
    .work-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:3px;margin-top:40px;}
    .wi{position:relative;overflow:hidden;cursor:pointer;aspect-ratio:16/10;background:var(--B);}
    .wi.feat{grid-column:span 2;aspect-ratio:21/7;}
    .wi-bg{position:absolute;inset:0;transition:transform .8s var(--ease);}
    .wi:hover .wi-bg{transform:scale(1.07);}
    .wi-bg img{width:100%;height:100%;object-fit:cover;filter:saturate(.3) contrast(1.1);transition:filter .5s;}
    .wi:hover .wi-bg img{filter:saturate(.78) contrast(1);}
    .wi-ov{position:absolute;inset:0;background:linear-gradient(to top,rgba(8,9,48,.94) 0%,transparent 52%);display:flex;flex-direction:column;justify-content:flex-end;padding:28px;transition:background .4s;}
    .wi:hover .wi-ov{background:linear-gradient(to top,rgba(8,9,48,1) 0%,rgba(8,9,48,.16) 100%);}
    .wi-tag{font-size:8px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:var(--Y);background:rgba(240,200,69,.1);border:1px solid rgba(240,200,69,.28);padding:3px 9px;border-radius:20px;display:inline-block;margin-bottom:7px;width:fit-content;}
    .wi-title{font-family:var(--FM);font-weight:800;font-size:clamp(17px,2.2vw,29px);color:var(--Y);margin-bottom:4px;transform:translateY(6px);transition:transform .4s;}
    .wi:hover .wi-title{transform:none;}
    .wi-meta{font-size:10px;font-weight:500;color:rgba(240,200,69,.34);}
    .wi-arr{position:absolute;top:16px;right:16px;width:38px;height:38px;background:var(--Y);display:flex;align-items:center;justify-content:center;font-size:14px;color:var(--B);transform:scale(0) rotate(-45deg);transition:transform .36s var(--spring);}
    .wi:hover .wi-arr{transform:scale(1) rotate(0);}

    /* ─── TEAM ─── */
    .team-bg{background:var(--B3);}
    .team-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:3px;margin-top:40px;}
    .tm-card{position:relative;overflow:hidden;cursor:pointer;aspect-ratio:3/4;}
    .tm-img{width:100%;height:100%;object-fit:cover;filter:saturate(.15) contrast(1.18);transition:filter .6s,transform .6s;}
    .tm-card:hover .tm-img{filter:saturate(.8);transform:scale(1.05);}
    .tm-card::before{content:'';position:absolute;inset:0;background:linear-gradient(to top,rgba(8,9,48,.9),transparent 47%);z-index:1;}
    .tm-card::after{content:'';position:absolute;inset:0;background:var(--Y);opacity:0;z-index:0;transition:opacity .5s;}
    .tm-card:hover::after{opacity:.05;}
    .tm-info{position:absolute;bottom:0;left:0;right:0;z-index:2;padding:18px;}
    .tm-nm{font-family:var(--FM);font-weight:800;font-size:18px;color:var(--Y);}
    .tm-rl{font-size:10px;font-weight:500;letter-spacing:.09em;color:rgba(240,200,69,.38);text-transform:uppercase;margin-top:2px;}
    .tm-lnks{display:flex;gap:6px;margin-top:9px;transform:translateY(11px);opacity:0;transition:all .4s;}
    .tm-card:hover .tm-lnks{transform:none;opacity:1;}
    .tm-lnk{width:26px;height:26px;background:rgba(240,200,69,.1);border:1px solid rgba(240,200,69,.22);display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;color:var(--Y);transition:all .3s;text-decoration:none;}
    .tm-lnk:hover{background:var(--Y);color:var(--B);}

    /* ─── REVIEWS ─── */
    .reviews-bg{background:var(--B2);}
    .rev-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:2px;margin-top:40px;}
    .rcard{background:var(--B4);border-top:2px solid transparent;padding:28px 24px;position:relative;overflow:hidden;transition:border-color .4s,transform .4s;}
    .rcard::before{content:'\\201C';font-family:var(--FI);font-size:100px;color:rgba(240,200,69,.042);position:absolute;top:-18px;left:11px;line-height:1;}
    .rcard:hover{border-top-color:var(--Y);transform:translateY(-6px);}
    .r-stars{color:var(--Y);font-size:12px;letter-spacing:2px;margin-bottom:11px;}
    .r-txt{font-family:var(--FI);font-style:italic;font-size:13px;line-height:1.82;color:rgba(240,200,69,.46);margin-bottom:16px;}
    .r-auth{display:flex;align-items:center;gap:9px;border-top:1px solid rgba(240,200,69,.06);padding-top:13px;}
    .r-av{width:38px;height:38px;border-radius:50%;overflow:hidden;border:2px solid rgba(240,200,69,.22);flex-shrink:0;}
    .r-av img{width:100%;height:100%;object-fit:cover;filter:saturate(.28);}
    .r-nm{font-weight:700;font-size:12px;color:var(--Y);}
    .r-rl{font-size:10px;color:rgba(240,200,69,.32);}

    /* ─── CLIENTS ─── */
    .clients-bg{background:var(--Y);padding:60px 56px;}
    .cl-lbl{text-align:center;font-size:9px;font-weight:700;letter-spacing:.28em;text-transform:uppercase;color:rgba(14,16,75,.36);margin-bottom:32px;}
    .cl-row{display:flex;justify-content:center;align-items:center;gap:44px;flex-wrap:wrap;margin-bottom:40px;}
    .clogo{font-family:var(--FM);font-weight:800;font-size:16px;letter-spacing:.08em;text-transform:uppercase;color:rgba(14,16,75,.24);transition:color .3s,transform .3s;cursor:default;background:none;border:none;}
    /* Client testimonials carousel */
    .ct-carousel{margin-top:8px;position:relative;overflow:hidden;}
    .ct-track{display:flex;transition:transform .5s var(--ease);}
    .ct-slide{min-width:100%;padding:0 4px;}
    .ct-card{background:var(--B);padding:32px 36px;clip-path:polygon(0 0,calc(100% - 18px) 0,100% 18px,100% 100%,0 100%);display:grid;grid-template-columns:1fr auto;gap:24px;align-items:center;}
    .ct-quote{font-family:var(--FI);font-style:italic;font-size:16px;line-height:1.72;color:rgba(240,200,69,.62);margin-bottom:14px;}
    .ct-auth-name{font-family:var(--FM);font-weight:700;font-size:13px;color:var(--Y);}
    .ct-auth-role{font-size:11px;color:rgba(240,200,69,.38);margin-top:2px;}
    .ct-metric{text-align:center;background:var(--Y);padding:20px 24px;clip-path:polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,0 100%);flex-shrink:0;}
    .ct-metric-n{font-family:var(--FM);font-weight:800;font-size:36px;color:var(--B);line-height:1;}
    .ct-metric-l{font-size:9px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:rgba(14,16,75,.5);margin-top:3px;}
    .ct-nav{display:flex;justify-content:center;gap:7px;margin-top:16px;}
    .ct-dot{width:24px;height:2.5px;background:rgba(14,16,75,.2);cursor:pointer;border:none;transition:all .3s;}
    .ct-dot.active{background:var(--B);width:40px;}
    /* Awards grid */
    .awards-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:2px;margin-top:40px;}
    .award-card{background:rgba(240,200,69,.06);border:1px solid rgba(240,200,69,.12);padding:24px 22px;text-align:center;transition:all .3s;}
    .award-card:hover{background:rgba(240,200,69,.12);border-color:rgba(240,200,69,.25);}
    .award-icon{font-size:32px;display:block;margin-bottom:10px;}
    .award-title{font-family:var(--FM);font-weight:700;font-size:13px;color:var(--Y);margin-bottom:4px;}
    .award-sub{font-size:11px;color:rgba(240,200,69,.38);}

    /* ─── FAQ ─── */
    .faq-bg{background:var(--B);}
    .faq-grid{display:grid;grid-template-columns:1fr 1.2fr;gap:64px;align-items:start;margin-top:40px;}
    .faq-c-item{display:flex;align-items:center;gap:9px;font-size:13px;color:rgba(240,200,69,.42);margin-top:10px;}
    .faq-c-item a{color:rgba(240,200,69,.42);transition:color .3s;}
    .faq-c-item a:hover{color:var(--Y);}
    .faq-list{display:flex;flex-direction:column;gap:2px;}
    .faq-item{background:var(--B2);border:1px solid rgba(240,200,69,.06);border-left:2px solid transparent;transition:border-color .3s,background .3s;overflow:hidden;}
    .faq-item.open{border-left-color:var(--Y);background:var(--B4);}
    .faq-q{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:16px 20px;cursor:pointer;user-select:none;}
    .faq-q-txt{font-family:var(--FM);font-weight:600;font-size:14px;color:var(--Y);}
    .faq-ico{width:26px;height:26px;background:rgba(240,200,69,.07);border:1px solid rgba(240,200,69,.14);display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:13px;color:var(--Y);transition:all .3s;}
    .faq-item.open .faq-ico{background:var(--Y);color:var(--B);transform:rotate(45deg);}
    .faq-a{max-height:0;overflow:hidden;transition:max-height .4s var(--ease);padding:0 20px;}
    .faq-a-inner{font-size:13px;line-height:1.78;color:rgba(240,200,69,.46);padding-bottom:16px;}
    .faq-a-inner strong{color:var(--Y);}

    /* ─── CONTACT ─── */
    .contact-bg{background:var(--B3);position:relative;overflow:hidden;}
    .eq-grid{display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:start;}
    .eq-det{display:flex;flex-direction:column;gap:10px;margin-top:20px;}
    .eq-di{display:flex;align-items:center;gap:9px;font-size:13px;color:rgba(240,200,69,.45);}
    .eq-di a{color:rgba(240,200,69,.45);transition:color .3s;}
    .eq-di a:hover{color:var(--Y);}
    .eq-img-wrap{margin-top:22px;overflow:hidden;clip-path:polygon(0 0,calc(100% - 12px) 0,100% 12px,100% 100%,0 100%);height:165px;}
    .eq-img-wrap img{width:100%;height:100%;object-fit:cover;filter:saturate(.32) contrast(1.1);transition:filter .5s,transform .5s;}
    .eq-img-wrap:hover img{filter:saturate(1) contrast(1);transform:scale(1.04);}
    .eq-form{background:var(--Y);padding:36px;clip-path:polygon(0 0,calc(100% - 18px) 0,100% 18px,100% 100%,0 100%);}
    .fg{margin-bottom:13px;}
    .fg label{display:block;font-size:9px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:rgba(14,16,75,.46);margin-bottom:5px;}
    .fg input,.fg textarea,.fg select{width:100%;background:rgba(14,16,75,.06);border:1.5px solid rgba(14,16,75,.15);color:var(--B);padding:10px 13px;font-family:var(--FM);font-size:13px;outline:none;transition:border-color .3s;}
    .fg input::placeholder,.fg textarea::placeholder{color:rgba(14,16,75,.26);}
    .fg input:focus,.fg textarea:focus,.fg select:focus{border-color:var(--B);}
    .fg textarea{height:90px;resize:vertical;}
    .fg select{color:var(--B);}
    .fg select option{background:var(--Y);color:var(--B);}
    .frow{display:grid;grid-template-columns:1fr 1fr;gap:11px;}
    .btn-sub{width:100%;background:var(--B);color:var(--Y);font-family:var(--FM);font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;padding:14px;border:none;cursor:pointer;clip-path:polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,0 100%);display:flex;align-items:center;justify-content:center;gap:8px;position:relative;overflow:hidden;transition:all .3s;}
    .btn-sub::after{content:'';position:absolute;inset:0;background:var(--B3);transform:translateX(-105%);transition:transform .3s;}
    .btn-sub:hover::after{transform:translateX(0);}
    .btn-sub:hover{transform:translateY(-2px);}
    .btn-sub>*{position:relative;z-index:1;}
    .eq-bg-txt{position:absolute;bottom:-40px;right:-12px;font-family:var(--FM);font-weight:900;font-size:clamp(90px,13vw,200px);color:rgba(240,200,69,.018);user-select:none;pointer-events:none;white-space:nowrap;}

    /* ─── FOOTER ─── */
    footer{background:var(--Y);padding:56px 56px 28px;}
    .ft-grid{display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:44px;padding-bottom:40px;border-bottom:1px solid rgba(14,16,75,.09);margin-bottom:22px;}
    .ft-logo{font-family:var(--FM);font-weight:800;font-size:26px;letter-spacing:.04em;color:var(--B);display:block;margin-bottom:9px;background:none;border:none;cursor:pointer;}
    .ft-brand p{font-size:12px;line-height:1.7;color:rgba(14,16,75,.48);max-width:220px;}
    .ft-soc{display:flex;gap:8px;margin-top:16px;}
    .ft-sl{width:32px;height:32px;border:1px solid var(--B);display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;color:var(--B);transition:all .3s;text-decoration:none;}
    .ft-sl:hover{background:var(--B);color:var(--Y);transform:translateY(-2px);}
    .ft-col h4{font-size:10px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:var(--B);margin-bottom:13px;opacity:.48;}
    .ft-col ul{list-style:none;}
    .ft-col ul li{margin-bottom:7px;}
    .ft-col ul li button,.ft-col ul li a{color:rgba(14,16,75,.46);font-size:12px;transition:color .3s;background:none;border:none;cursor:pointer;font-family:var(--FM);}
    .ft-col ul li button:hover,.ft-col ul li a:hover{color:var(--B);}
    .ft-bot{display:flex;align-items:center;justify-content:space-between;font-size:11px;color:rgba(14,16,75,.36);}
    .ft-bot strong{color:var(--B);font-weight:700;}

    /* ─── PAGE HERO (inner pages) ─── */
    .page-hero{min-height:32vh;background:var(--B3);display:flex;align-items:flex-end;padding:120px 56px 44px;position:relative;overflow:hidden;}
    .page-hero::before{content:'';position:absolute;inset:0;background-image:linear-gradient(rgba(240,200,69,.014) 1px,transparent 1px),linear-gradient(90deg,rgba(240,200,69,.014) 1px,transparent 1px);background-size:52px 52px;}
    .ph-orb{position:absolute;border-radius:50%;filter:blur(70px);pointer-events:none;}
    .ph-orb1{top:-88px;right:-48px;width:380px;height:380px;background:rgba(240,200,69,.038);}
    .ph-orb2{bottom:-48px;left:-34px;width:250px;height:250px;background:rgba(14,16,75,.32);}
    .page-hero-content{position:relative;z-index:2;}
    .page-hero-label{font-size:9px;font-weight:700;letter-spacing:.3em;text-transform:uppercase;color:rgba(240,200,69,.36);margin-bottom:10px;display:flex;align-items:center;gap:8px;}
    .page-hero-label::before{content:'';width:18px;height:1.5px;background:rgba(240,200,69,.36);}
    .page-hero-title{font-family:var(--FM);font-weight:800;font-size:clamp(44px,6.5vw,96px);line-height:1.0;letter-spacing:-.015em;}
    .page-hero-title .solid{color:var(--Y);}
    .page-hero-title .stroke{color:transparent;-webkit-text-stroke:1.5px rgba(240,200,69,.25);}
    .page-hero-sub{font-family:var(--FI);font-style:italic;font-size:15px;color:rgba(240,200,69,.38);margin-top:10px;max-width:460px;line-height:1.6;}

    /* ─── SERVICE MODAL ─── */
    .svc-ov{position:fixed;inset:0;background:rgba(8,9,48,.96);z-index:8000;display:flex;align-items:center;justify-content:center;opacity:0;pointer-events:none;transition:opacity .3s;backdrop-filter:blur(10px);}
    .svc-ov.open{opacity:1;pointer-events:all;}
    .svc-modal{background:var(--B4);border:1px solid rgba(240,200,69,.15);max-width:640px;width:90%;max-height:86vh;overflow-y:auto;clip-path:polygon(0 0,calc(100% - 24px) 0,100% 24px,100% 100%,0 100%);transform:translateY(26px) scale(.96);transition:transform .36s var(--spring);scrollbar-width:thin;scrollbar-color:rgba(240,200,69,.15) transparent;}
    .svc-ov.open .svc-modal{transform:none;}
    .sm-head{background:var(--Y);padding:26px 30px;display:flex;align-items:center;justify-content:space-between;gap:14px;position:sticky;top:0;z-index:2;}
    .sm-icon{font-size:38px;line-height:1;}
    .sm-title{font-family:var(--FM);font-weight:800;font-size:clamp(18px,2.2vw,29px);color:var(--B);}
    .sm-num{font-size:10px;font-weight:700;letter-spacing:.18em;color:rgba(14,16,75,.34);margin-bottom:3px;}
    .sm-close{width:34px;height:34px;background:var(--B);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:15px;color:var(--Y);flex-shrink:0;transition:all .3s;}
    .sm-close:hover{background:var(--B3);}
    .sm-body{padding:28px;}
    .sm-desc{font-size:14px;line-height:1.84;color:rgba(240,200,69,.56);margin-bottom:22px;}
    .sm-feats{display:grid;grid-template-columns:1fr 1fr;gap:9px;margin-bottom:22px;}
    .sm-feat{display:flex;align-items:flex-start;gap:8px;background:rgba(240,200,69,.04);border:1px solid rgba(240,200,69,.07);padding:12px;}
    .sm-feat-icon{color:var(--Y);font-size:14px;flex-shrink:0;}
    .sm-feat-txt strong{color:var(--Y);display:block;font-size:11px;font-weight:700;margin-bottom:2px;}
    .sm-feat-txt span{font-size:11px;line-height:1.52;color:rgba(240,200,69,.46);}
    .sm-results{background:var(--Y);padding:20px 24px;display:flex;gap:22px;flex-wrap:wrap;margin-bottom:22px;}
    .sm-r-n{font-family:var(--FM);font-weight:800;font-size:32px;color:var(--B);line-height:1;}
    .sm-r-l{font-size:9px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:rgba(14,16,75,.46);margin-top:2px;}
    .sm-cta{display:inline-flex;align-items:center;gap:8px;background:var(--Y);color:var(--B);font-family:var(--FM);font-size:11px;font-weight:700;letter-spacing:.09em;text-transform:uppercase;padding:12px 28px;border:none;cursor:pointer;clip-path:polygon(0 0,calc(100% - 9px) 0,100% 9px,100% 100%,0 100%);transition:all .3s;}
    .sm-cta:hover{background:var(--B3);color:var(--Y);transform:translateY(-2px);}

    /* ─── CAMPAIGN MODAL ─── */
    .camp-ov{position:fixed;inset:0;background:rgba(8,9,48,.97);z-index:8000;display:flex;align-items:center;justify-content:center;opacity:0;pointer-events:none;transition:opacity .3s;backdrop-filter:blur(12px);}
    .camp-ov.open{opacity:1;pointer-events:all;}
    .camp-modal{background:var(--B4);border:1px solid rgba(240,200,69,.13);max-width:780px;width:92%;max-height:86vh;overflow-y:auto;clip-path:polygon(0 0,calc(100% - 26px) 0,100% 26px,100% 100%,0 100%);transform:translateY(34px) scale(.95);transition:transform .4s var(--spring);scrollbar-width:thin;scrollbar-color:rgba(240,200,69,.15) transparent;}
    .camp-ov.open .camp-modal{transform:none;}
    .camp-hero-img{width:100%;height:216px;overflow:hidden;position:relative;}
    .camp-hero-img img{width:100%;height:100%;object-fit:cover;filter:saturate(.45) contrast(1.1);}
    .camp-hero-img::after{content:'';position:absolute;inset:0;background:linear-gradient(to top,rgba(14,16,75,.86),transparent 50%);}
    .camp-hero-bot{position:absolute;bottom:0;left:0;padding:20px 26px;z-index:1;}
    .camp-close{position:absolute;top:13px;right:13px;z-index:10;width:36px;height:36px;background:rgba(8,9,48,.8);border:1px solid rgba(240,200,69,.26);cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:15px;color:var(--Y);transition:all .3s;backdrop-filter:blur(8px);}
    .camp-close:hover{background:var(--Y);color:var(--B);}
    .camp-body{padding:28px 28px 36px;}
    .camp-tag{font-size:8px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:var(--Y);background:rgba(240,200,69,.1);border:1px solid rgba(240,200,69,.32);padding:3px 10px;display:inline-block;margin-bottom:9px;}
    .camp-ttl{font-family:var(--FM);font-weight:800;font-size:clamp(22px,3.2vw,40px);color:var(--Y);line-height:1.05;margin-bottom:5px;}
    .camp-sub{font-size:11px;font-weight:500;color:rgba(240,200,69,.36);letter-spacing:.04em;}
    .camp-kpis{display:grid;grid-template-columns:repeat(4,1fr);gap:2px;margin:18px 0;}
    .kpi{background:var(--Y);padding:16px 13px;text-align:center;}
    .kpi-n{font-family:var(--FM);font-weight:800;font-size:30px;color:var(--B);line-height:1;}
    .kpi-l{font-size:9px;font-weight:700;letter-spacing:.07em;text-transform:uppercase;color:rgba(14,16,75,.46);margin-top:2px;}
    .camp-div{height:1px;background:rgba(240,200,69,.07);margin:20px 0;}
    .camp-ov-txt{font-size:13px;line-height:1.82;color:rgba(240,200,69,.56);margin-bottom:20px;}
    .camp-sh{font-family:var(--FM);font-weight:700;font-size:15px;color:var(--Y);letter-spacing:.03em;margin-bottom:10px;}
    .camp-chals{display:flex;flex-direction:column;gap:8px;margin-bottom:20px;}
    .camp-chal{display:flex;align-items:flex-start;gap:10px;background:rgba(240,200,69,.04);border:1px solid rgba(240,200,69,.06);padding:11px 14px;}
    .camp-chal-i{color:var(--Y);font-size:14px;flex-shrink:0;}
    .camp-chal-t{font-size:12px;line-height:1.6;color:rgba(240,200,69,.48);}
    .camp-svcs{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:20px;}
    .camp-svc-t{background:rgba(240,200,69,.07);border:1px solid rgba(240,200,69,.14);color:rgba(240,200,69,.65);font-size:10px;font-weight:600;letter-spacing:.05em;padding:4px 11px;}
    .camp-tl{display:grid;grid-template-columns:repeat(3,1fr);gap:2px;margin-bottom:20px;}
    .camp-tl-item{background:rgba(240,200,69,.048);border:1px solid rgba(240,200,69,.07);padding:14px;}
    .camp-tl-ph{font-family:var(--FM);font-weight:700;font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:rgba(240,200,69,.34);margin-bottom:4px;}
    .camp-tl-ac{font-size:12px;line-height:1.5;color:rgba(240,200,69,.62);}
    .camp-q{border-left:2px solid var(--Y);background:rgba(240,200,69,.04);padding:17px 20px;margin-bottom:20px;}
    .camp-q-t{font-family:var(--FI);font-style:italic;font-size:14px;line-height:1.76;color:rgba(240,200,69,.62);margin-bottom:8px;}
    .camp-q-by{font-size:10px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:rgba(240,200,69,.34);}
    .camp-cta-row{display:flex;gap:12px;align-items:center;flex-wrap:wrap;}
    .btn-ghost{color:var(--Y);font-size:11px;font-weight:600;letter-spacing:.09em;text-transform:uppercase;display:inline-flex;align-items:center;gap:8px;border-bottom:1px solid rgba(240,200,69,.22);border-top:none;border-left:none;border-right:none;padding-bottom:2px;transition:all .3s;opacity:.62;background:none;cursor:pointer;font-family:var(--FM);}
    .btn-ghost:hover{opacity:1;gap:15px;border-bottom-color:var(--Y);}

    /* ─── BLOG ─── */
    .blog-bg{background:var(--B2);}
    .blog-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:2px;margin-top:40px;}
    .blog-card{background:var(--B4);overflow:hidden;cursor:pointer;border:1px solid rgba(240,200,69,.06);transition:border-color .3s;animation:none;}
    .blog-card:hover{border-color:rgba(240,200,69,.18);}
    .blog-card.featured{grid-column:span 2;display:grid;grid-template-columns:1fr 1fr;}
    .blog-img{overflow:hidden;position:relative;}
    .blog-card:not(.featured) .blog-img{height:190px;}
    .blog-card.featured .blog-img{height:100%;min-height:265px;}
    .blog-img img{width:100%;height:100%;object-fit:cover;filter:saturate(.25) contrast(1.18);transition:filter .5s,transform .5s;}
    .blog-card:hover .blog-img img{filter:saturate(.82) contrast(1);transform:scale(1.04);}
    .blog-img-ov{position:absolute;inset:0;background:linear-gradient(to top,rgba(8,9,48,.86),transparent 55%);}
    .blog-cat{position:absolute;bottom:12px;left:12px;font-size:8px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:var(--Y);background:rgba(240,200,69,.1);border:1px solid rgba(240,200,69,.28);padding:3px 8px;}
    .blog-body{padding:24px 26px 28px;}
    .blog-meta{display:flex;gap:9px;margin-bottom:9px;font-size:9px;font-weight:600;letter-spacing:.06em;color:rgba(240,200,69,.3);}
    .blog-title{font-family:var(--FM);font-weight:800;font-size:clamp(15px,1.6vw,20px);color:var(--Y);line-height:1.18;margin-bottom:8px;}
    .blog-excerpt{font-size:12px;line-height:1.68;color:rgba(240,200,69,.34);margin-bottom:16px;}
    .blog-read{display:inline-flex;align-items:center;gap:6px;font-size:10px;font-weight:700;letter-spacing:.09em;text-transform:uppercase;color:rgba(240,200,69,.48);transition:all .3s;}
    .blog-card:hover .blog-read{color:var(--Y);gap:11px;}

    /* ─── BLOG POST ─── */
    .blog-post-wrap{background:var(--B3);}
    .blog-post-hero{height:50vh;overflow:hidden;position:relative;}
    .blog-post-hero img{width:100%;height:100%;object-fit:cover;filter:saturate(.32) contrast(1.1);}
    .blog-post-hero::after{content:'';position:absolute;inset:0;background:linear-gradient(to top,var(--B3) 0%,rgba(8,9,48,.55) 60%,transparent);}
    .bp-content{max-width:740px;margin:0 auto;padding:48px 56px 80px;}
    .bp-cat{font-size:9px;font-weight:700;letter-spacing:.26em;text-transform:uppercase;color:var(--Y);background:rgba(240,200,69,.1);border:1px solid rgba(240,200,69,.28);padding:4px 10px;display:inline-block;margin-bottom:14px;}
    .bp-title{font-family:var(--FM);font-weight:800;font-size:clamp(30px,4.5vw,58px);color:var(--Y);line-height:1.1;margin-bottom:12px;}
    .bp-meta{font-size:10px;font-weight:600;color:rgba(240,200,69,.33);letter-spacing:.06em;display:flex;gap:12px;margin-bottom:28px;padding-bottom:22px;border-bottom:1px solid rgba(240,200,69,.07);}
    .bp-lead{font-family:var(--FI);font-style:italic;font-size:17px;line-height:1.7;color:rgba(240,200,69,.62);margin-bottom:26px;}
    .bp-body h2{font-family:var(--FM);font-weight:800;font-size:24px;color:var(--Y);margin:28px 0 11px;}
    .bp-body h3{font-family:var(--FM);font-weight:700;font-size:18px;color:var(--Y);margin:20px 0 9px;}
    .bp-body p{font-size:14px;line-height:1.86;color:rgba(240,200,69,.52);margin-bottom:16px;}
    .bp-body strong{color:var(--Y);}
    .bp-body blockquote{border-left:2px solid var(--Y);background:rgba(240,200,69,.04);padding:16px 20px;margin:22px 0;font-family:var(--FI);font-style:italic;font-size:15px;color:rgba(240,200,69,.62);}
    .bp-divider{height:1px;background:rgba(240,200,69,.07);margin:28px 0;}
    .bp-back{margin-top:40px;padding-top:28px;border-top:1px solid rgba(240,200,69,.07);}

    /* ─── CHATBOT ─── */
    #bot-btn{position:fixed;bottom:26px;right:26px;z-index:9000;width:56px;height:56px;background:var(--Y);border-radius:50%;display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 6px 32px rgba(240,200,69,.35);transition:transform .32s var(--spring),box-shadow .32s;border:none;animation:botPop .6s 3s both;}
    @keyframes botPop{from{transform:scale(0) rotate(-25deg);opacity:0;}to{transform:scale(1);opacity:1;}}
    #bot-btn:hover{transform:scale(1.09) rotate(-5deg);box-shadow:0 11px 44px rgba(240,200,69,.48);}
    #bot-btn.open{background:var(--B4);border:2px solid rgba(240,200,69,.32);}
    #bot-btn.open:hover{transform:scale(1.05);}
    .bb-badge{position:absolute;top:-3px;right:-3px;width:18px;height:18px;background:#e74c3c;border-radius:50%;border:2px solid var(--B3);display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700;color:#fff;animation:pulse 2s infinite;}
    @keyframes pulse{0%,100%{box-shadow:0 0 0 0 rgba(231,76,60,.5);}50%{box-shadow:0 0 0 7px rgba(231,76,60,0);}}
    #bot-win{position:fixed;bottom:96px;right:26px;z-index:8999;width:370px;background:var(--B3);border:1px solid rgba(240,200,69,.15);display:flex;flex-direction:column;clip-path:polygon(0 0,calc(100% - 19px) 0,100% 19px,100% 100%,0 100%);box-shadow:0 20px 65px rgba(0,0,0,.6);transform:scale(.88) translateY(20px);transform-origin:bottom right;opacity:0;pointer-events:none;transition:transform .34s var(--spring),opacity .28s;max-height:540px;overflow:hidden;}
    #bot-win.open{transform:scale(1) translateY(0);opacity:1;pointer-events:all;}
    .bh{background:var(--Y);padding:13px 17px;display:flex;align-items:center;gap:9px;flex-shrink:0;}
    .bh-fox{font-size:26px;line-height:1;animation:foxWag 3s ease-in-out infinite;}
    @keyframes foxWag{0%,100%{transform:rotate(0);}25%{transform:rotate(-8deg);}75%{transform:rotate(7deg);}}
    .bh-info{flex:1;min-width:0;}
    .bh-nm{font-family:var(--FM);font-weight:800;font-size:16px;color:var(--B);letter-spacing:.03em;line-height:1;}
    .bh-st{font-size:9px;font-weight:600;color:rgba(14,16,75,.48);letter-spacing:.06em;display:flex;align-items:center;gap:4px;margin-top:2px;}
    .bh-dot{width:5px;height:5px;border-radius:50%;background:#27ae60;flex-shrink:0;animation:dotPulse 2s infinite;}
    @keyframes dotPulse{0%,100%{opacity:1;}50%{opacity:.28;}}
    .bh-lang{background:rgba(14,16,75,.12);border:1.5px solid rgba(14,16,75,.2);padding:4px 8px;font-size:9px;font-weight:700;letter-spacing:.06em;color:var(--B);cursor:pointer;transition:all .3s;font-family:var(--FM);}
    .bh-lang:hover{background:var(--B);color:var(--Y);}
    .bh-cl{width:25px;height:25px;background:rgba(14,16,75,.1);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:12px;color:var(--B);transition:all .3s;flex-shrink:0;}
    .bh-cl:hover{background:var(--B);color:var(--Y);}
    .bq{padding:8px 12px;display:flex;gap:5px;flex-wrap:wrap;border-bottom:1px solid rgba(240,200,69,.06);flex-shrink:0;}
    .bqc{background:rgba(240,200,69,.07);border:1px solid rgba(240,200,69,.14);color:rgba(240,200,69,.68);font-size:9px;font-weight:600;letter-spacing:.03em;padding:4px 8px;cursor:pointer;white-space:nowrap;transition:all .2s;font-family:var(--FM);}
    .bqc:hover{background:var(--Y);color:var(--B);border-color:var(--Y);}
    #bot-msgs{flex:1;overflow-y:auto;padding:11px;display:flex;flex-direction:column;gap:8px;scrollbar-width:thin;scrollbar-color:rgba(240,200,69,.12) transparent;min-height:185px;max-height:290px;}
    .cmsg{display:flex;align-items:flex-end;gap:6px;animation:msgPop .3s var(--spring);}
    @keyframes msgPop{from{opacity:0;transform:translateY(9px) scale(.95);}to{opacity:1;transform:none;}}
    .cmsg.user{flex-direction:row-reverse;}
    .c-av{width:22px;height:22px;border-radius:50%;background:var(--Y);display:flex;align-items:center;justify-content:center;font-size:10px;flex-shrink:0;line-height:1;}
    .c-bbl{max-width:80%;padding:7px 11px;font-size:12px;line-height:1.6;word-break:break-word;}
    .cmsg.bot .c-bbl{background:var(--B4);color:rgba(240,200,69,.82);border-bottom-left-radius:0;border:1px solid rgba(240,200,69,.07);}
    .cmsg.user .c-bbl{background:var(--Y);color:var(--B);border-bottom-right-radius:0;font-weight:600;}
    .c-bbl strong{color:var(--Y);}
    .cmsg.user .c-bbl strong{color:var(--B);}
    .typing{display:flex;gap:4px;align-items:center;padding:8px 12px;background:var(--B4);border:1px solid rgba(240,200,69,.06);width:fit-content;border-bottom-left-radius:0;}
    .typing span{width:4px;height:4px;border-radius:50%;background:rgba(240,200,69,.4);animation:typeDot 1.2s ease-in-out infinite;}
    .typing span:nth-child(2){animation-delay:.22s;}
    .typing span:nth-child(3){animation-delay:.44s;}
    @keyframes typeDot{0%,60%,100%{transform:translateY(0);opacity:.4;}30%{transform:translateY(-4px);opacity:1;}}
    .bi{padding:9px 11px;border-top:1px solid rgba(240,200,69,.07);display:flex;gap:6px;align-items:center;flex-shrink:0;background:rgba(8,9,48,.48);}
    #bot-inp{flex:1;background:rgba(240,200,69,.06);border:1.5px solid rgba(240,200,69,.12);color:var(--Y);padding:7px 11px;font-family:var(--FM);font-size:12px;outline:none;transition:border-color .3s;}
    #bot-inp::placeholder{color:rgba(240,200,69,.2);}
    #bot-inp:focus{border-color:rgba(240,200,69,.42);}
    #bot-send{width:32px;height:32px;background:var(--Y);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:12px;color:var(--B);clip-path:polygon(0 0,calc(100% - 6px) 0,100% 6px,100% 100%,0 100%);transition:all .3s;flex-shrink:0;}
    #bot-send:hover{background:var(--B4);color:var(--Y);}
    #bot-send:disabled{opacity:.3;cursor:not-allowed;}
    .bot-powered{text-align:center;font-size:8px;font-weight:600;letter-spacing:.09em;color:rgba(240,200,69,.15);padding:5px 0 6px;flex-shrink:0;}

    /* ─── RESPONSIVE ─── */
    @media(max-width:1100px){
      nav{padding:16px 20px;}nav.sc{padding:11px 20px;}
      .nav-links,.nav-cta{display:none!important;}.hburg{display:flex!important;}
      .sec{padding:58px 20px;}
      .stats-bg{padding:58px 20px;}.clients-bg{padding:52px 20px;}
      .page-hero{padding:110px 20px 36px;}
      .ab-grid,.bs-two,.eq-grid,.faq-grid,.bs-promise-grid{grid-template-columns:1fr;gap:32px;}
      .ab-vis{height:280px;}
      .svc-full-grid,.svc-mini{grid-template-columns:1fr 1fr;}
      .svc-detail-row{grid-template-columns:1fr auto;gap:16px;}
      .sdr-desc{display:none;}
      .proc-steps-short{grid-template-columns:1fr 1fr;}
      .proc-steps-full{grid-template-columns:1fr;}
      .stats-grid{grid-template-columns:1fr 1fr;}
      .work-grid{grid-template-columns:1fr;}.wi.feat{grid-column:span 1;}
      .rev-grid{grid-template-columns:1fr 1fr;}
      .team-grid{grid-template-columns:repeat(2,1fr);}
      .ft-grid{grid-template-columns:1fr 1fr;gap:26px;}
      .bs-scoops{grid-template-columns:1fr 1fr!important;}
      .bs-inspo-inner{grid-template-columns:1fr!important;}
      .camp-kpis{grid-template-columns:1fr 1fr;}
      .sm-feats{grid-template-columns:1fr;}
      .blog-grid{grid-template-columns:1fr;}
      .blog-card.featured{grid-template-columns:1fr;}
      .hero-content-wrap{padding:0 20px;}
      .slider-nav,.slider-arrows{left:20px;right:20px;}
      .ct-card{grid-template-columns:1fr;}
      .awards-grid{grid-template-columns:1fr 1fr;}
      .bp-content{padding:32px 20px 60px;}
    }
    @media(max-width:640px){
      .sec{padding:44px 14px;}
      .svc-full-grid,.rev-grid,.svc-mini,.awards-grid{grid-template-columns:1fr;}
      .proc-steps-short{grid-template-columns:1fr;}
      .stats-grid{grid-template-columns:1fr 1fr;}
      .team-grid{grid-template-columns:1fr 1fr;}
      .ft-grid{grid-template-columns:1fr;}
      .stats-bg{padding:44px 14px;}.clients-bg{padding:44px 14px;}
      .bs-scoops{grid-template-columns:1fr!important;}
      #bot-win{right:7px;left:7px;width:auto;bottom:78px;}
      #bot-btn{right:12px;bottom:14px;width:50px;height:50px;}
      nav{padding:15px 14px;}
      .frow{grid-template-columns:1fr;}
      .camp-kpis,.camp-tl{grid-template-columns:1fr 1fr;}
      .hero-stats-row{flex-wrap:wrap;}
      .slider-arrows{display:none;}
    }
  `}</style>
);

// ═══════════════════════════════════════════════════════════
// DATA
// ═══════════════════════════════════════════════════════════
const SVC_DATA = {
  seo:{num:'01',icon:'🔍',title:'Search Engine Optimisation',tags:['Technical SEO','Link Building','On-Page Optimisation','Local SEO'],desc:'Dominate organic search with our fox-sharp SEO methodology. We engineer sustainable visibility through technical excellence, content authority, and strategic link building.',feats:[{i:'⚡',t:'Technical SEO Audit',d:'Core Web Vitals, crawlability, indexation, structured data'},{i:'🎯',t:'Keyword Intelligence',d:'Intent-based research targeting buyers, not browsers'},{i:'🔗',t:'Link Building',d:'White-hat outreach building real domain authority'},{i:'📝',t:'On-Page Optimisation',d:'Every meta, heading, and content piece optimised'},{i:'📍',t:'Local SEO',d:'Google Business Profile, citations, local pack domination'},{i:'📊',t:'Monthly Reporting',d:'Transparent rank tracking and ROI reports'}],res:[{n:'3x',l:'Avg Traffic Increase'},{n:'6mo',l:'To Rank #1'},{n:'65%',l:'Organic Lead Growth'}]},
  social:{num:'02',icon:'📱',title:'Social Media Marketing',tags:['Content Creation','Community Mgmt','Growth Strategy','Influencer'],desc:"We don't just post — we build communities and turn followers into loyal customers. Data-driven social strategies obsessed with engagement that converts.",feats:[{i:'📸',t:'Content Creation',d:'Scroll-stopping visuals, reels, carousels & copy'},{i:'📅',t:'Content Calendar',d:'Strategic scheduling across all platforms'},{i:'💬',t:'Community Management',d:'Real-time engagement, DMs, comments daily'},{i:'📈',t:'Growth Strategy',d:'Organic follower growth with the right audience'},{i:'🤝',t:'Influencer Tie-ups',d:'Micro & macro influencer campaign management'},{i:'🔍',t:'Competitor Analysis',d:'Weekly competitive intelligence'}],res:[{n:'340%',l:'Avg Sales Increase'},{n:'10x',l:'Engagement Growth'},{n:'50K+',l:'Followers Built'}]},
  performance:{num:'03',icon:'🎯',title:'Performance Advertising',tags:['Google Ads','Meta Ads','Retargeting','A/B Testing'],desc:'Every rupee works harder. ROI-obsessed campaigns on Google, Meta, and programmatic with rigorous A/B testing and relentless optimisation from day one.',feats:[{i:'🔍',t:'Google Ads',d:'Search, Display, Shopping, YouTube campaigns'},{i:'📘',t:'Meta Ads',d:'Facebook & Instagram lead gen and e-commerce'},{i:'🎯',t:'Retargeting',d:'Pixel-perfect remarketing to warm audiences'},{i:'🧪',t:'A/B Testing',d:'Continuous creative and landing page testing'},{i:'📊',t:'Conversion Tracking',d:'Full funnel attribution and ROAS reporting'},{i:'💡',t:'Creative Strategy',d:'Ad copy, visuals and video that convert'}],res:[{n:'10x',l:'Average ROAS'},{n:'-60%',l:'CPL Reduction'},{n:'₹50Cr',l:'Ad Spend Managed'}]},
  content:{num:'04',icon:'✍️',title:'Content Strategy & Creation',tags:['Blog Strategy','Video Scripts','Email Sequences','Lead Magnets'],desc:'Content that educates, entertains, and converts. Editorial strategies that position your brand as the authority with every piece crafted for SEO and conversion.',feats:[{i:'📝',t:'Blog Strategy',d:'Topical authority clusters, pillar pages & SEO blogs'},{i:'🎬',t:'Video Scripts',d:'YouTube, Reels, TVC and explainer scripts'},{i:'📧',t:'Email Sequences',d:'Welcome, nurture, cart abandonment automations'},{i:'📖',t:'Brand Storytelling',d:'About pages, case studies, manifesto content'},{i:'🎙️',t:'Podcast Content',d:'Show notes, scripts, social audiograms'},{i:'📑',t:'Lead Magnets',d:'Ebooks, whitepapers, templates that generate leads'}],res:[{n:'225x',l:'Blog Traffic Growth'},{n:'42%',l:'Email Open Rate'},{n:'3.8x',l:'Content ROI'}]},
  web:{num:'05',icon:'🌐',title:'Web Design & Development',tags:['UI/UX Design','Performance Dev','E-commerce','CMS Integration'],desc:'Your website is your hardest-working salesperson. Conversion-optimised experiences balancing world-class aesthetics with performance engineering.',feats:[{i:'💎',t:'UI/UX Design',d:'User-first design with striking visual identity'},{i:'⚡',t:'Performance Dev',d:'Sub-2s load times, Core Web Vitals optimised'},{i:'📱',t:'Mobile-First',d:'Flawless experience across every device'},{i:'🛒',t:'E-commerce',d:'Shopify, WooCommerce, custom platforms'},{i:'🔒',t:'Security & SEO',d:'SSL, schema, sitemaps, technical SEO built-in'},{i:'🔧',t:'CMS Integration',d:'Easy-to-manage backends your team can handle'}],res:[{n:'2.1s',l:'Avg Load Time'},{n:'+84%',l:'Conversion Rate Lift'},{n:'100',l:'PageSpeed Score'}]},
  analytics:{num:'06',icon:'📊',title:'Analytics & Reporting',tags:['GA4 Setup','Custom Dashboards','Attribution','Monthly Reports'],desc:"You can't grow what you can't measure. Real-time dashboards and monthly reports that translate raw data into clear, actionable decisions.",feats:[{i:'📊',t:'GA4 Setup',d:'Full Google Analytics 4 configuration & events'},{i:'🎯',t:'Conversion Tracking',d:'Every form, call, click and transaction tracked'},{i:'📉',t:'Custom Dashboards',d:'Looker Studio dashboards updated real-time'},{i:'🔍',t:'Attribution Modelling',d:'Multi-touch attribution across all channels'},{i:'📅',t:'Monthly Reports',d:'Plain-English reports with insights & actions'},{i:'🧠',t:'Data Strategy',d:'Turn your data into a competitive advantage'}],res:[{n:'100%',l:'Data Visibility'},{n:'2x',l:'Decision Speed'},{n:'₹0',l:'Wasted Spend'}]},
  branding:{num:'07',icon:'🎨',title:'Branding & Identity',tags:['Brand Strategy','Logo Design','Visual Identity','Brand Guidelines'],desc:"Great brands are impossible to forget. We build identities from the ground up: positioning, naming, visual systems, and brand guidelines.",feats:[{i:'🧭',t:'Brand Strategy',d:'Positioning, voice, values, competitive differentiation'},{i:'✏️',t:'Logo Design',d:'Primary, secondary, and favicon mark systems'},{i:'🎨',t:'Visual Identity',d:'Color palette, typography, iconography system'},{i:'📚',t:'Brand Guidelines',d:'Comprehensive brand book for consistent application'},{i:'📦',t:'Packaging Design',d:'Product and retail packaging that sells on shelf'},{i:'🌐',t:'Brand Collateral',d:'Business cards, decks, email signatures & more'}],res:[{n:'4x',l:'Brand Recall Lift'},{n:'90%',l:'Client Satisfaction'},{n:'50+',l:'Brands Built'}]},
  email:{num:'08',icon:'📧',title:'Email & CRM Marketing',tags:['Automation Flows','Segmentation','Newsletter Design','CRM Integration'],desc:'Email delivers the highest ROI of any channel — if done right. Programs that turn cold leads into paying customers and one-time buyers into fans.',feats:[{i:'🤖',t:'Automation Flows',d:'Welcome series, nurture, abandoned cart, win-back'},{i:'🎯',t:'Segmentation',d:'Hyper-targeted lists based on behavior & intent'},{i:'📧',t:'Newsletter Design',d:'Beautiful, mobile-first templates that convert'},{i:'🧪',t:'A/B Testing',d:'Subject lines, CTAs, and design split testing'},{i:'📊',t:'CRM Integration',d:'HubSpot, Mailchimp, Klaviyo, ActiveCampaign'},{i:'📈',t:'Deliverability',d:'Domain warm-up, spam scoring, inbox placement'}],res:[{n:'42%',l:'Avg Open Rate'},{n:'8.6x',l:'Email ROI'},{n:'35%',l:'Revenue from Email'}]},
  influencer:{num:'09',icon:'🤝',title:'Influencer Marketing',tags:['Creator Research','Campaign Mgmt','ROI Tracking','UGC Strategy'],desc:'The right creator voice shortcodes years of brand building. We identify, vet, and manage campaigns that feel authentic and deliver measurable ROI.',feats:[{i:'🔍',t:'Influencer Research',d:'Data-driven discovery of creators that fit'},{i:'🤝',t:'Outreach & Negotiation',d:'End-to-end partnership management'},{i:'📋',t:'Brief Creation',d:'Detailed creative briefs ensuring brand alignment'},{i:'📸',t:'Content Review',d:'Quality control before every post goes live'},{i:'📊',t:'ROI Tracking',d:'UTM links, promo codes, conversion attribution'},{i:'🌟',t:'UGC Strategy',d:'Turn influencer content into paid ad creative'}],res:[{n:'500+',l:'Creators Managed'},{n:'12x',l:'Avg Campaign ROAS'},{n:'18M+',l:'Reach Delivered'}]},
  strategy:{num:'—',icon:'🧠',title:'Digital Strategy',tags:['Brand Audit','Channel Strategy','90-Day Roadmap','Budget Allocation'],desc:'Strategy is the foundation everything is built on. Before a single ad or post, we map the full digital landscape to build a roadmap that gets results.',feats:[{i:'🔎',t:'Brand Audit',d:'Full assessment of your current digital presence'},{i:'🎯',t:'Audience Research',d:'Deep psychographic and demographic profiling'},{i:'🗺️',t:'Channel Strategy',d:'Identifying which channels deserve your budget'},{i:'📅',t:'90-Day Roadmap',d:'Execution plan with milestones and KPIs'},{i:'💰',t:'Budget Allocation',d:'Data-driven spend distribution for max ROI'},{i:'📊',t:'Quarterly Reviews',d:'Strategy evolution sessions with your team'}],res:[{n:'200+',l:'Brands Strategised'},{n:'7+',l:'Years Experience'},{n:'98%',l:'Client Retention'}]}
};

const CAMP_DATA = {
  novabrand:{img:'https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=1400&auto=format&fit=crop&q=80',tag:'Performance Marketing',ttl:'NovaBrand — 10x ROI',sub:'Google Ads · Meta Ads · Landing Page · Analytics · 4 Months',kpis:[{n:'10x',l:'ROI Delivered'},{n:'3x',l:'Organic Traffic'},{n:'₹2.4Cr',l:'Revenue Generated'},{n:'4mo',l:'Timeline'}],ov:"NovaBrand India came to us with one problem: their previous agency was burning ₹8 lakh/month with zero measurable ROI. We rebuilt everything — strategy, creative, landing pages, tracking — turning paid channels into a consistent revenue machine delivering 10x ROAS in 4 months.",chals:[{i:'🔥',t:'Zero conversion tracking — no idea what was working or why'},{i:'💸',t:'Ad creative fatigue — same visuals running 6+ months with no testing'},{i:'🚨',t:'Landing pages converting under 1% with no CRO strategy'},{i:'🎯',t:'Audience targeting too broad — spending on cold, unqualified traffic'}],svcs:['Google Search Ads','Meta Ads','Landing Page CRO','GA4 & Attribution','Creative Strategy','Audience Research'],tl:[{p:'Month 1',a:'Full audit, pixel setup, GA4 config, audience research & creative brief'},{p:'Month 2',a:'New landing pages live, A/B tests launched, campaigns rebuilt'},{p:'Month 3',a:'Scale winning ad sets, retargeting activated, CPL drops 60%'},{p:'Month 4',a:'10x ROAS achieved; full dashboard delivered to client team'}],q:'"Ereynard completely transformed our digital presence. In just 4 months, organic traffic tripled and ad campaigns started printing money. Not just an agency — a growth partner."',qby:'— Rahul Mehta, Founder, NovaBrand India'},
  luxethreads:{img:'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1400&auto=format&fit=crop&q=80',tag:'Social Media Marketing',ttl:'LuxeThreads — Brand Explosion',sub:'Instagram · Reels · Influencer · Content Strategy · 6 Months',kpis:[{n:'340%',l:'Sales Increase'},{n:'80K+',l:'New Followers'},{n:'18M',l:'Reel Reach'},{n:'12x',l:'Influencer ROAS'}],ov:'LuxeThreads, premium Indian ethnic wear, had 4,200 followers and flat sales. We built a full social identity, reels-first strategy, and influencer program that turned them into one of the most talked-about ethnic wear brands on Indian Instagram in 6 months.',chals:[{i:'😴',t:'No consistent visual identity — feed looked unprofessional'},{i:'📉',t:'Content getting under 50 likes per post — zero viral potential'},{i:'🙈',t:'Zero influencer strategy — random collabs with no ROI tracking'},{i:'💡',t:'Brand story not being told — no emotional connection with audience'}],svcs:['Instagram Management','Reels Production','Influencer Campaign','Content Calendar','Brand Storytelling','Community Management'],tl:[{p:'Month 1-2',a:'Brand voice, visual identity refresh, content templates & calendar'},{p:'Month 3',a:'8 micro-influencers launched, reels strategy activated'},{p:'Month 4',a:'Viral reel 2.3M views; follower growth 5,000/week'},{p:'Month 5-6',a:'3 macro-influencer campaigns, sales up 340%, featured in Vogue India'}],q:'"Sharp, creative and deeply strategic. Understood our brand voice from day one and created campaigns that resonated perfectly. Sales went up 340%."',qby:'— Sneha Kapoor, CMO, LuxeThreads'},
  technest:{img:'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1400&auto=format&fit=crop&q=80',tag:'SEO + Content Strategy',ttl:'TechNest — Organic Domination',sub:'Technical SEO · Blog Strategy · Link Building · 6 Months',kpis:[{n:'225x',l:'Blog Traffic Growth'},{n:'#1',l:'Rankings Achieved'},{n:'45K+',l:'Monthly Visitors'},{n:'280%',l:'Lead Increase'}],ov:'TechNest started at 200 monthly visitors, invisible on Google. We executed a comprehensive SEO and content programme — fixing their technical foundation, building topical authority, earning quality backlinks — growing them to 45,000+ monthly organic visitors with #1 rankings in 6 months.',chals:[{i:'🐢',t:'Critical technical issues — slow load times, broken links, no schema markup'},{i:'🔍',t:'Zero keyword strategy — targeting generic terms with no buying intent'},{i:'📝',t:'Blog had 12 posts, none ranking, all targeting wrong audience'},{i:'🔗',t:'Domain authority of 8 with virtually no backlinks'}],svcs:['Technical SEO Audit','Blog Content Strategy','Link Building','On-Page Optimisation','Topical Authority Mapping','Monthly Reporting'],tl:[{p:'Month 1',a:'Full technical audit, 87 issues fixed, GA4 and GSC configured'},{p:'Month 2',a:'Topical cluster strategy built, 20-article editorial calendar launched'},{p:'Month 3-4',a:'Articles hit page 1; link building yields 35 quality backlinks'},{p:'Month 5-6',a:'Core keywords reach #1; 45K+/month traffic; 280% more inbound leads'}],q:'"Working with Ereynard felt like having a world-class team in-house. Their Fox Method is real — every step deliberate, data-backed, and exceeded every expectation."',qby:'— Aryan Desai, CEO, TechNest Solutions'},
  growfast:{img:'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1400&auto=format&fit=crop&q=80',tag:'Performance Advertising',ttl:'GrowFast — 60% Lead Cost Cut',sub:'Google Ads · Meta Ads · CRO · Analytics · 3 Months',kpis:[{n:'-60%',l:'Cost Per Lead'},{n:'4.2x',l:'ROAS'},{n:'₹18L',l:'Budget Saved'},{n:'3mo',l:'Timeline'}],ov:"GrowFast, a B2B SaaS company, was spending heavily on digital ads with sky-high cost per lead. Campaigns lacked structure, creative refresh, and conversion tracking. We audited, rebuilt, and optimised — cutting CPL by 60% within 90 days.",chals:[{i:'💰',t:'CPL of ₹4,200 — far above industry benchmark of ₹800'},{i:'🎨',t:'No creative testing — same ads running for 8 months'},{i:'📊',t:'Broken conversion tracking — could not attribute leads'},{i:'🎯',t:'No audience segmentation — one campaign targeting everyone'}],svcs:['Google Search Ads','Meta Lead Gen','Conversion Rate Optimisation','Creative Strategy','Attribution Setup','Weekly Reporting'],tl:[{p:'Week 1-2',a:'Full audit, tracking rebuild, audience research and new creative briefs'},{p:'Week 3-6',a:'New campaigns live, 12 ad variants tested, landing pages optimised'},{p:'Week 7-12',a:'CPL drops 60%, best performers scaled, reporting dashboard live'}],q:'"Most agencies overpromise. Ereynard overdelivers. Our cost per lead dropped 60% within the first campaign. Always available, reporting crystal clear."',qby:'— Priya Nair, Head of Marketing, GrowFast'},
  eduspark:{img:'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1400&auto=format&fit=crop&q=80',tag:'Content + SEO',ttl:'EduSpark — 225x Blog Growth',sub:'Content Strategy · SEO · Blog · 6 Months',kpis:[{n:'225x',l:'Traffic Growth'},{n:'45K+',l:'Monthly Readers'},{n:'380%',l:'Enrollment Lift'},{n:'6mo',l:'To Results'}],ov:"EduSpark Academy's blog had 200 monthly visitors and zero domain authority. We built a topical authority strategy, rewrote all existing content, launched a 24-article editorial calendar, and built quality backlinks — propelling them to 45,000+ monthly readers in 6 months.",chals:[{i:'📝',t:'12 blog posts, none ranking, all written without keyword strategy'},{i:'🔗',t:'Domain Authority of 7 — invisible to Google'},{i:'🏃',t:'Competing with ed-tech giants with massive budgets'},{i:'📉',t:'Zero enrollment from organic — 100% dependent on paid ads'}],svcs:['Topical Authority Mapping','Content Creation','On-Page SEO','Link Building','Technical SEO','Content Calendar Management'],tl:[{p:'Month 1',a:'Content audit, keyword research, topical cluster strategy and editorial calendar'},{p:'Month 2-3',a:'20 new articles published, existing content rewritten and optimised'},{p:'Month 4-6',a:'Link building campaign yields 28 quality backlinks; 3 articles hit #1 on Google'}],q:'"Their content strategy alone was worth every penny. Blog went from 200 to 45,000+ monthly visitors in 6 months. Phenomenal SEO and content work."',qby:'— Vikram Shah, Director, EduSpark Academy'}
};

const FAQS_DATA = [
  {q:"What makes Ereynard different from other digital agencies?",a:"We're inspired by Baskin-Robbins' '31 Flavors' — every brand deserves a <strong>custom strategy</strong>, not a template. Pocket-friendly pricing with premium quality, always focusing on measurable results like revenue, leads, and real ROI."},
  {q:"How long does it take to see results?",a:"<strong>Paid Ads</strong> can show results within days. <strong>SEO</strong> typically takes 3–6 months for significant organic growth. <strong>Social Media</strong> gains momentum within 60–90 days. We set realistic timelines in your custom strategy."},
  {q:"What is your pricing model?",a:"We offer <strong>pocket-friendly, custom-priced packages</strong> — no one-size-fits-all. Pricing depends on your goals, services required, and scale of campaigns. Fill the enquiry form and we'll send you a free, detailed proposal."},
  {q:"Do you work with small businesses and startups?",a:"Absolutely — we love helping ambitious startups grow from scratch. We've built entire brands from zero. Our pricing is accessible at every stage of business growth."},
  {q:"Which platforms do you manage for social media?",a:"We manage <strong>Instagram, Facebook, LinkedIn, YouTube, and Twitter/X</strong>. Based on your target audience, we recommend the optimal mix — handling content creation, scheduling, community management, and influencer partnerships."},
  {q:"Will I get regular performance reports?",a:"Yes — complete transparency is core to who we are. You receive <strong>monthly performance reports</strong> with clear metrics, insights, and next steps. We also set up real-time Looker Studio dashboards so you can check performance 24/7."},
  {q:"Can you handle multiple services simultaneously?",a:"Yes — that's where we shine. Our <strong>Fox Method</strong> integrates SEO, Social Media, Paid Ads, Content, and Branding into one cohesive strategy. Cross-channel synergy amplifies results significantly."},
  {q:"How do we get started?",a:"Fill the <strong>Enquire Now</strong> form or WhatsApp us directly. We'll schedule a free discovery call and within 48 hours you'll receive a custom strategy proposal. No commitment required."},
];

const BLOG_POSTS = [
  {id:'google-invisible',cat:'SEO',title:"Why Your Brand is Invisible on Google — And How to Fix It in 90 Days",date:'March 10, 2025',read:'8 min read',img:'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=900&auto=format&fit=crop&q=80',excerpt:"If you're not on page 1, you don't exist. Here's the exact framework we use to take brands from zero to #1 rankings.",lead:"Here's the uncomfortable truth: 91.5% of search traffic goes to page 1 results. If you're on page 2, you may as well not exist online.",content:[{h2:"The Three Root Causes of Google Invisibility"},{p:"Most brands suffering from poor Google rankings share three core problems: technical barriers that prevent Google from even crawling the site properly, zero keyword strategy, and a complete absence of link authority."},{h3:"1. Technical SEO Failures"},{p:"Before Google can rank you, it needs to understand you. That means fast load times (under 3 seconds), proper mobile experience, no broken links, correct canonical tags, and structured data markup."},{blockquote:"In our experience, fixing technical issues alone can bump a site from page 4 to page 2 within weeks — without creating a single new piece of content."},{h3:"2. The Wrong Keywords"},{p:"We see this constantly: brands targeting generic terms like 'digital marketing agency' instead of intent-driven terms like 'digital marketing agency for D2C brands in India'. The long-tail is where buyers live."},{h3:"3. Zero Domain Authority"},{p:"Google uses backlinks as votes of confidence. Building real, white-hat backlinks from relevant industry sites is a 3–6 month investment that pays for years."},{h2:"The 90-Day Fix Framework"},{p:"<strong>Month 1:</strong> Full technical audit + fix. Keyword research and topical cluster mapping. Set up GA4 and Google Search Console properly."},{p:"<strong>Month 2:</strong> Launch the content calendar. Publish 6–8 high-quality SEO articles targeting buyer-intent keywords. Begin outreach for 8–10 quality backlinks."},{p:"<strong>Month 3:</strong> Analyse what's ranking. Double down on winning topics. Continue link building. Refine on-page elements based on click-through rate data."},{h2:"The One Thing That Changes Everything"},{p:"Consistency. SEO is a compound investment. The brands that dominate Google built systematic, month-over-month content and authority. The best time to start was 6 months ago. The second-best time is today."}]},
  {id:'reels-formula',cat:'Social Media',title:"The Reels Formula That Got Our Client 2.3M Views Overnight",date:'Feb 28, 2025',read:'6 min read',img:'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=900&auto=format&fit=crop&q=80',excerpt:"The hook, structure, and strategy behind a viral reel — deconstructed for Indian D2C brands.",lead:"In February 2024, a LuxeThreads reel about 'Why Indian women are choosing ethnic over western for office wear' hit 2.3 million views in 48 hours.",content:[{h2:"The Anatomy of a Viral Reel"},{p:"Viral content isn't luck. It's architecture. Every reel that breaks through shares four components: a disruptive hook (first 2 seconds), a relatable conflict, a satisfying resolution, and a CTA that doesn't feel like a CTA."},{h3:"The Hook Formula"},{p:"<strong>Controversy Hook:</strong> 'Why I stopped wearing western to the office' — creates immediate curiosity and mild controversy."},{p:"<strong>Relatability Hook:</strong> 'POV: You spent 45 mins getting ready but still feel underdressed' — makes the viewer feel seen."},{blockquote:"The LuxeThreads reel opened with: 'Indian offices are finally getting it.' That's controversy + relatability in 6 words."},{h2:"Why Most Brand Reels Fail"},{p:"Brand reels fail because they open with the logo, focus on the product instead of the story, use promotional language instead of authentic voice, and ignore the algorithm's need for watch-time and replays."},{p:"The algorithm doesn't promote your product. It promotes content that gets rewatched, commented on, and shared."},{h2:"The 5-Reel Weekly System"},{p:"For LuxeThreads, we built a weekly system: 2 educational (styling tips), 1 trend commentary, 1 behind-the-scenes, 1 UGC repost. This mix ensures consistency while not over-relying on any one content type."}]},
  {id:'google-ads-mistakes',cat:'Performance Ads',title:"Why Your Google Ads Are Burning Money — 7 Mistakes We Fixed",date:'Feb 15, 2025',read:'10 min read',img:'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&auto=format&fit=crop&q=80',excerpt:"Most Indian SMBs are throwing ₹50,000/month into Google Ads with no return. Here's exactly why.",lead:"In 2024 alone, we audited 34 Google Ads accounts across India. The average wasted spend was 67%. Here are the 7 mistakes we see most often.",content:[{h2:"Mistake 1: Broad Match Keywords Without Negative Keywords"},{p:"Running broad match keywords without an extensive negative keyword list is like leaving your tap running. We've seen accounts paying ₹150/click for searches that will never convert."},{blockquote:"If you don't know which keyword, ad, or audience is generating your leads, you're flying blind."},{h2:"Mistake 2: No Conversion Tracking"},{p:"41% of the accounts we audit have either broken conversion tracking or no tracking at all. They're optimising for clicks — a vanity metric — instead of leads or sales."},{h2:"Mistake 3: Sending Traffic to the Homepage"},{p:"The homepage is a starting point, not a landing page. Sending ad traffic to your homepage versus a purpose-built landing page typically doubles (or more) your cost per lead."},{h2:"Mistake 4: No Remarketing"},{p:"Only 2–3% of visitors convert on the first visit. A well-structured remarketing campaign typically delivers 3–5x better ROAS than prospecting campaigns."}]},
  {id:'brand-identity',cat:'Branding',title:"Building a Brand Identity That Outlasts Your Competitors",date:'Jan 30, 2025',read:'7 min read',img:'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=900&auto=format&fit=crop&q=80',excerpt:"Brand isn't your logo. It's every touchpoint your customer experiences. Here's the framework we use.",lead:"We've built 50+ brand identities. The ones that outlast their competitors share one thing: strategic clarity before creative execution.",content:[{h2:"Why Most Brand Identities Fail"},{p:"Most brand identities fail not because they look bad, but because they were built backwards. Founders choose a colour they like, hire a designer for a logo, and call it 'branding.' The result is a visual skin with no soul underneath."},{blockquote:"Strategy without creative is invisible. Creative without strategy is decoration."},{h2:"The Six Brand Identity Deliverables"},{p:"A complete brand identity system includes: Logo (primary, secondary, icon, favicon), Colour palette, Typography system, Iconography and illustration style, Photography and visual direction, and Brand voice and tone guidelines."},{h2:"The Competitive Moat"},{p:"A strong brand identity is one of the hardest things a competitor can copy. They can match your price. They can replicate your product. They cannot copy your brand's relationship with its audience."}]},
  {id:'31-content-ideas',cat:'Content Strategy',title:"31 Content Ideas for Indian D2C Brands That Actually Convert",date:'Jan 18, 2025',read:'12 min read',img:'https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=900&auto=format&fit=crop&q=80',excerpt:"Content doesn't have to be boring. Here are 31 frameworks to turn your content into a lead and sales engine.",lead:"We manage content for 40+ Indian brands. These are the formats that consistently outperform everything else across Instagram, LinkedIn, and YouTube.",content:[{h2:"The Content Pyramid"},{p:"Before the 31 ideas, understand the pyramid: 70% educational/entertainment (top of funnel), 20% trust-building case studies/testimonials (middle), 10% direct offer content (bottom). Most brands invert this."},{h3:"Awareness Content (10 Ideas)"},{p:"1. Industry myth-busting  2. Trend commentary  3. Behind-the-scenes  4. Founder origin story  5. Day in the life  6. Industry data made visual  7. Before/after transformation  8. 'What nobody tells you'  9. Comparison: old way vs your way  10. Cultural relevance content"},{h3:"Conversion Content (10 Ideas)"},{p:"11. Limited-time offer  12. Social proof reel  13. Objection handling  14. Risk-reversal content  15. 'We just restocked'  16. Bundle/value content  17. Urgency content  18. Direct CTA post (keep rare)  19. Partnership announcement  20. Milestone celebration"},{h2:"The Distribution Rule"},{p:"Great content with poor distribution is a tree falling in an empty forest. For every piece you create, spend equal time on distribution: cross-posting, reposting, repurposing, and amplifying through paid spend on the top 20% of organic performers."}]},
  {id:'email-open-rates',cat:'Email Marketing',title:"How We Achieved 42% Email Open Rates for Our Clients in 2024",date:'Jan 5, 2025',read:'9 min read',img:'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=900&auto=format&fit=crop&q=80',excerpt:"The average email open rate in India is under 20%. We consistently hit 42%+. Here's the full playbook.",lead:"Email is still the highest-ROI digital channel when done right. The key word is 'right.' Most brands are doing it profoundly wrong.",content:[{h2:"The Subject Line Architecture"},{p:"Your subject line is 80% of your open rate. We use three formats that consistently outperform: Curiosity Gap, Personalisation + Specificity, and Direct and Honest."},{blockquote:"Never trick subscribers into opening with a misleading subject line. Your open rates spike once and your trust erodes permanently."},{h2:"List Segmentation: The Game Changer"},{p:"Sending the same email to your entire list is the single biggest email mistake most brands make. We segment by: purchase history, engagement level, geographic location, product category interest, and customer lifecycle stage."},{h2:"The Deliverability Foundation"},{p:"All the great subject lines in the world won't help if your emails land in spam. Warm your domain properly, authenticate with DKIM/SPF/DMARC, maintain a healthy bounce rate below 2%, and never buy email lists."}]}
];

const TEAM = [
  {name:'Krish Narwani',role:'Founder & CEO',img:'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',links:[{l:'in',url:'https://linkedin.com'},{l:'tw',url:'https://twitter.com'}]},
  {name:'Priya Sharma',role:'Head of Strategy',img:'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&auto=format&fit=crop&q=80',links:[{l:'in',url:'https://linkedin.com'},{l:'ig',url:'https://instagram.com'}]},
  {name:'Aryan Mehta',role:'Creative Director',img:'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80',links:[{l:'be',url:'https://behance.net'},{l:'ig',url:'https://instagram.com'}]},
  {name:'Sneha Kapoor',role:'Performance Lead',img:'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&auto=format&fit=crop&q=80',links:[{l:'in',url:'https://linkedin.com'},{l:'tw',url:'https://twitter.com'}]},
  {name:'Rohit Verma',role:'SEO Strategist',img:'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',links:[{l:'in',url:'https://linkedin.com'}]},
  {name:'Meera Joshi',role:'Content Director',img:'https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?w=400&auto=format&fit=crop&q=80',links:[{l:'in',url:'https://linkedin.com'},{l:'ig',url:'https://instagram.com'}]},
  {name:'Aarav Shah',role:'Paid Media Lead',img:'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&auto=format&fit=crop&q=80',links:[{l:'in',url:'https://linkedin.com'}]},
  {name:'Nisha Patel',role:'Brand Strategist',img:'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&auto=format&fit=crop&q=80',links:[{l:'in',url:'https://linkedin.com'},{l:'ig',url:'https://instagram.com'}]},
];

const CLIENT_TESTIMONIALS = [
  {quote:'"Ereynard completely transformed our digital presence. In just 4 months, organic traffic tripled and ad campaigns started printing money. Not just an agency — a growth partner."',name:'Rahul Mehta',role:'Founder, NovaBrand India',metric:'10x',metricLabel:'ROI',img:'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&auto=format&fit=crop&q=80'},
  {quote:'"Sharp, creative and deeply strategic. Understood our brand voice from day one and created campaigns that resonated perfectly. Sales went up 340%."',name:'Sneha Kapoor',role:'CMO, LuxeThreads',metric:'340%',metricLabel:'Sales Growth',img:'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&auto=format&fit=crop&q=80'},
  {quote:'"Working with Ereynard felt like having a world-class team in-house. Their Fox Method is real — every step deliberate, data-backed, and exceeded expectations."',name:'Aryan Desai',role:'CEO, TechNest Solutions',metric:'225x',metricLabel:'Traffic Growth',img:'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&auto=format&fit=crop&q=80'},
  {quote:'"Most agencies overpromise. Ereynard overdelivers. Our cost per lead dropped 60% within the first campaign. Reporting is crystal clear and the team is always available."',name:'Priya Nair',role:'Head of Marketing, GrowFast',metric:'-60%',metricLabel:'Cost Per Lead',img:'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=80&h=80&auto=format&fit=crop&q=80'},
  {quote:'"Their content strategy alone was worth every penny. Blog went from 200 to 45,000+ monthly visitors in 6 months. Phenomenal SEO work."',name:'Vikram Shah',role:'Director, EduSpark Academy',metric:'45K+',metricLabel:'Monthly Visitors',img:'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&auto=format&fit=crop&q=80'},
  {quote:'"Built our brand from scratch — identity, website, social, campaigns. Everything cohesive, everything works. We\'ve become the go-to name in our niche."',name:'Meera Joshi',role:'Co-Founder, WellnessHive',metric:'98%',metricLabel:'Client Retention',img:'https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?w=80&h=80&auto=format&fit=crop&q=80'},
];

// ═══════════════════════════════════════════════════════════
// HOOKS
// ═══════════════════════════════════════════════════════════
function useReveal() {
  useEffect(() => {
    const ro = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        e.target.classList.add('v');
        ['scard','rcard','pstep-s','pstep-f','s-item','wi','tm-card','bs-scoop','blog-card','svc-mini-card','award-card','svc-detail-row'].forEach(cls => {
          e.target.querySelectorAll('.' + cls).forEach((c, i) => {
            c.style.opacity = '0';
            c.style.transform = 'translateY(26px)';
            c.style.transition = `opacity .6s ${i * .07}s ease,transform .6s ${i * .07}s ease`;
            setTimeout(() => { c.style.opacity = '1'; c.style.transform = 'none'; }, 40);
          });
        });
      });
    }, { threshold: .06 });
    document.querySelectorAll('.reveal,.rev-l,.rev-r,.rev-scale').forEach(el => ro.observe(el));
    return () => ro.disconnect();
  });
}

function useScrollNav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);
  return scrolled;
}

function useTilt() {
  useEffect(() => {
    const cards = document.querySelectorAll('.scard,.bs-scoop');
    const hs = [];
    cards.forEach(c => {
      const mm = e => { const r = c.getBoundingClientRect(); const x = (e.clientX - r.left) / r.width - .5; const y = (e.clientY - r.top) / r.height - .5; c.style.transform = `perspective(560px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg) translateZ(4px) translateY(-6px)`; };
      const ml = () => c.style.transform = '';
      c.addEventListener('mousemove', mm);
      c.addEventListener('mouseleave', ml);
      hs.push({ c, mm, ml });
    });
    return () => hs.forEach(({ c, mm, ml }) => { c.removeEventListener('mousemove', mm); c.removeEventListener('mouseleave', ml); });
  });
}

function useRipple() {
  useEffect(() => {
    const btns = document.querySelectorAll('.btn-p,.btn-sub,.nav-cta');
    const hs = [];
    btns.forEach(btn => {
      const fn = e => {
        const r = btn.getBoundingClientRect();
        const rp = document.createElement('span');
        rp.className = 'ripple';
        const sz = Math.max(r.width, r.height) * 2;
        rp.style.cssText = `width:${sz}px;height:${sz}px;left:${e.clientX - r.left - sz / 2}px;top:${e.clientY - r.top - sz / 2}px`;
        btn.appendChild(rp);
        setTimeout(() => rp.remove(), 620);
      };
      btn.addEventListener('click', fn);
      hs.push({ btn, fn });
    });
    return () => hs.forEach(({ btn, fn }) => btn.removeEventListener('click', fn));
  });
}

// ═══════════════════════════════════════════════════════════
// CURSOR
// ═══════════════════════════════════════════════════════════
function Cursor() {
  useEffect(() => {
    const cur = document.getElementById('cur'), curR = document.getElementById('cur-r');
    let mx = 0, my = 0, rx = 0, ry = 0;
    const mm = e => { mx = e.clientX; my = e.clientY; cur.style.left = mx + 'px'; cur.style.top = my + 'px'; };
    document.addEventListener('mousemove', mm);
    const tpos = [], tEls = [];
    for (let i = 0; i < 10; i++) {
      const t = document.createElement('div'); t.className = 'ctr';
      const sz = Math.max(2, 5.5 - i * .45);
      t.style.cssText = `width:${sz}px;height:${sz}px;background:rgba(240,200,69,${(1 - i / 10) * .18})`;
      document.body.appendChild(t); tEls.push({ el: t, x: 0, y: 0 });
    }
    const tm = e => { tpos.push({ x: e.clientX, y: e.clientY }); if (tpos.length > 24) tpos.shift(); };
    document.addEventListener('mousemove', tm);
    let raf;
    const rl = () => { rx += (mx - rx) * .1; ry += (my - ry) * .1; curR.style.left = rx + 'px'; curR.style.top = ry + 'px'; raf = requestAnimationFrame(rl); };
    rl();
    const tl = () => { tEls.forEach((t, i) => { const idx = Math.max(0, tpos.length - 1 - Math.floor(i * 2.3)); if (tpos[idx]) { t.x += (tpos[idx].x - t.x) * .26; t.y += (tpos[idx].y - t.y) * .26; t.el.style.left = t.x + 'px'; t.el.style.top = t.y + 'px'; } }); requestAnimationFrame(tl); };
    tl();
    const hov = () => document.body.classList.add('hov');
    const unhov = () => document.body.classList.remove('hov');
    document.querySelectorAll('a,button,.scard,.rcard,.wi,.tm-card,.ib-item,.bs-scoop,.pill,.clogo,.blog-card,.svc-mini-card,.svc-detail-row').forEach(el => { el.addEventListener('mouseenter', hov); el.addEventListener('mouseleave', unhov); });
    return () => { document.removeEventListener('mousemove', mm); document.removeEventListener('mousemove', tm); cancelAnimationFrame(raf); tEls.forEach(t => t.el.remove()); };
  }, []);
  return <><div id="cur" /><div id="cur-r" /></>;
}

// ═══════════════════════════════════════════════════════════
// LOADER
// ═══════════════════════════════════════════════════════════
function Loader({ onDone }) {
  const [hide, setHide] = useState(false);
  useEffect(() => { const t = setTimeout(() => { setHide(true); setTimeout(onDone, 640); }, 2400); return () => clearTimeout(t); }, [onDone]);
  return (
    <div id="loader" className={hide ? 'hide' : ''}>
      <div className="ld-fox">🦊</div>
      <div className="ld-brand">{'EREYNARD.'.split('').map((c, i) => <span key={i} className={`ld-c ${i % 2 === 0 ? 'y' : 'o'}`} style={{ animationDelay: `${i * .065 + .1}s` }}>{c}</span>)}</div>
      <div className="ld-tagline">Smart like a fox. Sharp in digital.</div>
      <div className="ld-bar-wrap"><div className="ld-bar" /></div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// PAGE TRANSITION
// ═══════════════════════════════════════════════════════════
function PageTransition({ state }) {
  if (!state) return null;
  return <div className={`pt-overlay ${state}`}><div className="pt-panel" /><div className="pt-panel" /><div className="pt-panel" /></div>;
}

// ═══════════════════════════════════════════════════════════
// HEADER
// ═══════════════════════════════════════════════════════════
function Header({ page, nav, openContact }) {
  const scrolled = useScrollNav();
  const [mob, setMob] = useState(false);
  const pages = [{ k: 'home', l: 'Home' }, { k: 'about', l: 'About' }, { k: 'services', l: 'Services' }, { k: 'projects', l: 'Work' }, { k: 'process', l: 'Process' }, { k: 'team', l: 'Team' }, { k: 'clients', l: 'Clients' }, { k: 'blog', l: 'Blog' }];
  return (
    <>
      <nav className={scrolled ? 'sc' : ''}>
        <button className="nav-logo" onClick={() => nav('home')}><span>🦊</span>ereynard<span style={{ opacity: .3 }}>.</span></button>
        <ul className="nav-links">
          {pages.map(p => <li key={p.k}><button className={page === p.k ? 'active' : ''} onClick={() => nav(p.k)}>{p.l}</button></li>)}
        </ul>
        <button className="nav-cta" onClick={openContact}><span>Enquire Now →</span></button>
        <button className={`hburg ${mob ? 'open' : ''}`} onClick={() => setMob(v => !v)}><i /><i /><i /></button>
      </nav>
      <div className={`mob-menu ${mob ? 'open' : ''}`}>
        {pages.map(p => <button key={p.k} onClick={() => { nav(p.k); setMob(false); }}>{p.l}</button>)}
        <button onClick={() => { openContact(); setMob(false); }}>Contact</button>
      </div>
    </>
  );
}

// ═══════════════════════════════════════════════════════════
// MARQUEE
// ═══════════════════════════════════════════════════════════
function Marquee() {
  const items = ['SEO', 'Social Media', 'Performance Ads', 'Branding', 'Content Strategy', 'Web Design', 'Email Marketing', 'Analytics', 'Influencer Marketing', 'Video Production'];
  return (
    <div className="mq">
      <div className="mq-t">
        {[...items, ...items].map((item, i) => <div key={i} className="mq-item"><span>{item}</span><span className="mq-dot" /></div>)}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// HERO CANVAS (particle network)
// ═══════════════════════════════════════════════════════════
function HeroCanvas() {
  const ref = useRef(null);
  useEffect(() => {
    const cv = ref.current; if (!cv) return;
    const ctx = cv.getContext('2d'); let cW, cH, raf;
    const rsz = () => { cW = cv.width = cv.offsetWidth; cH = cv.height = cv.offsetHeight; };
    rsz(); window.addEventListener('resize', rsz);
    class Pt { constructor() { this.reset(); } reset() { this.x = Math.random() * cW; this.y = Math.random() * cH; this.vx = (Math.random() - .5) * .38; this.vy = (Math.random() - .5) * .38; this.sz = Math.random() * 1.8 + .3; this.a = Math.random() * .4 + .1; this.col = Math.random() > .65 ? '#f0c845' : 'rgba(240,200,69,.45)'; } update() { this.x += this.vx; this.y += this.vy; if (this.x < 0 || this.x > cW || this.y < 0 || this.y > cH) this.reset(); } draw() { ctx.save(); ctx.globalAlpha = this.a; ctx.fillStyle = this.col; ctx.beginPath(); ctx.arc(this.x, this.y, this.sz, 0, Math.PI * 2); ctx.fill(); ctx.restore(); } }
    const pts = []; for (let i = 0; i < 100; i++) pts.push(new Pt());
    const lines = () => { for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) { const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y, d = Math.sqrt(dx * dx + dy * dy); if (d < 105) { ctx.save(); ctx.globalAlpha = (1 - d / 105) * .06; ctx.strokeStyle = '#f0c845'; ctx.lineWidth = .35; ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y); ctx.stroke(); ctx.restore(); } } };
    const loop = () => { ctx.clearRect(0, 0, cW, cH); pts.forEach(p => { p.update(); p.draw(); }); lines(); raf = requestAnimationFrame(loop); };
    loop();
    return () => { window.removeEventListener('resize', rsz); cancelAnimationFrame(raf); };
  }, []);
  return <canvas ref={ref} className="hero-canvas" />;
}

// ═══════════════════════════════════════════════════════════
// HERO SLIDER
// ═══════════════════════════════════════════════════════════
const HERO_SLIDES = [
  {
    bg: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&auto=format&fit=crop&q=80',
    kicker: 'India\'s Sharpest Digital Agency',
    headline: <><span>Outfox</span><br /><span className="stroke-txt">Your</span><br /><span>Competition</span></>,
    sub: 'Data-driven strategies that turn brands into category leaders. Smart, sharp, results-obsessed.',
  },
  {
    bg: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1920&auto=format&fit=crop&q=80',
    kicker: '200+ Brands Scaled Across India',
    headline: <><span>Growth</span><br /><span className="stroke-txt">That</span><br /><span><span className="accent">Compounds.</span></span></>,
    sub: 'Every campaign engineered for real ROI — not vanity metrics. Your brand deserves better than vanilla.',
  },
  {
    bg: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1920&auto=format&fit=crop&q=80',
    kicker: '7+ Years · ₹50Cr+ Ad Spend Managed',
    headline: <><span>Results</span><br /><span className="stroke-txt">Not</span><br /><span>Excuses.</span></>,
    sub: '10x ROI. 340% sales. 225x traffic. Real numbers from real clients who trusted us to deliver.',
  },
];

function Hero({ nav, openContact }) {
  const [slide, setSlide] = useState(0);
  const [key, setKey] = useState(0);
  const timerRef = useRef(null);

  const goTo = useCallback((idx) => {
    setSlide(idx);
    setKey(k => k + 1);
  }, []);

  useEffect(() => {
    timerRef.current = setInterval(() => goTo(s => (s + 1) % HERO_SLIDES.length), 6000);
    return () => clearInterval(timerRef.current);
  }, [goTo]);

  const handleArrow = (dir) => {
    clearInterval(timerRef.current);
    goTo((slide + dir + HERO_SLIDES.length) % HERO_SLIDES.length);
    timerRef.current = setInterval(() => goTo(s => (s + 1) % HERO_SLIDES.length), 6000);
  };

  const s = HERO_SLIDES[slide];

  return (
    <div className="hero-wrap">
      {HERO_SLIDES.map((sl, i) => (
        <div key={i} className={`hero-slide ${i === slide ? 'active' : ''}`}>
          <img className="hs-bg" src={sl.bg} alt="" />
          <div className="hs-ov" />
        </div>
      ))}
      <HeroCanvas />
      <div className="h-grid" />
      {/* Deco SVGs */}
      <svg className="h-deco h-deco1" width="96" height="96" viewBox="0 0 96 96"><rect x="2" y="2" width="92" height="92" stroke="#f0c845" strokeWidth="1" strokeDasharray="4 5" fill="none" opacity=".8" /><rect x="15" y="15" width="66" height="66" stroke="#f0c845" strokeWidth=".5" fill="none" opacity=".4" /></svg>
      <svg className="h-deco h-deco2" width="62" height="62" viewBox="0 0 62 62"><circle cx="31" cy="31" r="29" stroke="#f0c845" strokeWidth="1" strokeDasharray="3 4" fill="none" opacity=".7" /><circle cx="31" cy="31" r="15" stroke="#f0c845" strokeWidth=".5" fill="none" opacity=".35" /></svg>
      <svg className="h-deco h-deco3" width="48" height="48" viewBox="0 0 48 48"><polygon points="24,2 46,46 2,46" stroke="#f0c845" strokeWidth="1" fill="none" opacity=".55" /></svg>

      <div className="hero-content-wrap">
        <div className="hero-content">
          <p className="hero-eyebrow"><span>{s.kicker}</span></p>
          <div key={key}>
            <div className="slide-line hero-kicker" style={{ animationDelay: '.1s' }} />
            <h1 className="hero-headline slide-line" style={{ animationDelay: '.2s' }}>{s.headline}</h1>
            <p className="hero-sub slide-line" style={{ animationDelay: '.4s' }}>{s.sub}</p>
          </div>
          <div className="hero-actions">
            <button className="btn-p" onClick={openContact}><span>Start a Project</span><span>→</span></button>
            <button className="btn-g" onClick={() => nav('projects')}>View Our Work ↓</button>
          </div>
          <div className="hero-stats-row">
            {[['200+', 'Brands Scaled'], ['₹50Cr+', 'Ad Spend Managed'], ['98%', 'Client Retention'], ['7+', 'Years of Excellence']].map(([n, l], i) => (
              <div key={i} className="hs-stat"><div className="hs-stat-n">{n}</div><div className="hs-stat-l">{l}</div></div>
            ))}
          </div>
        </div>
      </div>

      <div className="slider-nav">
        {HERO_SLIDES.map((_, i) => <button key={i} className={`sn-dot ${i === slide ? 'active' : ''}`} onClick={() => handleArrow(i - slide)} />)}
      </div>
      <div className="slider-arrows">
        <button className="sl-arr" onClick={() => handleArrow(-1)}>←</button>
        <button className="sl-arr" onClick={() => handleArrow(1)}>→</button>
      </div>
      <div className="hero-scroll"><div className="h-scl" /><span>Scroll</span></div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// PAGE HERO BANNER (inner pages) — single clean headline
// ═══════════════════════════════════════════════════════════
function PageHero({ label, title, strokeWord, sub }) {
  // title = main line, strokeWord = the word in stroke style
  const titleParts = strokeWord ? title.split(strokeWord) : [title];
  return (
    <div className="page-hero">
      <div className="ph-orb ph-orb1" /><div className="ph-orb ph-orb2" />
      <div className="page-hero-content">
        <div className="page-hero-label">{label}</div>
        <div className="page-hero-title">
          {strokeWord ? (
            <>{titleParts[0]}<span className="stroke">{strokeWord}</span>{titleParts[1]}</>
          ) : (
            <span className="solid">{title}</span>
          )}
        </div>
        {sub && <p className="page-hero-sub">{sub}</p>}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// ABOUT SECTION
// ═══════════════════════════════════════════════════════════
function AboutSection({ nav, openSvc }) {
  useReveal();
  return (
    <div className="about-bg">
      <section className="sec on-yellow">
        <svg style={{ position: 'absolute', top: '5%', right: '3%', width: '140px', height: '140px', opacity: '.042', pointerEvents: 'none' }} viewBox="0 0 140 140"><circle cx="70" cy="70" r="64" stroke="#0e104b" strokeWidth="1" fill="none" /><circle cx="70" cy="70" r="40" stroke="#0e104b" strokeWidth=".5" fill="none" /><circle cx="70" cy="70" r="18" stroke="#0e104b" strokeWidth=".5" fill="none" /><line x1="6" y1="70" x2="134" y2="70" stroke="#0e104b" strokeWidth=".5" /><line x1="70" y1="6" x2="70" y2="134" stroke="#0e104b" strokeWidth=".5" /></svg>
        <div className="ab-grid">
          <div className="ab-vis rev-l">
            <div className="ab-img-a shimmer"><img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=700&auto=format&fit=crop&q=80" alt="Team" /></div>
            <div className="ab-stat-a"><div className="ab-stat-n">7+</div><div className="ab-stat-l">Years</div></div>
            <div className="ab-badge">🦊</div>
            <div className="ab-img-b shimmer"><img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=700&auto=format&fit=crop&q=80" alt="Analytics" /></div>
            <div className="ab-stat-b"><div className="ab-stat-n">200+</div><div className="ab-stat-l">Brands Scaled</div></div>
          </div>
          <div className="ab-txt rev-r">
            <div className="sec-label"><span>Who We Are</span></div>
            <h2 className="sec-title">We Hunt <span className="out">Results.</span></h2>
            <p style={{ marginTop: '16px' }}>At <strong>Ereynard</strong>, we don't just run campaigns — we engineer growth. Like a fox in the digital wild, we're cunning, precise, and always a few moves ahead.</p>
            <p>A full-service agency built on <strong>data-driven strategy</strong>, sharp creative thinking, and an obsession with your brand's success.</p>
            <p>Our team blends analytical minds with creative souls to craft campaigns that don't just look good — they <strong>perform exceptionally</strong>.</p>
            <div className="pills">
              {[['strategy', 'Strategy First'], ['analytics', 'Data-Driven'], ['branding', 'Creative Bold'], ['performance', 'Results Focused']].map(([k, l]) => <button key={k} className="pill" onClick={() => openSvc(k)}>{l}</button>)}
            </div>
            <div className="team-row">
              <div className="team-avs">{['1507003211169-0a1dd7228f2d', '1494790108755-2616b612b786', '1472099645785-5658abf4ff4e', '1527980965255-d3b416303d12'].map((id, i) => <div key={i} className="tav"><img src={`https://images.unsplash.com/photo-${id}?w=80&h=80&auto=format&fit=crop&q=80`} alt="" /></div>)}</div>
              <div className="team-cp"><strong>25+ Specialists</strong>Ready to grow your brand</div>
            </div>
            <div style={{ marginTop: '18px' }}><button className="btn-out" onClick={() => nav('team')}><span>Meet the Team</span><span>→</span></button></div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// BRAND STORY
// ═══════════════════════════════════════════════════════════
function BrandStory({ nav }) {
  useReveal();
  return (
    <div className="bs-bg">
      <section className="sec on-navy">
        <div className="bs-bg-txt">31 FLAVORS</div>
        <div className="reveal" style={{ position: 'relative', zIndex: 1, marginBottom: '48px' }}>
          <div className="sec-label"><span>Our Origin</span></div>
          <h2 className="sec-title">The Brand <span className="out">Story</span></h2>
        </div>
        <div className="bs-two reveal" style={{ position: 'relative', zIndex: 1 }}>
          <div className="bs-img-wrap rev-l">
            <img src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=700&auto=format&fit=crop&q=80" alt="Generic marketing" />
            <div className="bs-img-lbl">The Old Way</div>
          </div>
          <div className="rev-r">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '11px' }}><span style={{ width: '18px', height: '1.5px', background: 'rgba(240,200,69,.36)', display: 'inline-block' }} /><span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '.24em', textTransform: 'uppercase', color: 'rgba(240,200,69,.42)' }}>The Problem</span></div>
            <h3 style={{ fontFamily: 'var(--FM)', fontWeight: 800, fontSize: 'clamp(30px,3.8vw,50px)', color: 'var(--Y)', lineHeight: '1.05', marginBottom: '16px' }}>Settling for <span style={{ color: 'transparent', WebkitTextStroke: '1.5px rgba(240,200,69,.3)' }}>Vanilla</span></h3>
            <p style={{ fontSize: '14px', lineHeight: '1.8', color: 'rgba(240,200,69,.48)', marginBottom: '11px' }}>Too many businesses are served the same thing: <strong style={{ color: 'var(--Y)' }}>Vanilla Content.</strong> Endless posts, generic strategies, high invoices — but zero engagement, no new customers, stagnant sales.</p>
            <p style={{ fontSize: '14px', lineHeight: '1.8', color: 'rgba(240,200,69,.48)' }}>They're paying for <em style={{ fontFamily: 'var(--FI)', fontStyle: 'italic', color: 'rgba(240,200,69,.68)' }}>activity</em>, not for <strong style={{ color: 'var(--Y)' }}>results.</strong></p>
          </div>
        </div>
        <div className="bs-inspo reveal" style={{ position: 'relative', zIndex: 1 }}>
          <div className="bs-1945">1945</div>
          <div className="bs-inspo-inner">
            <div className="bs-inspo-icon">🍨</div>
            <div>
              <p style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '.28em', textTransform: 'uppercase', color: 'rgba(14,16,75,.38)', marginBottom: '8px' }}>The Inspiration</p>
              <div className="bs-inspo-title">The Joy of 31 Flavors</div>
              <p className="bs-inspo-text" style={{ marginBottom: '9px' }}>In 1945, Baskin & Robbins transformed ice cream by offering 31 Flavors — a different choice for every day of the month. They promised variety, quality, and the perfect fit for every craving.</p>
              <p className="bs-inspo-text"><strong style={{ color: 'var(--B)' }}>At Ereynard Digital, we believe your brand deserves that same commitment.</strong> We founded this agency to break the cycle of vanilla marketing and deliver strategies designed purely to grow your brand.</p>
            </div>
          </div>
        </div>
        <div className="reveal" style={{ marginBottom: '34px', position: 'relative', zIndex: 1 }}>
          <p style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '.28em', textTransform: 'uppercase', color: 'rgba(240,200,69,.4)', marginBottom: '8px' }}>Our Philosophy</p>
          <h3 style={{ fontFamily: 'var(--FM)', fontWeight: 800, fontSize: 'clamp(32px,4.5vw,62px)', color: 'var(--Y)', lineHeight: '1.05' }}>Three Scoops <span style={{ color: 'transparent', WebkitTextStroke: '1px rgba(240,200,69,.22)' }}>of Growth</span></h3>
        </div>
        <div className="bs-scoops reveal" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '2px', marginBottom: '64px', position: 'relative', zIndex: 1 }}>
          {[{ bg: '💰', icon: '💰', n: 'Scoop 01', t: 'Pocket-Friendly', sub: 'Partnership', d: 'Premium agency expertise without the inflated cost. Genuine ROI delivered.', a: 'Value & ROI →' }, { bg: '👑', icon: '👑', n: 'Scoop 02', t: 'Quality', sub: 'Obsession', d: "We don't do content volume — we do engagement quality that converts.", a: 'Trust & Depth →' }, { bg: '🎨', icon: '🎨', n: 'Scoop 03', t: 'Custom', sub: 'Strategy', d: 'Every brand is unique. We refuse templates. SEO + Social + Ads + Branding built for you.', a: 'Clarity & Results →' }].map((s, i) => (
            <div key={i} className="bs-scoop">
              <div className="bs-sc-bg">{s.bg}</div>
              <div className="bs-icon-w">{s.icon}</div>
              <div className="bs-sc-n">{s.n}</div>
              <h4 className="bs-sc-t">{s.t}<br />{s.sub}</h4>
              <p className="bs-sc-d">{s.d}</p>
              <div className="bs-sc-a">{s.a}</div>
            </div>
          ))}
        </div>
        <div className="bs-promise reveal" style={{ position: 'relative', zIndex: 1 }}>
          <div className="bs-promise-grid">
            <div>
              <p style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '.28em', textTransform: 'uppercase', color: 'rgba(240,200,69,.38)', marginBottom: '8px' }}>Our Promise</p>
              <h3 style={{ fontFamily: 'var(--FM)', fontWeight: 800, fontSize: 'clamp(30px,4vw,54px)', color: 'var(--Y)', lineHeight: '1.05', marginBottom: '16px' }}>The Ereynard <span style={{ color: 'transparent', WebkitTextStroke: '1px rgba(240,200,69,.24)' }}>Difference</span></h3>
              <p style={{ fontSize: '14px', lineHeight: '1.8', color: 'rgba(240,200,69,.48)', marginBottom: '10px' }}>We are the <strong style={{ color: 'var(--Y)' }}>"31 Flavours"</strong> for your brand's digital existence — every ingredient chosen with purpose, every campaign a perfectly customised scoop.</p>
              <p style={{ fontSize: '14px', lineHeight: '1.8', color: 'rgba(240,200,69,.48)', marginBottom: '22px' }}>Ereynard Digital makes your brand's growth <strong style={{ color: 'var(--Y)' }}>exciting, customised, and — most importantly — profitable.</strong></p>
              <button className="btn-p" onClick={() => nav('contact')}><span>Start Your Flavour</span><span>→</span></button>
            </div>
            <div>
              {[{ i: '🥄', t: 'We Give You the Pink Spoon', d: 'We constantly test, analyse, and refine — ensuring every rupee invested delivers the highest conversion rates.' }, { i: '🍦', t: 'We Deliver the Full Cone', d: "Our focus is never post count — it's the new customer, increased sales, and growth that compounds month after month." }].map((p, i) => (
                <div key={i} className="bs-p-item"><div className="bs-p-icon">{p.i}</div><div><div className="bs-p-title">{p.t}</div><p className="bs-p-txt">{p.d}</p></div></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// SERVICES MINI (homepage — compact)
// ═══════════════════════════════════════════════════════════
function ServicesMini({ nav, openSvc }) {
  useReveal();
  const svcs = [{ k: 'seo', i: '🔍', t: 'SEO' }, { k: 'social', i: '📱', t: 'Social Media' }, { k: 'performance', i: '🎯', t: 'Performance Ads' }, { k: 'content', i: '✍️', t: 'Content Strategy' }, { k: 'web', i: '🌐', t: 'Web Design' }, { k: 'analytics', i: '📊', t: 'Analytics' }, { k: 'branding', i: '🎨', t: 'Branding' }, { k: 'email', i: '📧', t: 'Email Marketing' }, { k: 'influencer', i: '🤝', t: 'Influencer Marketing' }];
  return (
    <div className="svc-bg">
      <section className="sec on-navy">
        <div className="reveal">
          <div className="sec-label"><span>What We Do</span></div>
          <h2 className="sec-title">Our <span className="out">Services</span></h2>
          <p className="sec-intro">Click any service for detailed information — or explore the full services page.</p>
        </div>
        <div className="svc-mini">
          {svcs.map(s => (
            <div key={s.k} className="svc-mini-card reveal" onClick={() => openSvc(s.k)}>
              <span className="svc-mini-icon">{s.i}</span>
              <span className="svc-mini-name">{s.t}</span>
              <span className="svc-mini-arrow">→</span>
            </div>
          ))}
        </div>
        <div style={{ marginTop: '28px', textAlign: 'center' }}>
          <button className="btn-p" onClick={() => nav('services')}><span>Explore All Services</span><span>→</span></button>
        </div>
      </section>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// SERVICES FULL (services page — detailed row list)
// ═══════════════════════════════════════════════════════════
function ServicesFull({ openSvc }) {
  useReveal();
  useTilt();
  const svcs = Object.entries(SVC_DATA).map(([k, v]) => ({ k, ...v }));
  return (
    <div className="svc-bg">
      <section className="sec on-navy">
        <div className="reveal">
          <div className="sec-label"><span>Complete Service Offering</span></div>
          <h2 className="sec-title">Everything We <span className="out">Deliver</span></h2>
          <p className="sec-intro">9 specialised services, each a complete growth engine. Click any service to see the full breakdown — deliverables, strategy, and proven results.</p>
        </div>
        {/* Full card grid for services */}
        <div className="svc-full-grid">
          {svcs.filter(s => s.k !== 'strategy').map(s => (
            <div key={s.k} className="scard reveal" onClick={() => openSvc(s.k)}>
              <div className="sn">{s.num}</div>
              <span className="si">{s.icon}</span>
              <h3 className="st">{s.title}</h3>
              <p className="sd">{s.desc}</p>
              <span className="sa">Full Details →</span>
            </div>
          ))}
        </div>
        {/* Detailed list view below */}
        <div style={{ marginTop: '56px' }}>
          <div className="sec-label" style={{ marginBottom: '6px' }}><span>Service Details</span></div>
          <h3 style={{ fontFamily: 'var(--FM)', fontWeight: 800, fontSize: '28px', color: 'var(--Y)', marginBottom: '4px' }}>What's Included in Each Service</h3>
          <p style={{ fontSize: '13px', color: 'rgba(240,200,69,.44)', marginBottom: '0' }}>Click any row to see full scope, deliverables, and case study results.</p>
        </div>
        <div className="svc-detail-list">
          {svcs.map(s => (
            <div key={s.k} className="svc-detail-row reveal" onClick={() => openSvc(s.k)}>
              <div className="sdr-left">
                <span className="sdr-icon">{s.icon}</span>
                <div>
                  <div className="sdr-num">{s.num}</div>
                  <div className="sdr-name">{s.title}</div>
                </div>
              </div>
              <div className="sdr-desc">{s.desc}</div>
              <div className="sdr-tags">
                {s.tags.map((tag, i) => <span key={i} className="sdr-tag">{tag}</span>)}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// STATS
// ═══════════════════════════════════════════════════════════
function Stats() {
  const ref = useRef(null);
  const [counted, setCounted] = useState(false);
  useEffect(() => {
    const co = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting || counted) return;
        setCounted(true);
        e.target.querySelectorAll('.s-num').forEach(el => {
          const t = +el.dataset.t, s = el.dataset.s || ''; let c = 0, inc = t / 65;
          const id = setInterval(() => { c = Math.min(c + inc, t); el.textContent = Math.floor(c) + s; if (c >= t) clearInterval(id); }, 14);
        });
        co.unobserve(e.target);
      });
    }, { threshold: .3 });
    if (ref.current) co.observe(ref.current);
    return () => co.disconnect();
  }, [counted]);
  return (
    <div className="stats-bg" ref={ref}>
      <div className="stats-grid">
        {[{ t: 200, s: '+', l: 'Brands Scaled' }, { t: 7, s: '+', l: 'Years of Expertise' }, { t: 98, s: '%', l: 'Client Retention' }, { t: 50, s: 'Cr+', l: 'Ad Spend Managed' }].map((s, i) => (
          <div key={i} className="s-item"><div className="s-num" data-t={s.t} data-s={s.s}>0</div><div className="s-lbl">{s.l}</div></div>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// IMAGE BAND
// ═══════════════════════════════════════════════════════════
function ImageBand() {
  const items = [
    { url: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=400&auto=format&fit=crop&q=80', tag: 'Social Media' },
    { url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&auto=format&fit=crop&q=80', tag: 'Analytics' },
    { url: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=400&auto=format&fit=crop&q=80', tag: 'SEO' },
    { url: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&auto=format&fit=crop&q=80', tag: 'Strategy' },
    { url: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=400&auto=format&fit=crop&q=80', tag: 'Web Design' },
    { url: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&auto=format&fit=crop&q=80', tag: 'Branding' },
    { url: 'https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=400&auto=format&fit=crop&q=80', tag: 'Content' },
    { url: 'https://images.unsplash.com/photo-1573164574572-cb89e39749b4?w=400&auto=format&fit=crop&q=80', tag: 'Paid Ads' },
  ];
  return (
    <div className="imgband">
      <div className="ibt">
        {[...items, ...items].map((item, i) => <div key={i} className="ib-item"><img src={item.url} alt={item.tag} /><span className="ib-tag">{item.tag}</span></div>)}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// PROCESS SHORT (homepage)
// ═══════════════════════════════════════════════════════════
function ProcessShort({ nav }) {
  useReveal();
  const steps = [
    { n: '01', t: 'Discover', d: 'Deep-dive into your brand, audience, and goals. Only intelligence from real data.' },
    { n: '02', t: 'Strategise', d: 'A bespoke digital roadmap tailored to your objectives. Every move intentional.' },
    { n: '03', t: 'Execute', d: 'Our specialists launch campaigns with precision across all chosen channels.' },
    { n: '04', t: 'Optimise', d: "Track, refine, scale. What works gets amplified. Growth never stops." },
  ];
  return (
    <div className="process-bg">
      <section className="sec on-navy">
        <div className="reveal">
          <div className="sec-label"><span>How We Work</span></div>
          <h2 className="sec-title">The Fox <span className="out">Method</span></h2>
          <p className="sec-intro">Four deliberate steps from discovery to compounding growth.</p>
        </div>
        <div className="proc-steps-short">
          {steps.map((s, i) => (
            <div key={i} className="pstep-s reveal">
              <div className="ps-num">{s.n}</div>
              <h3>{s.t}</h3>
              <p>{s.d}</p>
            </div>
          ))}
        </div>
        <div style={{ marginTop: '28px', textAlign: 'center' }}>
          <button className="btn-g" onClick={() => nav('process')}>See Full Process →</button>
        </div>
      </section>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// PROCESS FULL (process page)
// ═══════════════════════════════════════════════════════════
function ProcessFull() {
  useReveal();
  const steps = [
    {
      img: 'https://images.unsplash.com/photo-1434626881859-194d67b2b86f?w=800&auto=format&fit=crop&q=80',
      n: '01', t: 'Discover',
      d: "We don't assume — we investigate. Before a single ad or post, we conduct a comprehensive brand audit, audience analysis, competitor mapping, and goal-setting workshop.",
      items: ['Brand & digital audit', 'Audience persona research', 'Competitor gap analysis', 'Goal setting & KPI definition', 'Budget allocation planning']
    },
    {
      img: 'https://images.unsplash.com/photo-1512758017271-d7b84c2113f1?w=800&auto=format&fit=crop&q=80',
      n: '02', t: 'Strategise',
      d: 'Every brand gets a bespoke digital roadmap — not a template. We map each channel, content type, and campaign to specific business outcomes.',
      items: ['Channel selection & mix', '90-day content roadmap', 'Campaign architecture', 'Creative strategy brief', 'Attribution framework setup']
    },
    {
      img: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&auto=format&fit=crop&q=80',
      n: '03', t: 'Execute',
      d: 'Our specialists roll out every element with precision — no cutting corners, no skipped steps. Every campaign, content piece, and ad set is quality-checked before launch.',
      items: ['Campaign launch & QA', 'Creative production', 'Landing page development', 'Tracking & pixel setup', 'Cross-channel coordination']
    },
    {
      img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80',
      n: '04', t: 'Optimise',
      d: 'We analyse continuously, refine relentlessly, and scale what works. Monthly strategy reviews ensure your campaign evolves as your business grows.',
      items: ['Weekly performance analysis', 'A/B testing ongoing', 'Budget reallocation', 'Monthly strategy review', 'Quarterly growth planning']
    },
  ];
  return (
    <div className="process-bg">
      <section className="sec on-navy">
        <div className="reveal">
          <div className="sec-label"><span>Our Methodology</span></div>
          <h2 className="sec-title">The Fox <span className="out">Method</span></h2>
          <p className="sec-intro">Four deliberate steps that transform brands into category leaders. Every phase is documented, measurable, and built for compounding results.</p>
        </div>
        <div className="proc-steps-full">
          {steps.map((s, i) => (
            <div key={i} className="pstep-f reveal">
              <div className="pstep-f-img"><img src={s.img} alt={s.t} /></div>
              <div className="pstep-f-body">
                <div className="pstep-f-num">STEP {s.n}</div>
                <div className="pstep-f-title">{s.t}</div>
                <p className="pstep-f-desc">{s.d}</p>
                <div className="pstep-f-items">
                  {s.items.map((item, j) => <div key={j} className="pstep-f-item">{item}</div>)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// WORK / PROJECTS
// ═══════════════════════════════════════════════════════════
function WorkSection({ openCamp, showViewAll, nav }) {
  useReveal();
  const projects = [
    { k: 'novabrand', img: 'https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=1600&auto=format&fit=crop&q=80', tag: 'Performance Marketing', title: 'NovaBrand — 10x ROI', meta: 'Google Ads · Meta Ads · Landing Page · Analytics', feat: true },
    { k: 'luxethreads', img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&auto=format&fit=crop&q=80', tag: 'Social Media', title: 'LuxeThreads — 340% Sales', meta: 'Instagram · Reels · Influencer · Content' },
    { k: 'technest', img: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=900&auto=format&fit=crop&q=80', tag: 'SEO + Content', title: 'TechNest — 225x Traffic', meta: 'Technical SEO · Blog Strategy · Link Building' },
    { k: 'growfast', img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&auto=format&fit=crop&q=80', tag: 'Performance Ads', title: 'GrowFast — -60% CPL', meta: 'Google Ads · Meta Ads · CRO · Analytics' },
    { k: 'eduspark', img: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&auto=format&fit=crop&q=80', tag: 'Content + SEO', title: 'EduSpark — 225x Blog Growth', meta: 'Content Strategy · SEO · Blog · 6 Months' },
  ];
  return (
    <div className="work-bg">
      <section className="sec on-yellow">
        <div className="reveal">
          <div className="sec-label"><span>Selected Work</span></div>
          <h2 className="sec-title">Our <span className="out">Campaigns</span></h2>
        </div>
        <div className="work-grid">
          {projects.map(p => (
            <div key={p.k} className={`wi reveal ${p.feat ? 'feat' : ''}`} onClick={() => openCamp(p.k)}>
              <div className="wi-bg"><img src={p.img} alt={p.title} /></div>
              <div className="wi-ov"><span className="wi-tag">{p.tag}</span><h3 className="wi-title">{p.title}</h3><p className="wi-meta">{p.meta}</p></div>
              <div className="wi-arr">→</div>
            </div>
          ))}
        </div>
        {showViewAll && nav && (
          <div style={{ marginTop: '32px', textAlign: 'center' }}>
            <button className="btn-out" onClick={() => nav('projects')}><span>View All Projects</span><span>→</span></button>
          </div>
        )}
      </section>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// TEAM SECTION
// ═══════════════════════════════════════════════════════════
function TeamSection({ showAll = false }) {
  useReveal();
  const members = showAll ? TEAM : TEAM.slice(0, 4);
  return (
    <div className="team-bg">
      <section className="sec on-navy">
        <div className="reveal">
          <div className="sec-label"><span>The Pack</span></div>
          <h2 className="sec-title">Meet The <span className="out">Foxes</span></h2>
          <p className="sec-sub">25+ specialists. One shared obsession — your brand's growth.</p>
        </div>
        <div className="team-grid">
          {members.map((t, i) => (
            <div key={i} className="tm-card reveal">
              <img className="tm-img" src={t.img} alt={t.name} />
              <div className="tm-info">
                <div className="tm-nm">{t.name}</div>
                <div className="tm-rl">{t.role}</div>
                <div className="tm-lnks">{t.links.map((l, j) => <a key={j} href={l.url} target="_blank" rel="noopener noreferrer" className="tm-lnk">{l.l}</a>)}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// CLIENTS — testimonial carousel + awards (no campaigns)
// ═══════════════════════════════════════════════════════════
function ClientsSection({ openCamp }) {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const clients = [{ n: 'NOVABRAND' }, { n: 'LUXETHREADS' }, { n: 'TECHNEST' }, { n: 'GROWFAST' }, { n: 'EDUSPARK' }, { n: 'WELLNESSHIVE' }, { n: 'BRANDCRAFT' }, { n: 'DIGITALX' }, { n: 'NEXARISE' }];
  const awards = [
    { i: '🏆', t: '98% Client Retention', sub: '7 years running' },
    { i: '⭐', t: 'Top Digital Agency', sub: 'Rajasthan 2024' },
    { i: '📈', t: '₹50Cr+ Managed', sub: 'In ad spend across clients' },
    { i: '🎯', t: '200+ Brands Scaled', sub: 'Across India' },
    { i: '🦊', t: 'Fox Method Certified', sub: 'Proprietary 4-step framework' },
    { i: '🌟', t: 'Google & Meta Partner', sub: 'Certified performance agency' },
  ];
  useReveal();
  return (
    <div className="clients-bg">
      <p className="cl-lbl">Trusted by forward-thinking brands across India</p>
      <div className="cl-row">
        {clients.map((c, i) => <span key={i} className="clogo">{c.n}</span>)}
      </div>
      {/* Testimonial carousel */}
      <div className="ct-carousel">
        <div className="ct-track" style={{ transform: `translateX(-${activeTestimonial * 100}%)` }}>
          {CLIENT_TESTIMONIALS.map((t, i) => (
            <div key={i} className="ct-slide">
              <div className="ct-card">
                <div>
                  <p className="ct-quote">{t.quote}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <img src={t.img} alt={t.name} style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover', filter: 'saturate(.3)' }} />
                    <div><div className="ct-auth-name">{t.name}</div><div className="ct-auth-role">{t.role}</div></div>
                  </div>
                </div>
                <div className="ct-metric">
                  <div className="ct-metric-n">{t.metric}</div>
                  <div className="ct-metric-l">{t.metricLabel}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="ct-nav">
          {CLIENT_TESTIMONIALS.map((_, i) => <button key={i} className={`ct-dot ${i === activeTestimonial ? 'active' : ''}`} onClick={() => setActiveTestimonial(i)} />)}
        </div>
      </div>
      {/* Awards & credentials */}
      <div style={{ marginTop: '48px' }}>
        <p style={{ textAlign: 'center', fontSize: '9px', fontWeight: 700, letterSpacing: '.26em', textTransform: 'uppercase', color: 'rgba(14,16,75,.36)', marginBottom: '20px' }}>Why Brands Trust Us</p>
        <div className="awards-grid">
          {awards.map((a, i) => (
            <div key={i} className="award-card reveal">
              <span className="award-icon">{a.i}</span>
              <div className="award-title">{a.t}</div>
              <div className="award-sub">{a.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// FAQ (only home and services)
// ═══════════════════════════════════════════════════════════
function FAQ({ nav }) {
  const [open, setOpen] = useState(null);
  useReveal();
  return (
    <div className="faq-bg">
      <section className="sec on-navy">
        <div className="reveal">
          <div className="sec-label"><span>Got Questions?</span></div>
          <h2 className="sec-title">Frequently <span className="out">Asked</span></h2>
        </div>
        <div className="faq-grid">
          <div className="rev-l">
            <p style={{ fontSize: '14px', lineHeight: '1.8', color: 'rgba(240,200,69,.44)', marginTop: '12px' }}>Can't find what you're looking for? Our team is always ready to answer questions about services, pricing, or process.</p>
            <p style={{ fontSize: '14px', lineHeight: '1.8', color: 'rgba(240,200,69,.44)', marginTop: '11px' }}>As <strong style={{ color: 'var(--Y)' }}>India's sharpest digital agency</strong>, we believe in full transparency — no jargon, no fluff.</p>
            <div style={{ marginTop: '22px' }}><button className="btn-p" onClick={() => nav('contact')}><span>Ask Us Directly</span><span>→</span></button></div>
            <div style={{ marginTop: '26px' }}>
              <div className="faq-c-item">📍 Udaipur, Rajasthan, India</div>
              <div className="faq-c-item">📧 <a href="mailto:hello@ereynard.com">hello@ereynard.com</a></div>
              <div className="faq-c-item">📞 <a href="tel:+919876543210">+91 98765 43210</a></div>
            </div>
          </div>
          <div className="faq-list rev-r">
            {FAQS_DATA.map((f, i) => (
              <div key={i} className={`faq-item ${open === i ? 'open' : ''}`}>
                <div className="faq-q" onClick={() => setOpen(open === i ? null : i)}>
                  <span className="faq-q-txt">{f.q}</span>
                  <div className="faq-ico">+</div>
                </div>
                <div className="faq-a" style={{ maxHeight: open === i ? '260px' : '0' }}>
                  <div className="faq-a-inner" dangerouslySetInnerHTML={{ __html: f.a }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// CONTACT
// ═══════════════════════════════════════════════════════════
function Contact() {
  useReveal();
  useRipple();
  const [status, setStatus] = useState(null);
  const handle = () => {
    const nm = document.getElementById('f-name')?.value.trim();
    const em = document.getElementById('f-email')?.value.trim();
    if (!nm || !em) { setStatus('error'); setTimeout(() => setStatus(null), 2500); return; }
    setStatus('success'); setTimeout(() => setStatus(null), 3200);
  };
  return (
    <div className="contact-bg">
      <section className="sec on-navy" style={{ overflow: 'hidden' }}>
        <div className="eq-grid">
          <div className="rev-l">
            <div className="sec-label"><span>Get In Touch</span></div>
            <h2 className="sec-title">Let's Build <span className="out">Together.</span></h2>
            <p style={{ fontSize: '14px', lineHeight: '1.78', color: 'rgba(240,200,69,.48)', marginTop: '14px' }}>Ready to outfox your competition? Tell us about your brand and we'll craft a strategy that gets you there — faster, sharper, smarter.</p>
            <div className="eq-det">
              <div className="eq-di">📍 Udaipur, Rajasthan, India</div>
              <div className="eq-di">📧 <a href="mailto:hello@ereynard.com">hello@ereynard.com</a></div>
              <div className="eq-di">📞 <a href="tel:+919876543210">+91 98765 43210</a></div>
              <div className="eq-di">💬 <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer">WhatsApp Us</a></div>
            </div>
            <div className="eq-img-wrap shimmer"><img src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=700&auto=format&fit=crop&q=80" alt="Team" /></div>
          </div>
          <div className="eq-form rev-r">
            <div className="frow">
              <div className="fg"><label>Your Name</label><input type="text" id="f-name" placeholder="John Doe" /></div>
              <div className="fg"><label>Company</label><input type="text" id="f-co" placeholder="Brand Name" /></div>
            </div>
            <div className="frow">
              <div className="fg"><label>Email</label><input type="email" id="f-email" placeholder="hello@brand.com" /></div>
              <div className="fg"><label>Phone</label><input type="tel" id="f-ph" placeholder="+91 00000 00000" /></div>
            </div>
            <div className="fg">
              <label>Service You Need</label>
              <select id="f-svc">
                <option value="">Select a service...</option>
                <option>SEO</option><option>Social Media Marketing</option>
                <option>Performance Advertising</option><option>Content Strategy</option>
                <option>Web Design & Development</option><option>Branding & Identity</option>
                <option>Email & CRM Marketing</option><option>Full Digital Strategy</option>
              </select>
            </div>
            <div className="fg"><label>Tell Us About Your Project</label><textarea id="f-msg" placeholder="Share your goals, challenges, and what success looks like..." /></div>
            <button className="btn-sub" onClick={handle} style={status === 'error' ? { background: '#c0392b' } : status === 'success' ? { background: '#1a8a36' } : {}}>
              <span>{status === 'error' ? '⚠ Please fill name & email' : status === 'success' ? "✓ We'll be in touch shortly!" : 'Send Enquiry'}</span>
              {!status && <span>→</span>}
            </button>
          </div>
        </div>
        <div className="eq-bg-txt">EREYNARD</div>
      </section>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// BLOG LIST
// ═══════════════════════════════════════════════════════════
function BlogList({ nav }) {
  useReveal();
  return (
    <div className="blog-bg">
      <section className="sec on-navy">
        <div className="reveal">
          <div className="sec-label"><span>Fox Intelligence</span></div>
          <h2 className="sec-title">From <span className="out">The Den</span></h2>
          <p className="sec-intro">Sharp insights, real data, and no-fluff strategies from India's sharpest digital minds.</p>
        </div>
        <div className="blog-grid">
          {BLOG_POSTS.map((p, i) => (
            <div key={p.id} className={`blog-card reveal ${i === 0 ? 'featured' : ''}`} onClick={() => nav('blog-post', p.id)}>
              <div className="blog-img">
                <img src={p.img} alt={p.title} />
                <div className="blog-img-ov" />
                <span className="blog-cat">{p.cat}</span>
              </div>
              <div className="blog-body">
                <div className="blog-meta"><span>{p.date}</span><span>·</span><span>{p.read}</span></div>
                <h3 className="blog-title">{p.title}</h3>
                <p className="blog-excerpt">{p.excerpt}</p>
                <span className="blog-read">Read Article →</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// BLOG POST FULL
// ═══════════════════════════════════════════════════════════
function BlogPost({ postId, nav }) {
  const post = BLOG_POSTS.find(p => p.id === postId);
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); }, [postId]);
  if (!post) return null;
  const renderContent = (c) => c.map((block, i) => {
    if (block.h2) return <h2 key={i}>{block.h2}</h2>;
    if (block.h3) return <h3 key={i}>{block.h3}</h3>;
    if (block.blockquote) return <blockquote key={i}>{block.blockquote}</blockquote>;
    if (block.p) return <p key={i} dangerouslySetInnerHTML={{ __html: block.p.replace(/\n/g, '<br/>') }} />;
    return null;
  });
  return (
    <div className="blog-post-wrap">
      <div className="blog-post-hero" style={{ paddingTop: '80px' }}>
        <img src={post.img} alt={post.title} />
      </div>
      <div className="bp-content">
        <span className="bp-cat">{post.cat}</span>
        <h1 className="bp-title">{post.title}</h1>
        <div className="bp-meta"><span>{post.date}</span><span>·</span><span>{post.read}</span></div>
        <p className="bp-lead">{post.lead}</p>
        <div className="bp-divider" />
        <div className="bp-body">{renderContent(post.content)}</div>
        <div className="bp-back">
          <button className="btn-g" onClick={() => nav('blog')}>← Back to All Articles</button>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// SERVICE MODAL
// ═══════════════════════════════════════════════════════════
function ServiceModal({ svcKey, onClose, nav }) {
  if (!svcKey) return null;
  const d = SVC_DATA[svcKey]; if (!d) return null;
  return (
    <div className="svc-ov open" onClick={e => e.target.classList.contains('svc-ov') && onClose()}>
      <div className="svc-modal">
        <div className="sm-head">
          <div><div className="sm-num">{d.num}</div><div className="sm-title">{d.title}</div></div>
          <div className="sm-icon">{d.icon}</div>
          <button className="sm-close" onClick={onClose}>✕</button>
        </div>
        <div className="sm-body">
          <p className="sm-desc">{d.desc}</p>
          <div className="sm-feats">{d.feats.map((f, i) => <div key={i} className="sm-feat"><div className="sm-feat-icon">{f.i}</div><div className="sm-feat-txt"><strong>{f.t}</strong><span>{f.d}</span></div></div>)}</div>
          <div className="sm-results">{d.res.map((r, i) => <div key={i}><div className="sm-r-n">{r.n}</div><div className="sm-r-l">{r.l}</div></div>)}</div>
          <button className="sm-cta" onClick={() => { onClose(); nav('contact'); }}>Get a Free Proposal →</button>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// CAMPAIGN MODAL
// ═══════════════════════════════════════════════════════════
function CampaignModal({ campKey, onClose, nav }) {
  if (!campKey) return null;
  const d = CAMP_DATA[campKey]; if (!d) return null;
  return (
    <div className="camp-ov open" onClick={e => e.target.classList.contains('camp-ov') && onClose()}>
      <div className="camp-modal">
        <div className="camp-hero-img">
          <img src={d.img} alt={d.ttl} />
          <button className="camp-close" onClick={onClose}>✕</button>
          <div className="camp-hero-bot"><span className="camp-tag">{d.tag}</span><div className="camp-ttl">{d.ttl}</div><div className="camp-sub">{d.sub}</div></div>
        </div>
        <div className="camp-body">
          <div className="camp-kpis">{d.kpis.map((k, i) => <div key={i} className="kpi"><div className="kpi-n">{k.n}</div><div className="kpi-l">{k.l}</div></div>)}</div>
          <div className="camp-div" />
          <p className="camp-ov-txt">{d.ov}</p>
          <div className="camp-sh">Challenges We Solved</div>
          <div className="camp-chals">{d.chals.map((c, i) => <div key={i} className="camp-chal"><div className="camp-chal-i">{c.i}</div><div className="camp-chal-t">{c.t}</div></div>)}</div>
          <div className="camp-sh">Services Used</div>
          <div className="camp-svcs">{d.svcs.map((s, i) => <span key={i} className="camp-svc-t">{s}</span>)}</div>
          <div className="camp-sh">How We Did It</div>
          <div className="camp-tl">{d.tl.map((t, i) => <div key={i} className="camp-tl-item"><div className="camp-tl-ph">{t.p}</div><div className="camp-tl-ac">{t.a}</div></div>)}</div>
          <div className="camp-q"><div className="camp-q-t">{d.q}</div><div className="camp-q-by">{d.qby}</div></div>
          <div className="camp-cta-row">
            <button className="sm-cta" onClick={() => { onClose(); nav('contact'); }}>Start a Similar Campaign →</button>
            <button className="btn-ghost" onClick={() => { onClose(); nav('projects'); }}>View All Campaigns</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// CHATBOT
// ═══════════════════════════════════════════════════════════
function Chatbot({ nav }) {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState([]);
  const [inp, setInp] = useState('');
  const [busy, setBusy] = useState(false);
  const [badge, setBadge] = useState(true);
  const [lang, setLang] = useState('auto');
  const [langLbl, setLangLbl] = useState('हिं/EN');
  const [first, setFirst] = useState(false);
  const ref = useRef(null);

  const SYS = `You are Foxy, the friendly and witty AI assistant for Ereynard Digital — a premium full-service digital marketing agency based in Udaipur, Rajasthan, India. Use fox metaphors occasionally. Keep responses concise — max 4-5 sentences or a short list. Be warm and conversational.
AGENCY: Ereynard Digital | "Smart like a fox. Sharp in digital." | Udaipur, Rajasthan | hello@ereynard.com | +91 98765 43210 | 7+ years | 200+ brands | 98% retention | ₹50 Cr+ ad spend
SERVICES: SEO, Social Media, Performance Ads, Content Strategy, Web Design, Analytics, Branding, Email/CRM, Influencer Marketing
FOX METHOD: Discover → Strategise → Execute → Optimise
TEAM: Krish Narwani (CEO), Priya Sharma (Strategy), Aryan Mehta (Creative), Sneha Kapoor (Performance)
CASE STUDIES: NovaBrand 10x ROI, LuxeThreads 340% sales, TechNest 225x traffic, GrowFast -60% CPL
LANGUAGE: Auto-detect. Hindi → Hindi. English → English. Hinglish → Hinglish.`;

  const scroll = () => { if (ref.current) ref.current.scrollTop = ref.current.scrollHeight; };
  const addMsg = (role, text) => { setMsgs(m => [...m, { role, text }]); setTimeout(scroll, 50); };

  const toggle = () => {
    setOpen(v => !v); setBadge(false);
    if (!first) { setFirst(true); setTimeout(() => addMsg('bot', '🦊 Namaste! Main hoon **Foxy** — Ereynard Digital ka AI assistant!\n\nServices, pricing, case studies — **English ya Hindi** dono mein baat karo! 😊\n\nBatao, kya jaanna chahte ho?'), 480); }
  };

  const cycleLang = () => {
    if (lang === 'auto') { setLang('hindi'); setLangLbl('→ हिंदी'); addMsg('bot', 'अब मैं सिर्फ **हिंदी** में जवाब दूंगा! 🦊'); }
    else if (lang === 'hindi') { setLang('english'); setLangLbl('→ EN'); addMsg('bot', 'Switched to **English** mode! 🦊'); }
    else { setLang('auto'); setLangLbl('हिं/EN'); addMsg('bot', 'Auto-detect on! 🦊 Dono chalega!'); }
  };

  const send = async (text) => {
    const txt = (text || inp).trim(); if (!txt || busy) return;
    setInp(''); addMsg('user', txt); setBusy(true); addMsg('typing', '...');
    const history = [...msgs.filter(m => m.role !== 'typing'), { role: 'user', content: txt }];
    let sys = SYS;
    if (lang === 'hindi') sys += '\n\nCRITICAL: Respond ONLY in Hindi (Devanagari script).';
    else if (lang === 'english') sys += '\n\nCRITICAL: Respond ONLY in English.';
    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ model: 'claude-sonnet-4-20250514', max_tokens: 500, system: sys, messages: history.slice(-12).map(m => ({ role: m.role === 'user' ? 'user' : 'assistant', content: m.text || m.content || '' })).filter(m => m.content) }) });
      const data = await res.json();
      const reply = (data.content || []).map(b => b.type === 'text' ? b.text : '').join('') || 'Oops! Network issue. Try again! 🦊';
      setMsgs(m => m.filter(x => x.role !== 'typing')); addMsg('bot', reply);
    } catch {
      setMsgs(m => m.filter(x => x.role !== 'typing')); addMsg('bot', 'Thoda network issue 🦊 Direct contact: **hello@ereynard.com**');
    }
    setBusy(false);
  };

  const rnd = t => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br/>');

  return (
    <>
      <button id="bot-btn" className={open ? 'open' : ''} onClick={toggle}>
        {!open ? <span style={{ fontSize: '24px' }}>🦊</span> : <span style={{ fontSize: '17px', color: 'var(--Y)' }}>✕</span>}
        {badge && <span className="bb-badge">1</span>}
      </button>
      <div id="bot-win" className={open ? 'open' : ''}>
        <div className="bh">
          <div className="bh-fox">🦊</div>
          <div className="bh-info"><div className="bh-nm">Foxy — Ereynard AI</div><div className="bh-st"><span className="bh-dot" />Online · Replies instantly</div></div>
          <button className="bh-lang" onClick={cycleLang}>{langLbl}</button>
          <button className="bh-cl" onClick={toggle}>✕</button>
        </div>
        <div className="bq">
          {[['What services do you offer?', 'Services'], ['Pricing?', 'Pricing'], ['Case studies', 'Case Studies'], ['Contact info', 'Contact'], ['SEO kya hota hai?', 'SEO क्या है?']].map(([q, l], i) => <button key={i} className="bqc" onClick={() => send(q)}>{l}</button>)}
        </div>
        <div id="bot-msgs" ref={ref}>
          {msgs.map((m, i) => m.role === 'typing' ? <div key={i} className="cmsg bot"><div className="c-av">🦊</div><div className="typing"><span /><span /><span /></div></div> : <div key={i} className={`cmsg ${m.role}`}><div className="c-av">{m.role === 'bot' ? '🦊' : '👤'}</div><div className="c-bbl" dangerouslySetInnerHTML={{ __html: rnd(m.text) }} /></div>)}
        </div>
        <div className="bi">
          <input id="bot-inp" type="text" placeholder="English ya Hindi mein poochho..." value={inp} onChange={e => setInp(e.target.value)} onKeyDown={e => e.key === 'Enter' && !e.shiftKey && send()} />
          <button id="bot-send" onClick={() => send()} disabled={busy}>➤</button>
        </div>
        <div className="bot-powered">Powered by Ereynard AI 🦊</div>
      </div>
    </>
  );
}

// ═══════════════════════════════════════════════════════════
// FOOTER
// ═══════════════════════════════════════════════════════════
function Footer({ nav, openSvc }) {
  return (
    <footer>
      <div className="ft-grid">
        <div className="ft-brand">
          <button className="ft-logo" onClick={() => nav('home')}>🦊 ereynard.</button>
          <p>Smart like a fox. Sharp in digital. We build brands that dominate the digital landscape.</p>
          <div className="ft-soc">{[['in', 'https://linkedin.com'], ['ig', 'https://instagram.com'], ['fb', 'https://facebook.com'], ['yt', 'https://youtube.com']].map(([l, u]) => <a key={l} href={u} target="_blank" rel="noopener noreferrer" className="ft-sl">{l}</a>)}</div>
        </div>
        <div className="ft-col"><h4>Services</h4><ul>{[['SEO', 'seo'], ['Social Media', 'social'], ['Performance Ads', 'performance'], ['Content Strategy', 'content'], ['Web Design', 'web'], ['Branding', 'branding']].map(([l, k]) => <li key={k}><button onClick={() => openSvc(k)}>{l}</button></li>)}</ul></div>
        <div className="ft-col"><h4>Company</h4><ul>{[['About Us', 'about'], ['Our Story', 'about'], ['Our Work', 'projects'], ['Our Process', 'process'], ['Our Team', 'team'], ['Clients', 'clients']].map(([l, p], i) => <li key={i}><button onClick={() => nav(p)}>{l}</button></li>)}</ul></div>
        <div className="ft-col"><h4>Contact</h4><ul><li><a href="mailto:ereynardofficial@gmail.com">ereynardofficial@gmail.com</a></li><li><a href="tel:+918619189335">+91 86191 89335</a></li><li><a href="#">Udaipur, Rajasthan</a></li><li><button onClick={() => nav('contact')}>Enquire Now</button></li></ul></div>
      </div>
      <div className="ft-bot"><span>© 2025 <strong>Ereynard</strong>. All rights reserved.</span><span>Smart like a fox. <strong>Sharp in digital.</strong></span></div>
    </footer>
  );
}

// ═══════════════════════════════════════════════════════════
// PAGES — Clean, no repetition, unique per page
// ═══════════════════════════════════════════════════════════
function HomePage({ nav, openSvc, openCamp, openContact }) {
  useTilt(); useRipple();
  return (
    <>
      <Hero nav={nav} openContact={openContact} />
      <Marquee />
      <AboutSection nav={nav} openSvc={openSvc} />
      <BrandStory nav={nav} />
      <ServicesMini nav={nav} openSvc={openSvc} />
      <Stats />
      <ImageBand />
      <ProcessShort nav={nav} />
      <WorkSection openCamp={openCamp} showViewAll nav={nav} />
      <FAQ nav={nav} />
    </>
  );
}

function AboutPage({ nav, openSvc }) {
  useTilt(); useRipple();
  return (
    <>
      <PageHero label="Who We Are" title="About Ereynard" strokeWord="Ereynard" sub="India's sharpest digital agency — cunning, precise, always a few moves ahead." />
      <AboutSection nav={nav} openSvc={openSvc} />
      <BrandStory nav={nav} />
      <Stats />
    </>
  );
}

function ServicesPage({ openSvc, nav }) {
  useTilt(); useRipple();
  return (
    <>
      <PageHero label="What We Do" title="Our Services" strokeWord="Services" sub="9 specialised services. One obsession — your growth." />
      <ServicesFull openSvc={openSvc} />
      <ImageBand />
      <Stats />
      <FAQ nav={nav} />
    </>
  );
}

function ProjectsPage({ openCamp }) {
  useTilt(); useRipple();
  return (
    <>
      <PageHero label="Selected Work" title="Our Campaigns" strokeWord="Campaigns" sub="Real brands. Real results. Real growth." />
      <WorkSection openCamp={openCamp} />
    </>
  );
}

function ProcessPage({ nav }) {
  useRipple();
  return (
    <>
      <PageHero label="How We Work" title="The Fox Method" strokeWord="Method" sub="Four deliberate steps from brand audit to compounding growth." />
      <ProcessFull />
      <Stats />
    </>
  );
}

function TeamPage({ openContact }) {
  useRipple();
  return (
    <>
      <PageHero label="The Pack" title="Meet The Foxes" strokeWord="Foxes" sub="25+ specialists. One shared obsession — your brand's growth." />
      <TeamSection showAll={true} />
      <div style={{ background: 'var(--B3)', padding: '56px', textAlign: 'center' }}>
        <p style={{ fontFamily: 'var(--FI)', fontStyle: 'italic', fontSize: 'clamp(15px,2vw,22px)', color: 'rgba(240,200,69,.42)', marginBottom: '22px', lineHeight: '1.6' }}>Ready to work with the pack?</p>
        <button className="btn-p" onClick={openContact}><span>Start a Project</span><span>→</span></button>
      </div>
    </>
  );
}

function ClientsPage({ openCamp }) {
  useRipple();
  return (
    <>
      <PageHero label="Trusted By" title="Our Clients" strokeWord="Clients" sub="200+ brands across India that chose to outfox the competition." />
      <ClientsSection openCamp={openCamp} />
    </>
  );
}

function BlogPage({ nav }) {
  useRipple();
  return (
    <>
      <PageHero label="Fox Intelligence" title="From The Den" strokeWord="Den" sub="Sharp insights, real data, no-fluff strategies from India's sharpest digital minds." />
      <BlogList nav={nav} />
    </>
  );
}

function ContactPage() {
  useRipple();
  return (
    <>
      <PageHero label="Get In Touch" title="Let's Build Together" strokeWord="Together" sub="Ready to outfox your competition? Let's start the conversation." />
      <Contact />
    </>
  );
}

// ═══════════════════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════════════════
export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [page, setPage] = useState('home');
  const [blogPostId, setBlogPostId] = useState(null);
  const [transition, setTransition] = useState(null);
  const [svcKey, setSvcKey] = useState(null);
  const [campKey, setCampKey] = useState(null);

  useEffect(() => {
    const esc = e => { if (e.key === 'Escape') { setSvcKey(null); setCampKey(null); document.body.style.overflow = ''; } };
    document.addEventListener('keydown', esc);
    return () => document.removeEventListener('keydown', esc);
  }, []);

  useEffect(() => {
    if (svcKey || campKey) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
  }, [svcKey, campKey]);

  const nav = useCallback((p, postId = null) => {
    if (p === page && !postId) { window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
    setTransition('pt-enter');
    setTimeout(() => {
      setPage(p);
      if (postId) setBlogPostId(postId);
      window.scrollTo({ top: 0, behavior: 'instant' });
      setTransition('pt-exit');
      setTimeout(() => setTransition(null), 560);
    }, 520);
  }, [page]);

  const openContact = useCallback(() => nav('contact'), [nav]);
  const openSvc = useCallback(k => setSvcKey(k), []);
  const openCamp = useCallback(k => setCampKey(k), []);

  const renderPage = () => {
    const p = { nav, openSvc, openCamp, openContact };
    if (page === 'blog-post') return <BlogPost postId={blogPostId} nav={nav} />;
    switch (page) {
      case 'home': return <HomePage {...p} />;
      case 'about': return <AboutPage {...p} />;
      case 'services': return <ServicesPage {...p} />;
      case 'projects': return <ProjectsPage {...p} />;
      case 'process': return <ProcessPage {...p} />;
      case 'team': return <TeamPage {...p} />;
      case 'clients': return <ClientsPage {...p} />;
      case 'blog': return <BlogPage {...p} />;
      case 'contact': return <ContactPage {...p} />;
      default: return <HomePage {...p} />;
    }
  };

  return (
    <>
      <GlobalStyles />
      <Cursor />
      {!loaded && <Loader onDone={() => setLoaded(true)} />}
      <PageTransition state={transition} />
      <Header page={page} nav={nav} openContact={openContact} />
      <main>{renderPage()}</main>
      <Footer nav={nav} openSvc={openSvc} />
      <Chatbot nav={nav} />
      {svcKey && <ServiceModal svcKey={svcKey} onClose={() => setSvcKey(null)} nav={nav} />}
      {campKey && <CampaignModal campKey={campKey} onClose={() => setCampKey(null)} nav={nav} />}
    </>
  );
}