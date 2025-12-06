/* ============================================================
   ADAPTIVE GLOW — escolhe o melhor glow baseado na paleta
============================================================ */

function generateGlowColor(palette) {

    const [c1, c2, c3, c4] = palette;

    const avg = [
        getLuma(c1),
        getLuma(c2),
        getLuma(c3),
        getLuma(c4)
    ].reduce((a,b) => a+b, 0) / 4;

    if (avg < 150) {
        return adjustColor(c2, 1.4, 1.5);
    }
    return adjustColor(c3, 1.2, 1.2);
}

function generateParticleColor(palette) {
    return adjustColor(palette[1], 1.1, 1.35);
}

function getLuma(hex) {
    let c = hex.replace("#","");
    const r = parseInt(c.substring(0,2), 16);
    const g = parseInt(c.substring(2,4), 16);
    const b = parseInt(c.substring(4,6), 16);
    return 0.2126*r + 0.7152*g + 0.0722*b;
}
