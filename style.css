/* ============================================================
   COMIAL PRO — SCRIPT FINAL ESTÁVEL
============================================================ */

document.addEventListener("DOMContentLoaded", () => {

  const $ = id => document.getElementById(id);
  let currentTheme = null;

  /* =========================
     PRESETS
  ========================= */
  const PRESETS = [
    { name:"Tokyo", c1:"#a855f7", c2:"#22d3ee", c3:"#fb7185", c4:"#fcd34d" },
    { name:"Vapor", c1:"#ff92c9", c2:"#7bd2f8", c3:"#f9f871", c4:"#c7b0ff" },
    { name:"Gold",  c1:"#f7d488", c2:"#fce8b0", c3:"#e4bf72", c4:"#fff1cc" }
  ];

  /* =========================
     IA — GERADOR
  ========================= */
  function rand(){
    return Math.floor(Math.random() * 360);
  }

  function generateAITheme(){
    return {
      style: "AI",
      c1: `hsl(${rand()},100%,60%)`,
      c2: `hsl(${rand()},100%,60%)`,
      c3: `hsl(${rand()},100%,60%)`,
      c4: `hsl(${rand()},100%,60%)`
    };
  }

  /* =========================
     APLICAR TEMA
  ========================= */
  function applyTheme(theme){
    const r = document.documentElement;
    r.style.setProperty("--c1", theme.c1);
    r.style.setProperty("--c2", theme.c2);
    r.style.setProperty("--c3", theme.c3);
    r.style.setProperty("--c4", theme.c4);
  }

  function updatePreview(){
    const p = $("themePreview");
    if(p){
      p.style.background = `linear-gradient(90deg,var(--c1),var(--c2),var(--c3),var(--c4))`;
    }
  }

  /* =========================
     STORAGE
  ========================= */
  function saveTheme(theme){
    localStorage.setItem("comial-theme", JSON.stringify(theme));
  }

  function loadTheme(){
    const s = localStorage.getItem("comial-theme");
    if(s){
      currentTheme = JSON.parse(s);
      applyTheme(currentTheme);
      updatePreview();
    }
  }

  /* =========================
     BOTÕES
  ========================= */
  $("generateAI")?.addEventListener("click", () => {
    currentTheme = generateAITheme();
    applyTheme(currentTheme);
    updatePreview();
    saveTheme(currentTheme);
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
      d.style.background = `linear-gradient(90deg,${p.c1},${p.c2},${p.c3},${p.c4})`;
      d.onclick = ()=>{
        currentTheme = p;
        applyTheme(p);
        updatePreview();
        saveTheme(p);
      };
      grid.appendChild(d);
    });
  }

  /* =========================
     INIT
  ========================= */
  buildPresetGrid();
  loadTheme();

  console.log("✅ COMIAL PRO — SCRIPT OK");
});
