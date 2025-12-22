/* ============================================================
   COMIAL PRO — SCRIPT PRINCIPAL (FIXED / STABLE)
============================================================ */

document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     HELPERS
  ========================= */
  const $ = id => document.getElementById(id);
  let currentTheme = null;

  /* =========================
     PRESETS PADRÃO
  ========================= */
  const PRESETS = [
    { name:"Tokyo", c1:"#a855f7", c2:"#22d3ee", c3:"#fb7185", c4:"#fcd34d" },
    { name:"Vaporwave", c1:"#ff92c9", c2:"#7bd2f8", c3:"#f9f871", c4:"#c7b0ff" },
    { name:"Gold", c1:"#f7d488", c2:"#fce8b0", c3:"#e4bf72", c4:"#fff1cc" }
  ];

  /* =========================
     GERADOR IA (SIMULADO)
  ========================= */
  function randomColor(){
    return `hsl(${Math.random()*360},100%,60%)`;
  }

  function generateAITheme(){
    const arr = [randomColor(),randomColor(),randomColor(),randomColor()];
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

  function generateGlowColor(arr){ return arr[0]; }
  function generateParticleColor(arr){ return arr[2]; }

  /* =========================
     PREVIEW
  ========================= */
  function applyThemePreview(theme){
    const prev = $("themePreview");
    if(!prev) return;

    prev.style.height = "40px";
    prev.style.borderRadius = "8px";
    prev.style.background = `
      linear-gradient(90deg,
        ${theme.c1},
        ${theme.c2},
        ${theme.c3},
        ${theme.c4})
    `;
  }

  /* =========================
     RENDER GLOBAL
  ========================= */
  function renderAllLayers(theme){
    document.documentElement.style.setProperty("--c1", theme.c1);
    document.documentElement.style.setProperty("--c2", theme.c2);
    document.documentElement.style.setProperty("--c3", theme.c3);
    document.documentElement.style.setProperty("--c4", theme.c4);
  }

  /* =========================
     STORAGE
  ========================= */
  function saveTheme(theme){
    localStorage.setItem("comial-theme", JSON.stringify(theme));
  }

  function loadTheme(){
    const stored = localStorage.getItem("comial-theme");
    if(stored){
      currentTheme = JSON.parse(stored);
      applyThemePreview(currentTheme);
      renderAllLayers(currentTheme);
    }
  }

  /* =========================
     EXPORT LINKS
  ========================= */
  function exportLink(fieldId){
    if(!currentTheme) return alert("Gere um tema primeiro!");
    const url = new URL(location.href);
    url.pathname = "obs.html";
    url.searchParams.set("theme", JSON.stringify(currentTheme));
    $(fieldId).value = url.toString();
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
    const pack = {
      name: "COMIAL PRO PACK",
      theme: currentTheme,
      generatedAt: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(pack,null,2)],{type:"application/json"});
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
      const div = document.createElement("div");
      div.className = "preset-thumb";
      div.style.background = `
        linear-gradient(90deg,
          ${p.c1},
          ${p.c2},
          ${p.c3},
          ${p.c4})
      `;
      div.onclick = ()=>{
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
      grid.appendChild(div);
    });
  }

  /* =========================
     CANVAS BACKGROUND
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
      t += 0.015;
      ctx.fillStyle = `rgba(${Math.sin(t)*127+128},0,0,0.06)`;
      ctx.fillRect(0,0,canvas.width,canvas.height);
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

  console.log("✅ COMIAL PRO — SCRIPT OK");
});
