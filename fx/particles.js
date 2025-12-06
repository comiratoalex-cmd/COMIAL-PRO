/* ============================================================
   PARTICLE ENGINE — COMIAL PRO
============================================================ */

let particleInterval = null;

function startParticles(theme) {
    stopParticles();

    const preview = $("preview");

    particleInterval = setInterval(() => {
        const p = document.createElement("div");
        p.className = "particle";

        const size = Math.random() * 8 + 4;
        const x = Math.random() * preview.clientWidth;
        const y = preview.clientHeight + 20;

        p.style.width = size + "px";
        p.style.height = size + "px";
        p.style.left = x + "px";
        p.style.top = y + "px";
        p.style.background = theme.particle;

        preview.appendChild(p);

        setTimeout(() => p.remove(), 3500);
    }, 120);
}

function stopParticles() {
    clearInterval(particleInterval);
}
