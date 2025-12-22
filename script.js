/* ============================================================
   COMIAL PRO — SCRIPT PRINCIPAL (UNIFICADO)
============================================================ */

const $ = id => document.getElementById(id);
let currentTheme = null;

/* ============================================================
   APLICAR TEMA NO PREVIEW PEQUENO (IA PREVIEW)
============================================================ */
function applyThemePreview(theme) {
    const prev = $("themePreview");

    prev.style.width = "100%";
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

/* ============================================================
   BOTÃO GERAR TEMA IA
============================================================ */
$("generateAI").onclick = () => {
    currentTheme = generateAITheme();
    applyThemePreview(currentTheme);
    renderAllLayers(currentTheme);
    saveTheme(currentTheme);
};

/* ============================================================
   ATUALIZAÇÃO LIVE DOS CONTROLES (SLIDERS / SELECT)
============================================================ */
document.addEventListener("input", () => {
    if (currentTheme) renderAllLayers(currentTheme);
});
document.addEventListener("change", () => {
    if (currentTheme) renderAllLayers(currentTheme);
});

/* ============================================================
   EXPORT VIEWER
============================================================ */
$("exportViewer").onclick = () => {
    if (!currentTheme) return alert("Gere um tema IA primeiro!");

    const url = new URL(location.href);
    url.pathname = "/comial-pro/obs.html";
    url.searchParams.set("theme", JSON.stringify(currentTheme));

    $("viewerLink").value = url.toString();
};

/* ============================================================
   EXPORT OBS
============================================================ */
$("exportOBS").onclick = () => {
    if (!currentTheme) return alert("Gere um tema IA primeiro!");

    const url = new URL(location.href);
    url.pathname = "/comial-pro/obs.html";
    url.searchParams.set("theme", JSON.stringify(currentTheme));

    $("obsLink").value = url.toString();
};

/* ============================================================
   EXPORT PACK COMPLETO
============================================================ */

$("exportPack").onclick = () => {

    if (!currentTheme) {
        alert("Gere um tema IA primeiro!");
        return;
    }

    const pack = buildPack(currentTheme);

    const blob = new Blob([JSON.stringify(pack, null, 4)], {
        type: "application/json"
    });

    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "comial-pack.json";
    a.click();

    alert("Pack COMPLETO exportado com sucesso!");
};

function buildPack(theme) {

    const base = window.location.origin + "/comial-pro";

    return {
        name: "COMIAL PRO — Full Stream Pack",
        version: "1.0",
        theme,

        components: {
            overlay: `${base}/obs.html?theme=${encodeURIComponent(JSON.stringify(theme))}`,
            webcam: `${base}/components/webcam-frame.html?theme=${encodeURIComponent(JSON.stringify(theme))}&glass=1&double=1&tokyo=1&particles=1`,
            alertFollow: `${base}/components/alert.html?user=New+Follower`,
            alertSub: `${base}/components/alert.html?user=New+Subscriber`,
            transition: `${base}/components/transition.html`
        },

        generatedAt: new Date().toISOString()
    };
}

/* ============================================================
   PRESETS PRO — MINIATURAS
============================================================ */
function buildPresetGrid() {
    const grid = $("presetsGrid");

    PRESETS.forEach(p => {
        const div = document.createElement("div");
        div.className = "preset-thumb";

        div.style.background = `
            linear-gradient(90deg,
            ${p.c1},
            ${p.c2},
            ${p.c3},
            ${p.c4})
        `;

        div.onclick = () => {
            const arr = [p.c1, p.c2, p.c3, p.c4];

            currentTheme = {
                style: p.name,
                c1: p.c1,
                c2: p.c2,
                c3: p.c3,
                c4: p.c4,
                glow: generateGlowColor(arr),
                particle: generateParticleColor(arr)
            };

            applyThemePreview(currentTheme);
            renderAllLayers(currentTheme);
            saveTheme(currentTheme);
        };

        grid.appendChild(div);
    });
}

buildPresetGrid();

/* ============================================================
   BOTÕES RÁPIDOS: TOKYO / VAPORWAVE / GOLD
============================================================ */

$("randomTokyo").onclick = () => {
    const t = ["#a855f7", "#22d3ee", "#fb7185", "#fcd34d"];
    buildQuickTheme("Tokyo Custom", t);
};

$("randomVapor").onclick = () => {
    const t = ["#ff92c9", "#7bd2f8", "#f9f871", "#c7b0ff"];
    buildQuickTheme("Vaporwave", t);
};

$("randomGold").onclick = () => {
    const t = ["#f7d488", "#fce8b0", "#e4bf72", "#fff1cc"];
    buildQuickTheme("Luxury Gold", t);
};

function buildQuickTheme(name, arr) {

    currentTheme = {
        style: name,
        c1: arr[0],
        c2: arr[1],
        c3: arr[2],
        c4: arr[3],
        glow: generateGlowColor(arr),
        particle: generateParticleColor(arr)
    };

    applyThemePreview(currentTheme);
    renderAllLayers(currentTheme);
    saveTheme(currentTheme);
}

/* ============================================================
   SALVAR E CARREGAR TEMA
============================================================ */
function saveTheme(theme) {
    localStorage.setItem("comial-theme", JSON.stringify(theme));
}

function loadTheme() {
    const stored = localStorage.getItem("comial-theme");
    if (stored) {
        currentTheme = JSON.parse(stored);
        applyThemePreview(currentTheme);
        renderAllLayers(currentTheme);
    }
}

loadTheme();
console.log("COMIAL PRO JS OK");

const canvas = document.getElementById("bgCanvas");
if(!canvas){
  alert("Canvas não encontrado");
}else{
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let t = 0;
  function loop(){
    t += 0.01;
    ctx.fillStyle = `rgba(${Math.sin(t)*127+128},0,0,0.05)`;
    ctx.fillRect(0,0,canvas.width,canvas.height);
    requestAnimationFrame(loop);
  }
  loop();
}

