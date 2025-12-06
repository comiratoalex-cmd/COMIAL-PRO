/* ============================================================
   COMIAL PRO — MULTILAYER ENGINE (3 LAYERS)
============================================================ */

function renderAllLayers(theme) {

    const shape = $("shape").value;
    const thickness = $("stroke").value;
    const radius = $("radius").value;
    const speed = $("speed").value;

    const enableGlass = $("fxGlass").checked;
    const enableDouble = $("fxDouble").checked;
    const enableTokyo = $("fxTokyo").checked;
    const enableParticles = $("fxParticles").checked;

    /* LAYER 1 — GRADIENT CORE */
    renderBaseLayer(theme, shape, thickness, radius, speed);

    /* LAYER 2 — DOUBLE BORDER */
    if (enableDouble) applyDoubleBorder();

    /* LAYER 3 — GLASS EFFECT */
    if (enableGlass) applyGlassEffect();

    /* LAYER 4 — TOKYO GLOW BREATHING */
    if (enableTokyo) applyTokyoGlow(theme);

    /* LAYER 5 — PARTICLES */
    if (enableParticles) startParticles(theme);
    else stopParticles();
}
