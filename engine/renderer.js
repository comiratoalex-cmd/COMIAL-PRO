/* ============================================================
   COMIAL PRO — RENDER ENGINE
============================================================ */

function renderAllLayers(theme) {
    const preview = document.getElementById("preview");
    preview.innerHTML = ""; // limpa

    const shape = document.getElementById("shape").value;
    const stroke = document.getElementById("stroke").value;
    const radius = document.getElementById("radius").value;

    const width = preview.clientWidth;
    const height = preview.clientHeight;

    let el = document.createElement("div");
    el.className = "shape-layer";

    /* ============================================================
       SHAPES SUPORTADOS
    ============================================================ */
    if (shape === "rect") {
        el.style.width = width + "px";
        el.style.height = height + "px";
        el.style.borderRadius = radius + "px";

    } else if (shape === "square") {
        const size = Math.min(width, height);
        el.style.width = size + "px";
        el.style.height = size + "px";
        el.style.borderRadius = radius + "px";
        el.style.margin = "auto";

    } else if (shape === "line-h") {
        el.style.width = width + "px";
        el.style.height = stroke + "px";
        el.style.borderRadius = radius + "px";
        el.style.margin = "auto";

    } else if (shape === "line-v") {
        el.style.width = stroke + "px";
        el.style.height = height + "px";
        el.style.borderRadius = radius + "px";
        el.style.margin = "auto";
    }

    /* ============================================================
       GRADIENTE
    ============================================================ */

    el.style.background = `
        linear-gradient(90deg,
        ${theme.c1},
        ${theme.c2},
        ${theme.c3},
        ${theme.c4})
    `;

    /* ============================================================
       SOMBRA / EFEITOS
    ============================================================ */

    if (document.getElementById("fxTokyo").checked) {
        el.classList.add("tokyo-glow");
    }

    if (document.getElementById("fxGlass").checked) {
        el.classList.add("glass-panel");
    }

    if (document.getElementById("fxDouble").checked) {
        el.classList.add("double-border");
    }

    preview.appendChild(el);
}
