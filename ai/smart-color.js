/* ============================================================
   SMART COLOR — ajuste automático de cor
============================================================ */

function adjustColor(hex, sat = 1, bright = 1) {
    let c = hex.replace("#","");

    let r = parseInt(c.substring(0,2), 16);
    let g = parseInt(c.substring(2,4), 16);
    let b = parseInt(c.substring(4,6), 16);

    r = clamp(r * bright);
    g = clamp(g * bright);
    b = clamp(b * bright);

    const avg = (r + g + b) / 3;

    r = clamp(avg + (r - avg) * sat);
    g = clamp(avg + (g - avg) * sat);
    b = clamp(avg + (b - avg) * sat);

    return rgbToHex(r, g, b);
}

function clamp(x){ return Math.min(255, Math.max(0, x)); }

function rgbToHex(r,g,b){
    return "#" +
        r.toString(16).padStart(2,"0") +
        g.toString(16).padStart(2,"0") +
        b.toString(16).padStart(2,"0");
}
