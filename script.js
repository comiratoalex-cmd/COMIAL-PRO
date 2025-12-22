/* ============================================================
   COMIAL PRO — SCRIPT PRINCIPAL (FINAL)
   GitHub Pages + OBS SAFE
============================================================ */

document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     HELPERS
  ========================= */
  const $ = id => document.getElementById(id);
  let currentTheme = null;

  /* =========================
     PRESETS PRO
  ========================= */
  const PRESETS = [
    { name:"Tokyo",      c1:"#a855f7", c2:"#22d3ee", c3:"#fb7185", c4:"#fcd34d" },
    { name:"Vaporwave",  c1:"#ff92c9", c2:"#7bd2f8", c3:"#f9f871", c4:"#c7b0ff" },
    { name:"Gold",       c1:"#f7d488", c2:"#fce8b0", c3:"#e4bf72", c4:"#fff1cc" }
  ];

  /* =========================
     GERADOR IA (CORES)
  ========================= */
  function rand(){
    return Math.floor(Math.random()*360);
  }

  function generateAITheme(){
    const arr = [
      `hsl(${rand()},100%,60%)`,
      `hsl(${rand()},100%,60%)`,
      `hsl(${rand()},100%,60%)`,
      `hsl(${rand()},100%,60%)`
    ];
    return {
      style: "AI Generated",
      c1: arr[0],
      c2: arr[1],
      c3: arr[2],
      c4: arr[3],
      glow: arr[0],
      particle: arr[2]
    };
  }

  /* =========================
     PREVIEW
  ========================= */
  function applyThemePreview(theme){
    const prev = $("themePreview");
    if(!prev) return;

    prev.style.background = `
      linear-gradient(90deg,
        ${theme.c1},
        ${theme.c2},
        ${theme.c3},
        ${theme.c4})
    `;
  }

  /* =========================
     APLICAR NO SISTEMA
  ========================= */
  function renderAllLayers(theme){
    const r = document.documentElement;
    r.style.setProperty("--c1", theme.c1);
    r.style.setProperty("--c2", theme.c2);
    r.style.setProperty("--c3", theme.c3);
    r.style.setProperty("--c4", theme.c4);
  }

  /* =========================
     STORAGE
  ========================= */
  function saveTheme(theme){
    localStorage.setItem("comial-theme", JSON.stringify(theme));
  }

  function loadTheme(){
    const saved = localStorage.getItem("comial-theme");
    if(saved){
      currentTheme = JSON.parse(saved);
      applyThemePreview(currentTheme);
      renderAllLayers(currentTheme);
    }
  }

  /* =========================
     EXPORT
  ========================= */
  function exportLink(target){
    if(!currentTheme) return alert("Gere um tema primeiro!");
    const url = new URL(location.href);
    url.pathname = "obs.html";
    url.searchParams.set("theme", JSON.stringify(currentTheme));
    $(target).value = url.toString();
  }

  /* =========================
     BOTÕES
  ========================= */
  $("generateAI")?.addEventListener("click", () => {
    currentTheme = generateAITheme();
    applyThemePreview(currentTheme);
    renderAllLayers(currentTheme);
    saveTheme(currentTheme);
  });

  $("exportViewer")?.addEventListener("click", () => exportLink("viewerLink"));
  $("exportOBS")?.addEventListener("click", () => exportLink("obsLink"));

  $("exportPack")?.addEventListener("click", () => {
    if(!currentTheme) return alert("Gere um tema!");
    const blob = new Blob(
      [JSON.stringify({theme:currentTheme,generated:new Date()},null,2)],
      {type:"application/json"}
    );
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "comial-pack.json";
    a.click();
  });

  /* =========================
     PRESETS GRID
  ========================= */
  function buildPresetGrid(){
    const grid = $("presetsGrid");
    if(!grid) return;

    PRESETS.forEach(p=>{
      const d = document.createElement("div");
      d.className = "preset-thumb";
      d.style.background = `
        linear-gradient(90deg,
          ${p.c1},${p.c2},${p.c3},${p.c4})
      `;
      d.onclick = ()=>{
        currentTheme = {
          style:p.name,
          c1:p.c1,c2:p.c2,c3:p.c3,c4:p.c4,
          glow:p.c1,
          particle:p.c3
        };
        applyThemePreview(currentTheme);
        renderAllLayers(currentTheme);
        saveTheme(currentTheme);
      };
      grid.appendChild(d);
    });
  }

  /* =========================
     CANVAS — FUNDO CINEMATOGRÁFICO
  ========================= */
  function initCanvas(){
    const canvas = $("bgCanvas");
    if(!canvas) return;

    const ctx = canvas.getContext("2d");

    function resize(){
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    let t = 0;

    function loop(){
      t += 0.01;

      const c1 = getComputedStyle(document.documentElement).getPropertyValue("--c1").trim();
      const c2 = getComputedStyle(document.documentElement).getPropertyValue("--c2").trim();

      const g = ctx.createLinearGradient(
        Math.sin(t)*canvas.width, 0,
        canvas.width, canvas.height
      );
      g.addColorStop(0, c1 || "#ff0080");
      g.addColorStop(1, c2 || "#00eaff");

      ctx.globalAlpha = 0.08;
      ctx.fillStyle = g;
      ctx.fillRect(0,0,canvas.width,canvas.height);
      ctx.globalAlpha = 1;

      requestAnimationFrame(loop);
    }
    loop();
  }

  /* =========================
     INIT
  ========================= */
  buildPresetGrid();
  loadTheme();
  initCanvas();

  console.log("✅ COMIAL PRO — SCRIPT FINAL CARREGADO");
});
