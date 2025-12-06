/* ============================================================
   COMIAL PRO — RENDER ENGINE FINAL
   Responsável por desenhar o shape + efeitos + gradiente
============================================================ */

function renderAllLayers(theme) {
    const preview = document.getElementById("preview");
    preview.innerHTML = ""; // limpa preview

    const shape = document.getElementById("shape").value;
    const stroke = Number(document.getElementById("stroke").value);
    const radius = Number(document.getElementById("radius").value);
    const speed = Number(document.getElementById("speed").value);

    const w = preview.clientWidth;
    const h = preview.clientHeight;

    // CRIA A CAMADA DO SHAPE
    const layer = document.createElement("div");
    layer.className = "shape-layer";

    /* ============================================================
       FORMAS SUPORTADAS
    ============================================================= */
    if (shape === "rect") {
        layer.style.width = w + "px";
        layer.style.height = h + "px";
        layer.style.borderRadius = radius + "px";

    } else if (shape === "square") {
        const size = Math.min(w, h);
        layer.style.width = size + "px";
        layer.style.height = size + "px";
        layer.style.borderRadius = radius + "px";

    } else if (shape === "line-h") {
        layer.style.width = w + "px";
        layer.style.height = stroke + "px";
        layer.style.borderRadius = radius + "px";

    } else if (shape === "line-v") {
        layer.style.width = stroke + "px";
        layer.style.height = h + "px";
        layer.style.borderRadius = radius + "px";
    }

    /* ============================================================
       GRADIENTE PRINCIPAL COM ANIMAÇÃO
    ============================================================= */
    layer.style.background = `
        linear-gradient(90deg,
        ${theme.c1},
        ${theme.c2},
        ${theme.c3},
        ${theme.c4})
    `;
    layer.style.backgroundSize = "400% 400%";
    layer.style.animation = `gradientFlow ${speed}s ease infinite`;

    /* ============================================================
       EFEITOS OPCIONAIS
    ============================================================= */

    // TOKYO GLOW (neon)
    if (document.getElementById("fxTokyo").checked) {
        layer.classList.add("tokyo-glow");
    }

    // GLASS
    if (document.getElementById("fxGlass").checked) {
        layer.classList.add("glass-panel");
    }

    // BORDA DUPLA
    if (document.getElementById("fxDouble").checked) {
        layer.classList.add("double-border");
    }

    // PARTÍCULAS
    if (document.getElementById("fxParticles").checked) {
        spawnParticles(preview, theme);
    }

    preview.appendChild(layer);
}

/* ============================================================
   ANIMAÇÃO DO GRADIENTE
============================================================ */
const gradientCSS = document.createElement("style");
gradientCSS.innerHTML = `
@keyframes gradientFlow {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
}
`;
document.head.appendChild(gradientCSS);

/* ============================================================
   PARTÍCULAS (COMPATÍVEL COM O FX)
============================================================ */
function spawnParticles(container, theme) {
    for (let i = 0; i < 10; i++) {
        const p = document.createElement("div");
        p.className = "particle";

        p.style.width = p.style.height = (Math.random() * 8 + 4) + "px";
        p.style.left = Math.random() * container.clientWidth + "px";
        p.style.top = container.clientHeight + "px";
        p.style.background = theme.particle || theme.c3;

        container.appendChild(p);

        setTimeout(() => p.remove(), 3500);
    }
}
