const globalStyles = `
  :root{
    --Y:#f0c845;--Y2:#ffd966;--Y3:#d4a800;
    --B:#080930;--B2:#0e104b;--B3:#080a38;--B4:#12145a;
    --W:#fff;
    --FD:'Bebas Neue',sans-serif;
    --FB:'DM Sans',sans-serif;
    --FI:'Playfair Display',serif;
    --FM:'Bebas Neue',sans-serif;
  }
  *,*::before,*::after{margin:0;padding:0;box-sizing:border-box;}
  html{scroll-behavior:smooth;}
  body{font-family:var(--FB);background:var(--B);color:var(--Y);overflow-x:hidden;}
  ::-webkit-scrollbar{width:3px;}::-webkit-scrollbar-track{background:var(--B3);}::-webkit-scrollbar-thumb{background:var(--Y);border-radius:2px;}
  a{text-decoration:none;color:inherit;}

  @keyframes foxBounce{0%,100%{transform:translateY(0) rotate(-6deg);}50%{transform:translateY(-22px) rotate(6deg);}}
  @keyframes ldropIn{from{opacity:0;transform:translateY(-32px);}to{opacity:1;transform:none;}}
  @keyframes lbarFill{to{width:100%;}}
  @keyframes fadeIn{to{opacity:1;}}
  @keyframes slideUp{from{opacity:0;transform:translateY(40px);}to{opacity:1;transform:none;}}
  @keyframes mqScroll{from{transform:translateX(0);}to{transform:translateX(-50%);}}
  @keyframes ibScroll{from{transform:translateX(0);}to{transform:translateX(-50%);}}
  @keyframes glowPulse{0%,100%{opacity:.6;transform:translateY(-50%) scale(1);}50%{opacity:1;transform:translateY(-52%) scale(1.15);}}
  @keyframes orbF{0%,100%{transform:translate(0,0);}50%{transform:translate(36px,-28px);}}
  @keyframes rotateSpin{to{transform:rotate(360deg);}}
  @keyframes scrollAnim{0%{transform:scaleY(0);transform-origin:top;}50%{transform:scaleY(1);transform-origin:top;}51%{transform-origin:bottom;}100%{transform:scaleY(0);transform-origin:bottom;}}
  @keyframes botPop{from{transform:scale(0) rotate(-25deg);opacity:0;}to{transform:scale(1);opacity:1;}}
  @keyframes foxWag{0%,100%{transform:rotate(0);}25%{transform:rotate(-10deg);}75%{transform:rotate(9deg);}}
  @keyframes dotPulse{0%,100%{opacity:1;}50%{opacity:.3;}}
  @keyframes msgPop{from{opacity:0;transform:translateY(12px) scale(.95);}to{opacity:1;transform:none;}}
  @keyframes typeDot{0%,60%,100%{transform:translateY(0);opacity:.45;}30%{transform:translateY(-5px);opacity:1;}}
  @keyframes pulse{0%,100%{box-shadow:0 0 0 0 rgba(231,76,60,.5);}50%{box-shadow:0 0 0 9px rgba(231,76,60,0);}}
  @keyframes decoIn{to{opacity:.35;}}
  @keyframes sideImgIn{to{opacity:1;}}
  @keyframes rippleA{to{transform:scale(4);opacity:0;}}

  .loader{position:fixed;inset:0;background:var(--B3);z-index:999999;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:24px;overflow:hidden;transition:opacity .6s ease;}
  .loader::before{content:'';position:absolute;inset:0;background-image:radial-gradient(rgba(240,200,69,.04) 1px,transparent 1px);background-size:32px 32px;}
  .ld-fox{font-size:72px;animation:foxBounce 1.5s ease-in-out infinite;}
  .ld-name{font-family:var(--FD);font-size:clamp(52px,9vw,96px);letter-spacing:.08em;display:flex;overflow:hidden;}
  .ld-c{display:inline-block;opacity:0;animation:ldropIn .55s cubic-bezier(.4,0,.2,1) forwards;}
  .ld-c.y{color:var(--Y);}
  .ld-c.o{color:transparent;-webkit-text-stroke:1.5px var(--Y);}
  .ld-bar-wrap{width:240px;height:2px;background:rgba(240,200,69,.1);border-radius:2px;}
  .ld-bar{height:100%;width:0;background:linear-gradient(90deg,var(--Y3),var(--Y),var(--Y2));border-radius:2px;animation:lbarFill 2.3s cubic-bezier(.4,0,.2,1) forwards;}
  .ld-tagline{font-family:var(--FI);font-style:italic;font-size:18px;color:rgba(240,200,69,.4);animation:fadeIn 1s 1.2s forwards;opacity:0;}

  nav{position:fixed;top:0;left:0;right:0;z-index:1000;padding:26px 64px;display:flex;align-items:center;justify-content:space-between;transition:all .45s cubic-bezier(.4,0,.2,1);}
  nav.sc{background:rgba(8,9,48,.97);backdrop-filter:blur(22px);padding:15px 64px;border-bottom:1px solid rgba(240,200,69,.1);box-shadow:0 4px 40px rgba(0,0,0,.4);}
  .nav-logo{font-family:var(--FD);font-size:26px;letter-spacing:.1em;color:var(--Y);display:flex;align-items:center;gap:8px;transition:transform .3s;cursor:pointer;}
  .nav-logo:hover{transform:scale(1.04);}
  .nav-links{display:flex;gap:34px;list-style:none;}
  .nav-links a{color:rgba(240,200,69,.5);font-size:12px;letter-spacing:.15em;text-transform:uppercase;font-weight:500;transition:color .3s;position:relative;}
  .nav-links a::after{content:'';position:absolute;bottom:-5px;left:0;width:0;height:1px;background:var(--Y);transition:width .35s cubic-bezier(.4,0,.2,1);}
  .nav-links a:hover{color:var(--Y);}
  .nav-links a:hover::after{width:100%;}
  .nav-links button{color:rgba(14,16,75,.55);font-size:11px;letter-spacing:.12em;text-transform:uppercase;font-weight:700;transition:color .3s;position:relative;background:none;border:none;cursor:pointer;font-family:var(--FM);padding:0;}
  .nav-links button::after{content:'';position:absolute;bottom:-3px;left:0;width:0;height:1.5px;background:var(--B);transition:width .3s cubic-bezier(.4,0,.2,1);}
  .nav-links button:hover,.nav-links button.active{color:var(--B);}
  .nav-links button:hover::after,.nav-links button.active::after{width:100%;}
  .nav-cta{background:var(--Y);color:var(--B);font-family:var(--FD);font-size:13px;letter-spacing:.12em;text-transform:uppercase;padding:12px 28px;clip-path:polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,0 100%);transition:all .35s;position:relative;overflow:hidden;display:inline-block;cursor:pointer;}
  .nav-cta::before{content:'';position:absolute;inset:0;background:var(--B2);transform:translateX(-105%);transition:transform .35s;}
  .nav-cta:hover::before{transform:translateX(0);}
  .nav-cta:hover{color:var(--Y);}
  .nav-cta span{position:relative;z-index:1;}
  .hburg{display:none;flex-direction:column;gap:5px;cursor:pointer;background:none;border:none;}
  .hburg i{display:block;width:26px;height:2px;background:var(--Y);transition:all .35s;}
  .hburg.open i:nth-child(1){transform:rotate(45deg) translate(5px,5px);}
  .hburg.open i:nth-child(2){opacity:0;}
  .hburg.open i:nth-child(3){transform:rotate(-45deg) translate(5px,-5px);}
  .mob-menu{position:fixed;inset:0;z-index:999;background:var(--B3);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:22px;clip-path:circle(0% at 95% 5%);transition:clip-path .75s cubic-bezier(.4,0,.2,1);}
  .mob-menu.open{clip-path:circle(150% at 95% 5%);}
  .mob-menu button{font-family:var(--FD);font-size:clamp(38px,8vw,60px);color:var(--Y);letter-spacing:.05em;transition:all .3s;background:none;border:none;cursor:pointer;}
  .mob-menu button:hover{color:transparent;-webkit-text-stroke:1.5px var(--Y);}

  .page{min-height:100vh;position:relative;overflow:hidden;display:flex;flex-direction:column;justify-content:center;}
  .page-section{padding:110px 64px;position:relative;}

  #hero{background:var(--B3);}
  .h-grid{position:absolute;inset:0;opacity:.025;background-image:linear-gradient(rgba(240,200,69,1) 1px,transparent 1px),linear-gradient(90deg,rgba(240,200,69,1) 1px,transparent 1px);background-size:80px 80px;}
  .h-glow{position:absolute;right:-80px;top:50%;transform:translateY(-50%);width:900px;height:900px;background:radial-gradient(ellipse,rgba(240,200,69,.07) 0%,transparent 60%);pointer-events:none;animation:glowPulse 7s ease-in-out infinite;}
  .h-orb1{position:absolute;top:-140px;right:-60px;width:500px;height:500px;border-radius:50%;background:rgba(240,200,69,.055);filter:blur(90px);animation:orbF 9s ease-in-out infinite;}
  .h-orb2{position:absolute;bottom:-70px;left:-50px;width:340px;height:340px;border-radius:50%;background:rgba(14,16,75,.6);filter:blur(80px);animation:orbF 12s ease-in-out infinite reverse;}
  .h-side-img{position:absolute;right:4%;top:50%;transform:translateY(-50%);width:390px;height:490px;overflow:hidden;clip-path:polygon(0 0,calc(100% - 26px) 0,100% 26px,100% 100%,0 100%);opacity:0;animation:sideImgIn 1.4s 1.8s cubic-bezier(.34,1.56,.64,1) forwards;}
  .h-side-img img{width:100%;height:100%;object-fit:cover;filter:saturate(.55) contrast(1.1);}
  .h-side-img::before{content:'';position:absolute;inset:0;z-index:1;background:linear-gradient(135deg,rgba(240,200,69,.14),transparent 50%),linear-gradient(to left,transparent 55%,rgba(8,9,48,.9));}
  .h-side-tag{position:absolute;bottom:0;left:0;right:0;background:linear-gradient(to top,rgba(8,9,48,.95),transparent);padding:26px 20px 18px;z-index:2;}
  .h-side-tag span{font-size:9px;letter-spacing:.24em;text-transform:uppercase;color:rgba(240,200,69,.7);background:rgba(240,200,69,.1);border:1px solid rgba(240,200,69,.35);padding:5px 12px;display:inline-block;}
  .h-chips{position:absolute;right:4%;bottom:8%;display:flex;gap:3px;opacity:0;animation:slideUp .9s 2.4s cubic-bezier(.4,0,.2,1) forwards;z-index:3;}
  .h-chip{background:rgba(8,9,48,.92);border:1px solid rgba(240,200,69,.18);padding:14px 20px;text-align:center;backdrop-filter:blur(14px);}
  .h-chip-n{font-family:var(--FD);font-size:28px;color:var(--Y);line-height:1;}
  .h-chip-l{font-size:9px;letter-spacing:.1em;text-transform:uppercase;color:rgba(240,200,69,.4);margin-top:3px;}
  .hero-eyebrow{display:flex;align-items:center;gap:14px;margin-bottom:20px;opacity:0;animation:slideUp .8s .6s cubic-bezier(.4,0,.2,1) forwards;}
  .hero-eyebrow::before{content:'';width:30px;height:1px;background:rgba(240,200,69,.45);}
  .hero-eyebrow span{font-size:11px;letter-spacing:.3em;text-transform:uppercase;color:rgba(240,200,69,.55);font-weight:500;}
  .hero-headline{font-family:var(--FD);font-weight:400;font-size:clamp(52px,9.5vw,138px);line-height:.88;letter-spacing:.02em;opacity:0;animation:slideUp .9s .75s cubic-bezier(.4,0,.2,1) forwards;}
  .hl-line{display:block;}
  .hl-solid{color:var(--Y);}
  .hl-stroke{color:transparent;-webkit-text-stroke:2px rgba(240,200,69,.4);}
  .hl-accent{color:var(--Y);font-family:var(--FI);font-style:italic;font-size:.65em;display:block;margin-top:4px;}
  .hero-sub{font-family:var(--FI);font-style:italic;font-size:clamp(16px,2vw,24px);color:rgba(240,200,69,.5);margin-top:16px;opacity:0;animation:slideUp .9s .95s cubic-bezier(.4,0,.2,1) forwards;}
  .hero-sub em{color:var(--Y);}
  .hero-actions{margin-top:44px;display:flex;gap:18px;align-items:center;flex-wrap:wrap;opacity:0;animation:slideUp .9s 1.15s cubic-bezier(.4,0,.2,1) forwards;}
  .btn-p{background:var(--Y);color:var(--B);font-family:var(--FD);font-size:13px;letter-spacing:.12em;text-transform:uppercase;padding:17px 44px;border:none;cursor:pointer;display:inline-flex;align-items:center;gap:10px;clip-path:polygon(0 0,calc(100% - 12px) 0,100% 12px,100% 100%,0 100%);transition:all .35s;position:relative;overflow:hidden;}
  .btn-p::after{content:'';position:absolute;inset:0;background:var(--B3);transform:translateX(-105%);transition:transform .35s;}
  .btn-p:hover::after{transform:translateX(0);}
  .btn-p:hover{transform:translateY(-3px);}
  .btn-p>*{position:relative;z-index:1;}
  .btn-p:hover span{color:var(--Y);}
  .btn-g{color:var(--Y);font-size:12px;letter-spacing:.1em;text-transform:uppercase;display:inline-flex;align-items:center;gap:10px;font-weight:500;border-bottom:1px solid rgba(240,200,69,.28);padding-bottom:3px;transition:all .3s;opacity:.7;cursor:pointer;background:none;border-top:none;border-left:none;border-right:none;}
  .btn-g:hover{opacity:1;gap:18px;border-color:var(--Y);}
  .hero-scroll{position:absolute;bottom:34px;left:64px;display:flex;flex-direction:column;align-items:center;gap:8px;opacity:0;animation:fadeIn 1s 2s forwards;}
  .h-scl{width:1px;height:62px;background:linear-gradient(to bottom,transparent,var(--Y));animation:scrollAnim 2.2s ease-in-out infinite;}
  .hero-scroll span{font-size:9px;letter-spacing:.22em;text-transform:uppercase;color:rgba(240,200,69,.3);writing-mode:vertical-rl;}

  .mq{background:var(--Y);padding:15px 0;overflow:hidden;}
  .mq-t{display:flex;width:max-content;animation:mqScroll 24s linear infinite;}
  .mq-t:hover{animation-play-state:paused;}
  .mq-item{font-family:var(--FD);font-size:19px;letter-spacing:.07em;color:var(--B);padding:0 30px;white-space:nowrap;display:flex;align-items:center;gap:30px;}
  .mq-dot{width:5px;height:5px;border-radius:50%;background:rgba(14,16,75,.28);}

  .reveal{opacity:0;transform:translateY(55px);transition:opacity .9s cubic-bezier(.4,0,.2,1),transform .9s cubic-bezier(.4,0,.2,1);}
  .reveal.v{opacity:1;transform:none;}
  .rev-l{opacity:0;transform:translateX(-55px);transition:opacity .9s cubic-bezier(.4,0,.2,1),transform .9s cubic-bezier(.4,0,.2,1);}
  .rev-l.v{opacity:1;transform:none;}
  .rev-r{opacity:0;transform:translateX(55px);transition:opacity .9s cubic-bezier(.4,0,.2,1),transform .9s cubic-bezier(.4,0,.2,1);}
  .rev-r.v{opacity:1;transform:none;}

  .sec-lbl{display:flex;align-items:center;gap:12px;margin-bottom:14px;}
  .sec-lbl::before{content:'';width:26px;height:1px;}
  .on-navy .sec-lbl{color:rgba(240,200,69,.58);}
  .on-navy .sec-lbl::before{background:rgba(240,200,69,.45);}
  .on-navy .sec-h{color:var(--Y);}
  .on-navy .sec-h .out{color:transparent;-webkit-text-stroke:1px rgba(240,200,69,.28);}
  .on-yellow .sec-lbl{color:rgba(14,16,75,.6);}
  .on-yellow .sec-lbl::before{background:rgba(14,16,75,.45);}
  .on-yellow .sec-h{color:var(--B);}
  .on-yellow .sec-h .out{color:transparent;-webkit-text-stroke:1px rgba(14,16,75,.22);}
  .sec-lbl span{font-size:11px;letter-spacing:.3em;text-transform:uppercase;font-weight:500;}
  .sec-h{font-family:var(--FD);font-size:clamp(52px,7.5vw,108px);line-height:.87;letter-spacing:.02em;}

  /* ── sec / sec-title / sec-label / sec-sub (used in new pages) ── */
  .sec{padding:100px 64px;position:relative;}
  .sec-label{display:inline-flex;align-items:center;gap:10px;margin-bottom:12px;}
  .sec-label span{font-size:10px;font-weight:700;letter-spacing:.26em;text-transform:uppercase;color:rgba(240,200,69,.5);border:1px solid rgba(240,200,69,.18);padding:5px 14px;}
  .sec-title{font-family:var(--FM);font-weight:900;font-size:clamp(42px,6vw,90px);color:var(--Y);line-height:.9;letter-spacing:.02em;}
  .sec-title .out{color:transparent;-webkit-text-stroke:1.5px rgba(240,200,69,.28);}
  .sec-sub{font-size:14px;color:rgba(240,200,69,.45);line-height:1.75;margin-top:10px;}
  .btn-out{background:none;border:1.5px solid rgba(240,200,69,.4);color:var(--Y);font-family:var(--FM);font-size:12px;letter-spacing:.12em;text-transform:uppercase;padding:13px 28px;cursor:pointer;display:inline-flex;align-items:center;gap:10px;transition:all .3s;}
  .btn-out:hover{background:var(--Y);color:var(--B);}

  #about{background:var(--Y);}
  #about::before{content:'';position:absolute;inset:0;background-image:radial-gradient(rgba(14,16,75,.04) 1px,transparent 1px);background-size:28px 28px;pointer-events:none;}
  .ab-grid{display:grid;grid-template-columns:1fr 1fr;gap:88px;align-items:center;}
  .ab-vis{position:relative;height:570px;}
  .ab-img-a{position:absolute;top:0;left:0;right:54px;height:290px;overflow:hidden;clip-path:polygon(0 0,calc(100% - 15px) 0,100% 15px,100% 100%,0 100%);}
  .ab-img-a img{width:100%;height:100%;object-fit:cover;filter:saturate(.72) contrast(1.1);transition:transform .7s cubic-bezier(.4,0,.2,1);}
  .ab-img-a:hover img{transform:scale(1.06);}
  .ab-img-a::after{content:'';position:absolute;inset:0;background:linear-gradient(to bottom,transparent 40%,rgba(14,16,75,.6));pointer-events:none;}
  .ab-img-b{position:absolute;bottom:0;right:0;left:54px;height:246px;overflow:hidden;clip-path:polygon(0 0,calc(100% - 15px) 0,100% 15px,100% 100%,0 100%);}
  .ab-img-b img{width:100%;height:100%;object-fit:cover;filter:saturate(.5) contrast(1.15);transition:transform .7s cubic-bezier(.4,0,.2,1);}
  .ab-img-b:hover img{transform:scale(1.06);}
  .ab-stat-a{position:absolute;top:14px;left:14px;background:var(--B);padding:20px 24px;z-index:5;}
  .ab-stat-b{position:absolute;bottom:14px;right:68px;background:var(--B3);padding:20px 24px;z-index:5;}
  .ab-stat-n{font-family:var(--FD);font-size:58px;color:var(--Y);line-height:1;}
  .ab-stat-l{font-size:10px;letter-spacing:.1em;text-transform:uppercase;color:rgba(240,200,69,.4);margin-top:2px;}
  .ab-badge{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:96px;height:96px;background:var(--Y);border:3.5px solid rgba(14,16,75,.25);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:42px;z-index:10;box-shadow:0 0 0 14px rgba(14,16,75,.15);}
  .ab-badge::before{content:'';position:absolute;inset:-11px;border-radius:50%;border:1px dashed rgba(14,16,75,.22);animation:rotateSpin 22s linear infinite;}
  .ab-txt p{font-size:15px;line-height:1.85;color:rgba(14,16,75,.7);margin-bottom:15px;}
  .ab-txt strong{color:var(--B);font-weight:600;}
  .pills{display:flex;gap:9px;flex-wrap:wrap;margin-top:24px;}
  .pill{border:1.5px solid var(--B);padding:9px 17px;font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:var(--B);transition:all .3s;cursor:pointer;font-weight:500;background:none;}
  .pill:hover{background:var(--B);color:var(--Y);}

  #brand-story{background:var(--B3);}
  .bs-inspo{background:var(--Y);padding:54px 58px;clip-path:polygon(0 0,calc(100% - 24px) 0,100% 24px,100% 100%,0 100%);margin-bottom:84px;position:relative;overflow:hidden;}
  .bs-inspo-inner{display:grid;grid-template-columns:auto 1fr;gap:42px;align-items:center;position:relative;z-index:1;}
  .bs-inspo-icon{font-size:clamp(60px,8vw,90px);line-height:1;}
  .bs-inspo-title{font-family:var(--FD);font-size:clamp(26px,4vw,50px);color:var(--B);line-height:.88;margin-bottom:15px;}
  .bs-1945{position:absolute;top:-30px;right:14px;font-family:var(--FD);font-size:clamp(90px,15vw,190px);color:rgba(14,16,75,.055);user-select:none;pointer-events:none;line-height:1;}
  .bs-scoop{background:var(--B4);padding:46px 34px;border:1px solid rgba(240,200,69,.07);position:relative;overflow:hidden;transition:all .45s cubic-bezier(.4,0,.2,1);cursor:default;}
  .bs-scoop:hover{background:var(--Y);transform:translateY(-10px);}
  .bs-scoop:hover *{color:var(--B)!important;-webkit-text-stroke:0!important;}
  .bs-scoop:hover .bs-icon-w{background:rgba(14,16,75,.1)!important;border-color:rgba(14,16,75,.2)!important;}
  .bs-sc-bg{position:absolute;top:-8px;right:-8px;font-size:120px;opacity:.04;line-height:1;pointer-events:none;}
  .bs-icon-w{width:54px;height:54px;background:rgba(240,200,69,.09);border:1px solid rgba(240,200,69,.2);display:flex;align-items:center;justify-content:center;font-size:26px;margin-bottom:20px;}
  .bs-sc-n{font-family:var(--FD);font-size:11px;letter-spacing:.22em;color:rgba(240,200,69,.28);margin-bottom:8px;}
  .bs-sc-t{font-family:var(--FD);font-size:clamp(20px,1.8vw,26px);color:var(--Y);margin-bottom:12px;line-height:1.1;}
  .bs-sc-d{font-size:13px;line-height:1.8;color:rgba(240,200,69,.42);margin-bottom:18px;}
  .bs-sc-a{display:flex;align-items:center;gap:8px;font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:rgba(240,200,69,.4);font-weight:600;}
  .bs-p-item{border-left:3px solid var(--Y);background:rgba(240,200,69,.04);padding:22px 24px;display:flex;align-items:flex-start;gap:16px;transition:background .3s;margin-bottom:16px;}
  .bs-p-item:hover{background:rgba(240,200,69,.09);}
  .bs-p-icon{font-size:30px;flex-shrink:0;line-height:1;}
  .bs-p-title{font-family:var(--FD);font-size:18px;color:var(--Y);margin-bottom:5px;}
  .bs-p-txt{font-size:13px;line-height:1.75;color:rgba(240,200,69,.42);}

  #services{background:var(--B2);}
  .svc-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:2px;margin-top:52px;}
  .scard{background:var(--B4);padding:44px 36px;border:1px solid rgba(240,200,69,.07);position:relative;overflow:hidden;cursor:pointer;transition:all .45s cubic-bezier(.4,0,.2,1);}
  .scard::before{content:'';position:absolute;bottom:0;left:0;right:0;height:0;background:var(--Y);transition:height .45s cubic-bezier(.4,0,.2,1);z-index:0;}
  .scard:hover::before{height:100%;}
  .scard>*{position:relative;z-index:1;}
  .scard:hover .sn,.scard:hover .si,.scard:hover .st,.scard:hover .sd,.scard:hover .sa{color:var(--B)!important;}
  .sn{font-family:var(--FD);font-size:11px;letter-spacing:.2em;color:rgba(240,200,69,.25);margin-bottom:20px;font-weight:400;}
  .si{font-size:32px;display:block;margin-bottom:14px;transition:transform .4s;}
  .scard:hover .si{transform:scale(1.22) rotate(-8deg);}
  .st{font-family:var(--FD);font-size:22px;color:var(--Y);margin-bottom:10px;}
  .sd{font-size:13px;line-height:1.72;color:rgba(240,200,69,.38);}
  .sa{display:inline-flex;align-items:center;gap:8px;margin-top:20px;font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:rgba(240,200,69,.55);font-weight:600;opacity:.8;}

  /* ── svc-mini (used in HomePage ServicesMini) ── */
  .svc-mini{display:grid;grid-template-columns:repeat(3,1fr);gap:2px;margin-top:32px;}
  .svc-mini-card{display:flex;align-items:center;gap:14px;padding:18px 20px;background:rgba(240,200,69,.04);border:1px solid rgba(240,200,69,.07);cursor:pointer;transition:all .3s;}
  .svc-mini-card:hover{background:rgba(240,200,69,.1);border-color:rgba(240,200,69,.2);}
  .svc-mini-icon{font-size:22px;}
  .svc-mini-name{font-family:var(--FM);font-size:13px;color:var(--Y);font-weight:700;flex:1;}
  .svc-mini-arrow{color:rgba(240,200,69,.35);font-size:14px;transition:transform .3s;}
  .svc-mini-card:hover .svc-mini-arrow{transform:translateX(4px);color:var(--Y);}

  #stats{background:var(--Y);padding:80px 64px;}
  .stats-grid{display:grid;grid-template-columns:repeat(4,1fr);}
  .s-item{padding:38px 28px;border-right:1.5px solid rgba(14,16,75,.14);text-align:center;position:relative;overflow:hidden;}
  .s-item:last-child{border-right:none;}
  .s-num{font-family:var(--FD);font-size:82px;color:var(--B);line-height:1;}
  .s-lbl{font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:rgba(14,16,75,.45);margin-top:5px;font-weight:500;}

  #imgband{background:var(--B);padding:0;overflow:hidden;display:flex;height:290px;}
  .ibt{display:flex;width:max-content;animation:ibScroll 30s linear infinite;height:100%;}
  .ibt:hover{animation-play-state:paused;}
  .ib-item{width:275px;height:100%;flex-shrink:0;overflow:hidden;position:relative;border-right:2px solid var(--B);}
  .ib-item img{width:100%;height:100%;object-fit:cover;filter:saturate(.3) contrast(1.25);transition:filter .5s;}
  .ib-item:hover img{filter:saturate(1) contrast(1);}
  .ib-item::after{content:'';position:absolute;inset:0;background:rgba(8,9,48,.42);pointer-events:none;transition:background .5s;}
  .ib-item:hover::after{background:rgba(8,9,48,.1);}
  .ib-tag{position:absolute;bottom:14px;left:14px;font-size:9px;font-weight:600;letter-spacing:.2em;text-transform:uppercase;color:rgba(240,200,69,.65);background:rgba(8,9,48,.72);padding:4px 10px;}

  #process{background:var(--B);}
  .proc-steps{display:grid;grid-template-columns:repeat(4,1fr);border:1px solid rgba(240,200,69,.08);margin-top:58px;}
  .pstep{padding:42px 28px;border-right:1px solid rgba(240,200,69,.08);position:relative;overflow:hidden;transition:background .4s;}
  .pstep:last-child{border-right:none;}
  .pstep::after{content:'';position:absolute;bottom:0;left:0;right:0;height:3px;background:var(--Y);transform:scaleX(0);transform-origin:left;transition:transform .55s cubic-bezier(.4,0,.2,1);}
  .pstep:hover::after{transform:scaleX(1);}
  .pstep:hover{background:rgba(240,200,69,.03);}
  .ps-img{width:100%;height:128px;overflow:hidden;margin-bottom:22px;position:relative;clip-path:polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,0 100%);}
  .ps-img img{width:100%;height:100%;object-fit:cover;filter:saturate(.18) contrast(1.35);transition:filter .5s,transform .5s;}
  .pstep:hover .ps-img img{filter:saturate(.7) contrast(1.1);transform:scale(1.06);}
  .ps-img::after{content:'';position:absolute;inset:0;background:linear-gradient(to bottom,transparent 40%,var(--B));pointer-events:none;}
  .ps-n{font-family:var(--FD);font-size:82px;color:rgba(240,200,69,.04);position:absolute;top:8px;right:12px;line-height:1;}
  .pstep h3{font-family:var(--FD);font-size:22px;color:var(--Y);margin-bottom:10px;}
  .pstep p{font-size:13px;line-height:1.75;color:rgba(240,200,69,.38);}

  /* ── proc-steps-short (HomePage ProcessShort) ── */
  .proc-steps-short{display:grid;grid-template-columns:repeat(4,1fr);gap:2px;margin-top:40px;}
  .pstep-s{padding:32px 24px;background:rgba(240,200,69,.03);border:1px solid rgba(240,200,69,.07);transition:background .3s;}
  .pstep-s:hover{background:rgba(240,200,69,.07);}
  .ps-num{font-family:var(--FM);font-size:48px;color:rgba(240,200,69,.1);line-height:1;margin-bottom:12px;}
  .pstep-s h3{font-family:var(--FM);font-size:18px;color:var(--Y);margin-bottom:8px;}
  .pstep-s p{font-size:13px;line-height:1.75;color:rgba(240,200,69,.4);}

  #work{background:var(--Y);}
  .work-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:3px;margin-top:52px;}
  .wi{position:relative;overflow:hidden;cursor:pointer;aspect-ratio:16/10;background:var(--B);}
  .wi.feat{grid-column:span 2;aspect-ratio:21/7;}
  .wi-bg{position:absolute;inset:0;transition:transform .85s cubic-bezier(.4,0,.2,1);}
  .wi:hover .wi-bg{transform:scale(1.08);}
  .wi-bg img{width:100%;height:100%;object-fit:cover;filter:saturate(.35) contrast(1.1);transition:filter .5s;}
  .wi:hover .wi-bg img{filter:saturate(.85) contrast(1);}
  .wi-ov{position:absolute;inset:0;background:linear-gradient(to top,rgba(8,9,48,.96) 0%,transparent 55%);display:flex;flex-direction:column;justify-content:flex-end;padding:34px;}
  .wi-tag{font-size:9px;letter-spacing:.2em;text-transform:uppercase;color:var(--Y);background:rgba(240,200,69,.1);border:1px solid rgba(240,200,69,.35);padding:4px 11px;border-radius:20px;display:inline-block;margin-bottom:9px;width:fit-content;}
  .wi-title{font-family:var(--FD);font-size:clamp(20px,2.8vw,36px);color:var(--Y);margin-bottom:5px;transform:translateY(8px);transition:transform .4s;}
  .wi:hover .wi-title{transform:none;}
  .wi-meta{font-size:11px;color:rgba(240,200,69,.38);}
  .wi-arr{position:absolute;top:20px;right:20px;width:44px;height:44px;background:var(--Y);display:flex;align-items:center;justify-content:center;font-size:17px;color:var(--B);transform:scale(0) rotate(-45deg);transition:transform .4s cubic-bezier(.34,1.56,.64,1);}
  .wi:hover .wi-arr{transform:scale(1) rotate(0);}

  #team{background:var(--B3);}
  .team-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:3px;margin-top:52px;}
  .tm-card{position:relative;overflow:hidden;cursor:pointer;aspect-ratio:3/4;}
  .tm-img{width:100%;height:100%;object-fit:cover;filter:saturate(.18) contrast(1.2);transition:filter .6s,transform .6s;}
  .tm-card:hover .tm-img{filter:saturate(.85);transform:scale(1.07);}
  .tm-card::before{content:'';position:absolute;inset:0;background:linear-gradient(to top,rgba(8,9,48,.94),transparent 50%);z-index:1;}
  .tm-info{position:absolute;bottom:0;left:0;right:0;z-index:2;padding:22px;}
  .tm-nm{font-family:var(--FD);font-size:22px;color:var(--Y);}
  .tm-rl{font-size:11px;letter-spacing:.1em;color:rgba(240,200,69,.42);text-transform:uppercase;margin-top:2px;}
  .tm-lnks{display:flex;gap:8px;margin-top:11px;transform:translateY(14px);opacity:0;transition:all .4s;}
  .tm-card:hover .tm-lnks{transform:none;opacity:1;}
  .tm-lnk{width:31px;height:31px;background:rgba(240,200,69,.12);border:1px solid rgba(240,200,69,.28);display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:var(--Y);transition:all .3s;}
  .tm-lnk:hover{background:var(--Y);color:var(--B);}

  #reviews{background:var(--B2);}
  .rev-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:2px;margin-top:52px;}
  .rcard{background:var(--B4);border-top:3px solid transparent;padding:36px 30px;position:relative;overflow:hidden;transition:border-color .4s,transform .4s;}
  .rcard::before{content:'"';font-family:var(--FI);font-size:130px;color:rgba(240,200,69,.05);position:absolute;top:-24px;left:14px;line-height:1;}
  .rcard:hover{border-top-color:var(--Y);transform:translateY(-8px);}
  .r-stars{color:var(--Y);font-size:14px;letter-spacing:2px;margin-bottom:14px;}
  .r-txt{font-family:var(--FI);font-style:italic;font-size:14px;line-height:1.88;color:rgba(240,200,69,.5);margin-bottom:20px;}
  .r-auth{display:flex;align-items:center;gap:12px;border-top:1px solid rgba(240,200,69,.07);padding-top:16px;}
  .r-av{width:44px;height:44px;border-radius:50%;overflow:hidden;border:2px solid rgba(240,200,69,.28);flex-shrink:0;}
  .r-av img{width:100%;height:100%;object-fit:cover;filter:saturate(.35);}
  .r-nm{font-weight:600;font-size:13px;color:var(--Y);}
  .r-rl{font-size:11px;color:rgba(240,200,69,.36);}

  #clients{background:var(--Y);padding:74px 64px;}
  .cl-lbl{text-align:center;font-size:10px;letter-spacing:.3em;text-transform:uppercase;color:rgba(14,16,75,.4);margin-bottom:42px;font-weight:500;}
  .cl-row{display:flex;justify-content:center;align-items:center;gap:62px;flex-wrap:wrap;}
  .clogo{font-family:var(--FD);font-size:21px;letter-spacing:.1em;color:rgba(14,16,75,.28);transition:color .3s,transform .3s;cursor:pointer;}
  .clogo:hover{color:var(--B);transform:translateY(-4px);}

  #faq{background:var(--B);}
  .faq-grid{display:grid;grid-template-columns:1fr 1.2fr;gap:84px;align-items:start;margin-top:52px;}
  .faq-list{display:flex;flex-direction:column;gap:2px;}
  .faq-item{background:var(--B2);border:1px solid rgba(240,200,69,.07);border-left:3px solid transparent;transition:border-color .35s,background .35s;overflow:hidden;}
  .faq-item.open{border-left-color:var(--Y);background:var(--B4);}
  .faq-q{display:flex;align-items:center;justify-content:space-between;gap:16px;padding:20px 24px;cursor:pointer;user-select:none;}
  .faq-q-txt{font-family:var(--FD);font-size:17px;color:var(--Y);letter-spacing:.02em;}
  .faq-ico{width:32px;height:32px;background:rgba(240,200,69,.08);border:1px solid rgba(240,200,69,.18);display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:16px;color:var(--Y);transition:all .35s;}
  .faq-item.open .faq-ico{background:var(--Y);color:var(--B);transform:rotate(45deg);}
  .faq-a{overflow:hidden;transition:max-height .45s cubic-bezier(.4,0,.2,1);padding:0 24px;max-height:0;}
  .faq-a-inner{font-size:14px;line-height:1.82;color:rgba(240,200,69,.5);padding-bottom:20px;}

  #enquire{background:var(--B3);overflow:hidden;}
  .eq-grid{display:grid;grid-template-columns:1fr 1fr;gap:76px;align-items:start;}
  .eq-form{background:var(--Y);padding:46px;clip-path:polygon(0 0,calc(100% - 22px) 0,100% 22px,100% 100%,0 100%);}
  .fg{margin-bottom:18px;}
  .fg label{display:block;font-size:10px;letter-spacing:.2em;text-transform:uppercase;color:rgba(14,16,75,.5);margin-bottom:7px;font-weight:500;}
  .fg input,.fg textarea,.fg select{width:100%;background:rgba(14,16,75,.06);border:1.5px solid rgba(14,16,75,.18);color:var(--B);padding:13px 16px;font-family:var(--FB);font-size:14px;outline:none;transition:border-color .3s;}
  .fg input::placeholder,.fg textarea::placeholder{color:rgba(14,16,75,.3);}
  .fg input:focus,.fg textarea:focus,.fg select:focus{border-color:var(--B);}
  .fg textarea{height:106px;resize:vertical;}
  .frow{display:grid;grid-template-columns:1fr 1fr;gap:14px;}
  .btn-sub{width:100%;background:var(--B);color:var(--Y);font-family:var(--FD);font-size:13px;letter-spacing:.12em;text-transform:uppercase;padding:17px;border:none;cursor:pointer;clip-path:polygon(0 0,calc(100% - 12px) 0,100% 12px,100% 100%,0 100%);display:flex;align-items:center;justify-content:center;gap:10px;position:relative;overflow:hidden;transition:all .35s;}
  .btn-sub::after{content:'';position:absolute;inset:0;background:var(--B3);transform:translateX(-105%);transition:transform .35s;}
  .btn-sub:hover::after{transform:translateX(0);}
  .btn-sub>*{position:relative;z-index:1;}

  /* ── eq-det (ContactPage) ── */
  .eq-det{display:flex;flex-direction:column;gap:12px;margin-top:24px;}
  .eq-di{font-size:13px;color:rgba(240,200,69,.55);display:flex;align-items:center;gap:10px;}
  .eq-di a{color:rgba(240,200,69,.55);transition:color .2s;}
  .eq-di a:hover{color:var(--Y);}
  .eq-img-wrap{margin-top:24px;overflow:hidden;height:200px;clip-path:polygon(0 0,calc(100% - 14px) 0,100% 14px,100% 100%,0 100%);}
  .eq-img-wrap img{width:100%;height:100%;object-fit:cover;filter:saturate(.4) contrast(1.1);}
  .eq-bg-txt{position:absolute;bottom:-20px;right:-10px;font-family:var(--FM);font-weight:900;font-size:clamp(80px,12vw,160px);color:rgba(240,200,69,.025);pointer-events:none;user-select:none;line-height:1;}

  /* ── wt (WorkTeaser) ── */
  .wt-bg{background:var(--B2);}
  .wt-inner{display:grid;grid-template-columns:repeat(4,1fr);gap:2px;margin-top:32px;}
  .wt-kpi{background:rgba(240,200,69,.04);border:1px solid rgba(240,200,69,.07);padding:28px 20px;text-align:center;transition:background .3s;}
  .wt-kpi:hover{background:rgba(240,200,69,.08);}
  .wt-kpi-icon{font-size:28px;display:block;margin-bottom:10px;}
  .wt-kpi-tag{font-size:9px;letter-spacing:.16em;text-transform:uppercase;color:rgba(240,200,69,.35);margin-bottom:8px;}
  .wt-kpi-num{font-family:var(--FM);font-size:42px;color:var(--Y);line-height:1;margin-bottom:8px;}
  .wt-kpi-desc{font-size:12px;color:rgba(240,200,69,.38);line-height:1.6;}
  .wt-quote{margin-top:28px;border-left:3px solid var(--Y);background:rgba(240,200,69,.04);padding:22px 24px;}
  .wt-quote-txt{font-family:var(--FI);font-style:italic;font-size:15px;color:rgba(240,200,69,.6);line-height:1.8;margin-bottom:8px;}
  .wt-quote-by{font-size:11px;color:rgba(240,200,69,.35);letter-spacing:.08em;}
  .wt-cta-row{display:flex;gap:12px;margin-top:20px;flex-wrap:wrap;}

  /* ── about-bg, bs-bg, svc-bg, process-bg, contact-bg ── */
  .about-bg{background:var(--Y);}
  .bs-bg{background:var(--B3);}
  .svc-bg{background:var(--B2);}
  .process-bg{background:var(--B);}
  .contact-bg{background:var(--B3);}
  .on-navy{background:transparent;}
  .on-yellow{background:transparent;}

  /* ── ripple ── */
  .ripple{position:absolute;border-radius:50%;background:rgba(255,255,255,.18);transform:scale(0);animation:rippleA .62s linear;pointer-events:none;}

  /* ── shimmer ── */
  .shimmer{position:relative;overflow:hidden;}
  .shimmer::after{content:'';position:absolute;inset:0;background:linear-gradient(90deg,transparent 0%,rgba(240,200,69,.06) 50%,transparent 100%);transform:translateX(-100%);animation:shimmerA 2.2s infinite;}
  @keyframes shimmerA{to{transform:translateX(100%);}}

  /* ── hero wrap / canvas / slides ── */
  .hero-wrap{position:relative;min-height:100vh;overflow:hidden;display:flex;align-items:center;}
  .hero-slide{position:absolute;inset:0;opacity:0;transition:opacity 1.2s ease;}
  .hero-slide.active{opacity:1;}
  .hs-bg{width:100%;height:100%;object-fit:cover;filter:saturate(.3) contrast(1.1);}
  .hs-ov{position:absolute;inset:0;background:linear-gradient(135deg,rgba(8,9,48,.92) 0%,rgba(8,9,48,.7) 60%,rgba(8,9,48,.5) 100%);}
  .hero-canvas{position:absolute;inset:0;pointer-events:none;}
  .hero-content-wrap{position:relative;z-index:10;padding:0 64px;width:100%;max-width:900px;}
  .hero-content{padding-top:80px;}
  .slide-line{opacity:0;animation:slideUp .9s cubic-bezier(.4,0,.2,1) forwards;}
  .stroke-txt{color:transparent;-webkit-text-stroke:2px rgba(240,200,69,.4);}
  .hero-stats-row{display:grid;grid-template-columns:repeat(4,1fr);gap:2px;margin-top:52px;border-top:1px solid rgba(240,200,69,.1);padding-top:24px;}
  .hs-stat{padding:16px 0;}
  .hs-stat-n{font-family:var(--FD);font-size:32px;color:var(--Y);line-height:1;}
  .hs-stat-l{font-size:9px;letter-spacing:.14em;text-transform:uppercase;color:rgba(240,200,69,.38);margin-top:3px;}
  .slider-nav{position:absolute;bottom:34px;right:64px;display:flex;gap:8px;z-index:10;}
  .sn-dot{width:28px;height:3px;background:rgba(240,200,69,.25);border:none;cursor:pointer;transition:all .3s;}
  .sn-dot.active{background:var(--Y);width:44px;}
  .slider-arrows{position:absolute;bottom:28px;right:64px;display:none;}
  .sl-arr{background:none;border:1px solid rgba(240,200,69,.25);color:rgba(240,200,69,.5);width:38px;height:38px;cursor:pointer;font-size:16px;transition:all .3s;}
  .sl-arr:hover{background:var(--Y);color:var(--B);border-color:var(--Y);}
  .h-deco{position:absolute;pointer-events:none;}
  .h-deco1{top:18%;right:18%;}
  .h-deco2{bottom:22%;right:28%;}
  .h-deco3{top:30%;right:38%;}

  footer{background:var(--Y);padding:72px 64px 36px;}
  .ft-grid{display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:56px;padding-bottom:50px;border-bottom:1.5px solid rgba(14,16,75,.12);margin-bottom:30px;}
  .ft-brand .logo{font-family:var(--FD);font-size:34px;letter-spacing:.06em;color:var(--B);display:block;margin-bottom:12px;}
  .ft-brand p{font-size:13px;line-height:1.75;color:rgba(14,16,75,.52);max-width:250px;}
  .ft-soc{display:flex;gap:10px;margin-top:22px;}
  .ft-sl{width:37px;height:37px;border:1.5px solid var(--B);display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;color:var(--B);transition:all .3s;cursor:pointer;background:none;}
  .ft-sl:hover{background:var(--B);color:var(--Y);transform:translateY(-3px);}
  .ft-col h4{font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:var(--B);margin-bottom:18px;font-weight:600;opacity:.55;}
  .ft-col ul{list-style:none;}
  .ft-col ul li{margin-bottom:9px;}
  .ft-col ul li a{color:rgba(14,16,75,.5);font-size:13px;transition:color .3s;}
  .ft-col ul li a:hover{color:var(--B);}
  .ft-bot{display:flex;align-items:center;justify-content:space-between;font-size:12px;color:rgba(14,16,75,.4);}
  .ft-bot strong{color:var(--B);font-weight:600;}

  .svc-ov{position:fixed;inset:0;background:rgba(8,9,48,.96);z-index:8000;display:flex;align-items:center;justify-content:center;opacity:0;pointer-events:none;transition:opacity .35s;backdrop-filter:blur(10px);}
  .svc-ov.open{opacity:1;pointer-events:all;}
  .svc-modal{background:var(--B4);border:1px solid rgba(240,200,69,.18);max-width:700px;width:90%;max-height:88vh;overflow-y:auto;clip-path:polygon(0 0,calc(100% - 28px) 0,100% 28px,100% 100%,0 100%);transform:translateY(30px) scale(.96);transition:transform .4s cubic-bezier(.34,1.56,.64,1);scrollbar-width:thin;}
  .svc-ov.open .svc-modal{transform:none;}
  .sm-head{background:var(--Y);padding:32px 36px;display:flex;align-items:center;justify-content:space-between;gap:18px;position:sticky;top:0;z-index:2;}
  .sm-icon{font-size:46px;line-height:1;}
  .sm-title{font-family:var(--FD);font-size:clamp(22px,3vw,36px);color:var(--B);}
  .sm-num{font-family:var(--FD);font-size:12px;letter-spacing:.2em;color:rgba(14,16,75,.38);margin-bottom:4px;}
  .sm-close{width:40px;height:40px;background:var(--B);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:18px;color:var(--Y);flex-shrink:0;transition:all .3s;}
  .sm-close:hover{background:var(--B3);}
  .sm-body{padding:36px;}
  .sm-desc{font-size:15px;line-height:1.9;color:rgba(240,200,69,.62);margin-bottom:28px;}
  .sm-feats{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:28px;}
  .sm-feat{display:flex;align-items:flex-start;gap:10px;background:rgba(240,200,69,.04);border:1px solid rgba(240,200,69,.09);padding:15px;}
  .sm-feat-icon{color:var(--Y);font-size:17px;flex-shrink:0;}
  .sm-feat-txt strong{color:var(--Y);display:block;font-size:13px;font-weight:600;margin-bottom:2px;}
  .sm-feat-txt span{font-size:12.5px;line-height:1.6;color:rgba(240,200,69,.5);}
  .sm-results{background:var(--Y);padding:24px 28px;display:flex;gap:28px;flex-wrap:wrap;margin-bottom:28px;}
  .sm-r-n{font-family:var(--FD);font-size:40px;color:var(--B);line-height:1;}
  .sm-r-l{font-size:10px;letter-spacing:.08em;text-transform:uppercase;color:rgba(14,16,75,.5);margin-top:3px;}
  .sm-cta{display:inline-flex;align-items:center;gap:10px;background:var(--Y);color:var(--B);font-family:var(--FD);font-size:13px;letter-spacing:.1em;text-transform:uppercase;padding:15px 34px;border:none;cursor:pointer;clip-path:polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,0 100%);transition:all .3s;}
  .sm-cta:hover{background:var(--B3);color:var(--Y);transform:translateY(-2px);}

  .camp-ov{position:fixed;inset:0;background:rgba(8,9,48,.97);z-index:8000;display:flex;align-items:center;justify-content:center;opacity:0;pointer-events:none;transition:opacity .35s;backdrop-filter:blur(12px);}
  .camp-ov.open{opacity:1;pointer-events:all;}
  .camp-modal{background:var(--B4);border:1px solid rgba(240,200,69,.16);max-width:820px;width:92%;max-height:88vh;overflow-y:auto;clip-path:polygon(0 0,calc(100% - 30px) 0,100% 30px,100% 100%,0 100%);transform:translateY(40px) scale(.95);transition:transform .45s cubic-bezier(.34,1.56,.64,1);}
  .camp-ov.open .camp-modal{transform:none;}
  .camp-hero-img{width:100%;height:248px;overflow:hidden;position:relative;}
  .camp-hero-img img{width:100%;height:100%;object-fit:cover;filter:saturate(.5) contrast(1.1);}
  .camp-hero-img::after{content:'';position:absolute;inset:0;background:linear-gradient(to top,rgba(14,16,75,.9),transparent 50%);}
  .camp-hero-bot{position:absolute;bottom:0;left:0;padding:26px 32px;z-index:1;}
  .camp-close{position:absolute;top:16px;right:16px;z-index:10;width:42px;height:42px;background:rgba(8,9,48,.8);border:1px solid rgba(240,200,69,.3);cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:18px;color:var(--Y);transition:all .3s;backdrop-filter:blur(8px);}
  .camp-close:hover{background:var(--Y);color:var(--B);}
  .camp-body{padding:36px 36px 44px;}
  .camp-tag{font-size:9px;letter-spacing:.24em;text-transform:uppercase;color:var(--Y);background:rgba(240,200,69,.1);border:1px solid rgba(240,200,69,.38);padding:5px 12px;display:inline-block;margin-bottom:11px;}
  .camp-ttl{font-family:var(--FD);font-size:clamp(26px,4vw,50px);color:var(--Y);line-height:.88;margin-bottom:7px;}
  .camp-sub{font-size:12px;color:rgba(240,200,69,.4);letter-spacing:.05em;}
  .camp-kpis{display:grid;grid-template-columns:repeat(4,1fr);gap:2px;margin-bottom:26px;}
  .kpi{background:var(--Y);padding:20px 16px;text-align:center;}
  .kpi-n{font-family:var(--FD);font-size:38px;color:var(--B);line-height:1;}
  .kpi-l{font-size:10px;letter-spacing:.08em;text-transform:uppercase;color:rgba(14,16,75,.5);margin-top:3px;}
  .camp-div{height:1px;background:rgba(240,200,69,.08);margin:26px 0;}
  .camp-ov-txt{font-size:15px;line-height:1.88;color:rgba(240,200,69,.6);margin-bottom:24px;}
  .camp-sh{font-family:var(--FD);font-size:18px;color:var(--Y);letter-spacing:.04em;margin-bottom:13px;}
  .camp-chals{display:flex;flex-direction:column;gap:10px;margin-bottom:24px;}
  .camp-chal{display:flex;align-items:flex-start;gap:13px;background:rgba(240,200,69,.04);border:1px solid rgba(240,200,69,.07);padding:14px 17px;}
  .camp-chal-i{color:var(--Y);font-size:17px;flex-shrink:0;}
  .camp-chal-t{font-size:13px;line-height:1.66;color:rgba(240,200,69,.52);}
  .camp-svcs{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:24px;}
  .camp-svc-t{background:rgba(240,200,69,.07);border:1px solid rgba(240,200,69,.18);color:rgba(240,200,69,.7);font-size:11px;letter-spacing:.06em;padding:6px 14px;}
  .camp-tl{display:grid;grid-template-columns:repeat(3,1fr);gap:2px;margin-bottom:26px;}
  .camp-tl-item{background:rgba(240,200,69,.055);border:1px solid rgba(240,200,69,.09);padding:17px;}
  .camp-tl-ph{font-family:var(--FD);font-size:12px;letter-spacing:.14em;color:rgba(240,200,69,.38);margin-bottom:4px;}
  .camp-tl-ac{font-size:13px;line-height:1.55;color:rgba(240,200,69,.68);}
  .camp-q{border-left:3px solid var(--Y);background:rgba(240,200,69,.04);padding:22px 24px;margin-bottom:26px;}
  .camp-q-t{font-family:var(--FI);font-style:italic;font-size:16px;line-height:1.8;color:rgba(240,200,69,.68);margin-bottom:11px;}
  .camp-q-by{font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:rgba(240,200,69,.38);}
  .camp-cta-row{display:flex;gap:14px;align-items:center;flex-wrap:wrap;}
  .btn-ghost{color:var(--Y);font-size:12px;letter-spacing:.1em;text-transform:uppercase;display:inline-flex;align-items:center;gap:10px;font-weight:500;border-bottom:1px solid rgba(240,200,69,.28);padding-bottom:3px;transition:all .3s;opacity:.7;cursor:pointer;background:none;border-top:none;border-left:none;border-right:none;}
  .btn-ghost:hover{opacity:1;gap:18px;border-color:var(--Y);}

  #bot-btn{position:fixed;bottom:32px;right:32px;z-index:9000;width:62px;height:62px;background:var(--Y);border-radius:50%;display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 8px 40px rgba(240,200,69,.42);transition:transform .35s cubic-bezier(.34,1.56,.64,1),box-shadow .35s;animation:botPop .6s 3s both;border:none;}
  #bot-btn:hover{transform:scale(1.12) rotate(-6deg);box-shadow:0 14px 55px rgba(240,200,69,.58);}
  #bot-btn.open{background:var(--B4);border:2px solid rgba(240,200,69,.38);}
  .bb-badge{position:absolute;top:-3px;right:-3px;width:21px;height:21px;background:#e74c3c;border-radius:50%;border:2px solid var(--B3);display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;color:#fff;animation:pulse 2s infinite;}
  #bot-win{position:fixed;bottom:108px;right:32px;z-index:8999;width:395px;background:var(--B3);border:1px solid rgba(240,200,69,.18);display:flex;flex-direction:column;clip-path:polygon(0 0,calc(100% - 22px) 0,100% 22px,100% 100%,0 100%);box-shadow:0 24px 80px rgba(0,0,0,.65);transform:scale(.88) translateY(26px);transform-origin:bottom right;opacity:0;pointer-events:none;transition:transform .38s cubic-bezier(.34,1.56,.64,1),opacity .3s;max-height:590px;overflow:hidden;}
  #bot-win.open{transform:scale(1) translateY(0);opacity:1;pointer-events:all;}
  .bh{background:var(--Y);padding:16px 20px;display:flex;align-items:center;gap:12px;flex-shrink:0;}
  .bh-fox{font-size:32px;line-height:1;animation:foxWag 3s ease-in-out infinite;}
  .bh-nm{font-family:var(--FD);font-size:20px;color:var(--B);letter-spacing:.04em;line-height:1;}
  .bh-st{font-size:10px;color:rgba(14,16,75,.52);letter-spacing:.08em;display:flex;align-items:center;gap:5px;margin-top:2px;}
  .bh-dot{width:6px;height:6px;border-radius:50%;background:#27ae60;flex-shrink:0;animation:dotPulse 2s infinite;}
  .bh-lang{background:rgba(14,16,75,.14);border:1.5px solid rgba(14,16,75,.24);padding:5px 10px;font-size:10px;font-weight:700;letter-spacing:.08em;color:var(--B);cursor:pointer;transition:all .3s;}
  .bh-lang:hover{background:var(--B);color:var(--Y);}
  .bh-cl{width:29px;height:29px;background:rgba(14,16,75,.12);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:15px;color:var(--B);transition:all .3s;}
  .bh-cl:hover{background:var(--B);color:var(--Y);}
  .bq{padding:10px 14px;display:flex;gap:6px;flex-wrap:wrap;border-bottom:1px solid rgba(240,200,69,.07);flex-shrink:0;}
  .bqc{background:rgba(240,200,69,.07);border:1px solid rgba(240,200,69,.18);color:rgba(240,200,69,.72);font-size:10px;letter-spacing:.04em;padding:5px 10px;cursor:pointer;white-space:nowrap;transition:all .22s;}
  .bqc:hover{background:var(--Y);color:var(--B);border-color:var(--Y);}
  #bot-msgs{flex:1;overflow-y:auto;padding:14px;display:flex;flex-direction:column;gap:10px;min-height:200px;max-height:320px;}
  .cmsg{display:flex;align-items:flex-end;gap:8px;animation:msgPop .3s cubic-bezier(.34,1.56,.64,1);}
  .cmsg.user{flex-direction:row-reverse;}
  .c-av{width:27px;height:27px;border-radius:50%;background:var(--Y);display:flex;align-items:center;justify-content:center;font-size:12px;flex-shrink:0;line-height:1;}
  .c-bbl{max-width:80%;padding:9px 13px;font-size:13px;line-height:1.65;word-break:break-word;}
  .cmsg.bot .c-bbl{background:var(--B4);color:rgba(240,200,69,.88);border:1px solid rgba(240,200,69,.08);}
  .cmsg.user .c-bbl{background:var(--Y);color:var(--B);font-weight:500;}
  .typing{display:flex;gap:4px;align-items:center;padding:10px 14px;background:var(--B4);border:1px solid rgba(240,200,69,.08);width:fit-content;}
  .typing span{width:5px;height:5px;border-radius:50%;background:rgba(240,200,69,.45);animation:typeDot 1.2s ease-in-out infinite;}
  .typing span:nth-child(2){animation-delay:.22s;}
  .typing span:nth-child(3){animation-delay:.44s;}
  .bi{padding:12px 14px;border-top:1px solid rgba(240,200,69,.09);display:flex;gap:8px;align-items:center;flex-shrink:0;background:rgba(8,9,48,.55);}
  #bot-inp{flex:1;background:rgba(240,200,69,.06);border:1.5px solid rgba(240,200,69,.14);color:var(--Y);padding:9px 13px;font-family:var(--FB);font-size:13px;outline:none;transition:border-color .3s;}
  #bot-inp::placeholder{color:rgba(240,200,69,.22);}
  #bot-inp:focus{border-color:rgba(240,200,69,.48);}
  #bot-send{width:38px;height:38px;background:var(--Y);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:15px;color:var(--B);clip-path:polygon(0 0,calc(100% - 7px) 0,100% 7px,100% 100%,0 100%);transition:all .3s;}
  #bot-send:hover{background:var(--B4);color:var(--Y);}
  #bot-send:disabled{opacity:.32;cursor:not-allowed;}
  .bot-powered{text-align:center;font-size:9px;letter-spacing:.1em;color:rgba(240,200,69,.18);padding:6px 0 8px;}

  @media(max-width:1100px){
    nav{padding:20px 26px;} nav.sc{padding:13px 26px;}
    .nav-links,.nav-cta{display:none;} .hburg{display:flex;}
    .page-section{padding:76px 26px;}
    .sec{padding:76px 26px;}
    #stats{padding:80px 26px;} #clients{padding:74px 26px;}
    .ab-grid{grid-template-columns:1fr;gap:44px;}
    .ab-vis{height:340px;}
    .svc-grid{grid-template-columns:1fr 1fr;}
    .svc-mini{grid-template-columns:1fr 1fr;}
    .proc-steps{grid-template-columns:1fr 1fr;}
    .proc-steps-short{grid-template-columns:1fr 1fr;}
    .stats-grid{grid-template-columns:1fr 1fr;}
    .work-grid{grid-template-columns:1fr;} .wi.feat{grid-column:span 1;}
    .wt-inner{grid-template-columns:1fr 1fr;}
    .rev-grid{grid-template-columns:1fr 1fr;}
    .team-grid{grid-template-columns:repeat(2,1fr);}
    .ft-grid{grid-template-columns:1fr 1fr;gap:34px;}
    .h-side-img,.h-chips{display:none;}
    .faq-grid{grid-template-columns:1fr!important;}
    .eq-grid{grid-template-columns:1fr!important;}
    .sm-feats{grid-template-columns:1fr;}
    .camp-kpis{grid-template-columns:1fr 1fr;}
    .bs-inspo-inner{grid-template-columns:1fr!important;}
    .hero-content-wrap{padding:0 26px;}
    .hero-stats-row{grid-template-columns:1fr 1fr;}
  }
  @media(max-width:640px){
    .page-section{padding:58px 18px;}
    .sec{padding:58px 18px;}
    .svc-grid,.rev-grid{grid-template-columns:1fr;}
    .svc-mini{grid-template-columns:1fr;}
    .proc-steps{grid-template-columns:1fr;}
    .proc-steps-short{grid-template-columns:1fr 1fr;}
    .stats-grid{grid-template-columns:1fr 1fr;}
    .team-grid{grid-template-columns:1fr 1fr;}
    .ft-grid{grid-template-columns:1fr;}
    .wt-inner{grid-template-columns:1fr 1fr;}
    #stats{padding:58px 18px;} #clients{padding:58px 18px;}
    #bot-win{right:10px;left:10px;width:auto;bottom:88px;}
    #bot-btn{right:16px;bottom:20px;width:54px;height:54px;}
    nav{padding:18px 18px;}
    .frow{grid-template-columns:1fr;}
    .camp-kpis,.camp-tl{grid-template-columns:1fr 1fr;}
    .hero-stats-row{grid-template-columns:1fr 1fr;}
  }
`;

export default globalStyles;