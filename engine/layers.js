/* ============================================================
   COMIAL PRO — MULTILAYER SYSTEM
   Cria camadas extras de brilho, glow, borda, halos e layers
============================================================ */

/*
Camadas ativas:

1 — Base (renderer.js)
2 — Glow expandido
3 — Glow suave
4 — Halo pastel
5 — Borda externa (soft)
*/

function createGlowLayer(preview, theme, size, blur, opacity) {
    const glow = document.createElement("div");
    glow.className = "shape-layer glow-layer";

    glow.style.filter = `
        drop-shadow(0 0 ${blur}px ${hexToRgba(theme.glow || theme.c2, opacity)})
    `;

    glow.style.transform = `scale(${size})`;

    preview.appendChild(glow);
}

/* ============================================================
   CONVERTE HEX → RGBA
============================================================ */
function hexToRgba(hex, opacity) {
    hex = hex.replace("#", "");
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return `rgba(${r},${g},${b},${opacity})`;
}

/* ============================================================
   SISTEMA PRINCIPAL DE MULTILAYER
============================================================ */

function applyMultiLayers(preview, theme) {
    // camada 2 — glow expandido
    createGlowLayer(preview, theme, 1.05, 25, 0.55);

    // camada 3 — glow suave
    createGlowLayer(preview, theme, 1.00, 15, 0.40);

    // camada 4 — halo pastel
    createGlowLayer(preview, theme, 1.15, 40, 0.30);

    // camada 5 — borda externa bem suave
    createGlowLayer(preview, theme, 1.09, 32, 0.25);
}

/* ============================================================
   FUNÇÃO PRINCIPAL CHAMADA PELO RENDERER
============================================================ */

function enhanceLayerSystem(theme) {
    const preview = document.getElementById("preview");

    // Aplica multicamada APÓS o layer base estar desenhado
    applyMultiLayers(preview, theme);
}
