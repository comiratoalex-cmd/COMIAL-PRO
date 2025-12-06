/* ============================================================
   COMIAL PRO — THEME AI ENGINE (Theme Generator)
============================================================ */

function generateAITheme() {

    // Estilos possíveis (IA escolhe aleatoriamente)
    const styles = [
        "pastel", "candy", "softneon", "neon", "cyberpunk",
        "tokyo", "vaporwave", "luxury", "gold", "ice",
        "sakura", "deepblue", "purpleglow", "storm"
    ];

    const style = styles[Math.floor(Math.random() * styles.length)];

    const palette = generatePalette(style);

    return {
        style: style,

        // Cores principais do gradient
        c1: palette[0],
        c2: palette[1],
        c3: palette[2],
        c4: palette[3],

        // Glow dinâmico estilo Tokyo
        glow: generateGlowColor(palette),

        // Partículas sincronizadas com a paleta
        particle: generateParticleColor(palette)
    };
}


/* ============================================================
   PALETAS POR ESTILO (geradas dinamicamente)
============================================================ */

function generatePalette(style) {

    const pastel = () => [
        soft("#aee7ff"), soft("#ffc0e6"), soft("#ffe4b3"), soft("#ffd9c7")
    ];

    const candy = () => [
        soft("#ffb3d6"), soft("#b3e5ff"), soft("#ffe7a3"), soft("#fbcfff")
    ];

    const softneon = () => [
        neon("#6cf1ff"), neon("#ff9cff"), neon("#ffe66c"), neon("#9effbd")
    ];

    const neon = () => [
        neon("#00ccff"), neon("#ff00ea"), neon("#ffcc00"), neon("#00ff90")
    ];

    const cyberpunk = () => [
        neon("#ff0099"), neon("#00ccff"), neon("#ffea00"), neon("#cc00ff")
    ];

    const tokyo = () => [
        neon("#a855f7"), neon("#22d3ee"), neon("#fb7185"), neon("#fcd34d")
    ];

    const vaporwave = () => [
        neon("#ff92c9"), neon("#7bd2f8"), neon("#f9f871"), neon("#c7b0ff")
    ];

    const luxury = () => [
        gold("#f7d488"), gold("#fce8b0"), gold("#e4bf72"), gold("#fff1cc")
    ];

    const gold = () => [
        gold("#f6d060"), gold("#e1b547"), gold("#fce19c"), gold("#fff0c2")
    ];

    const ice = () => [
        soft("#c8f1ff"), soft("#9fd9ff"), soft("#daf4ff"), soft("#edfaff")
    ];

    const sakura = () => [
        soft("#ffd6e8"), soft("#ffc1d7"), soft("#ffe5ef"), soft("#ffecf4")
    ];

    const deepblue = () => [
        neon("#2b5cff"), neon("#4d8aff"), neon("#6ba7ff"), neon("#90c0ff")
    ];

    const purpleglow = () => [
        neon("#b067ff"), neon("#d48cff"), neon("#f0c1ff"), neon("#c084fc")
    ];

    const storm = () => [
        neon("#5a5cff"), neon("#9d4bff"), neon("#ff4bf1"), neon("#ffd84b")
    ];

    const map = {
        pastel, candy, softneon, neon, cyberpunk,
        tokyo, vaporwave, luxury, gold, ice,
        sakura, deepblue, purpleglow, storm
    };

    return map[style]();
}


/* ============================================================
   Helpers de estilo (soft, neon, gold)
============================================================ */

function soft(hex) {
    return adjustColor(hex, 1.16, 0.85);
}

function neon(hex) {
    return adjustColor(hex, 1.45, 1.1);
}

function gold(hex) {
    return adjustColor(hex, 1.05, 1.15);
}
