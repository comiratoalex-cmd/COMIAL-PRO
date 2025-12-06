/* ============================================================
   COMIAL PRO — UI → ENGINE CONTROLLER
============================================================ */

const $ = id => document.getElementById(id);

let currentTheme = null;

/* ----------- IA: Gerar tema automaticamente ----------- */
$("generateAI").onclick = () => {
    currentTheme = generateAITheme();   // função do themes-ai.js
    applyThemePreview(currentTheme);
    renderAllLayers(currentTheme);
};

/* ----------- Sliders e selects atualizam preview ----------- */
document.addEventListener("input", () => {
    if (currentTheme) renderAllLayers(currentTheme);
});

document.addEventListener("change", () => {
    if (currentTheme) renderAllLayers(currentTheme);
});

/* ----------- Export para VIEWER ----------- */
$("exportViewer").onclick = () => {
    if (!currentTheme) return alert("Gere um tema IA primeiro!");

    const url = new URL(location.href);
    url.pathname = "/comial-pro/obs.html"; 
    url.searchParams.set("theme", JSON.stringify(currentTheme));

    $("viewerLink").value = url.toString();
};

/* ----------- Export para OBS ----------- */
$("exportOBS").onclick = () => {
    if (!currentTheme) return alert("Gere um tema IA primeiro!");

    const url = new URL(location.href);
    url.pathname = "/comial-pro/obs.html"; 
    url.searchParams.set("theme", JSON.stringify(currentTheme));

    $("obsLink").value = url.toString();
};
