/* ============================================================
   COMIAL PRO — RENDER ENGINE
============================================================ */

function renderBaseLayer(theme, shape, thickness, radius, speed) {

    const preview = document.getElementById("preview");

    preview.style.border = `${thickness}px solid transparent`;
    preview.style.borderRadius = `${radius}px`;
    preview.style.animationDuration = `${speed}s`;

    preview.style.backgroundImage = `
        linear-gradient(90deg, 
            ${theme.c1}, 
            ${theme.c2}, 
            ${theme.c3}, 
            ${theme.c4},
            ${theme.c1}
        )
    `;
}

/* ------ Glass Effect ------ */
function applyGlassEffect() {
    const preview = $("preview");
    preview.classList.add("glass-effect");
}

/* ------ Double Border ------ */
function applyDoubleBorder() {
    const preview = $("preview");
    preview.classList.add("double-border");
}

/* ------ Tokyo Glow ------ */
function applyTokyoGlow(theme) {
    const preview = $("preview");
    preview.style.setProperty("--tokyo-color", theme.glow);
    preview.classList.add("tokyo-breath");
}
