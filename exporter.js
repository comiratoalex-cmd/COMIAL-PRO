/* ============================================================
   COMIAL PRO — PACK EXPORTER
   Gera overlay + webcam + alert + transition com 1 clique
============================================================ */

document.getElementById("exportPack").onclick = () => {

    if (!currentTheme) {
        alert("Gere um tema IA primeiro!");
        return;
    }

    const pack = buildPack(currentTheme);

    const url = new URL(window.location.origin + "/comial-pro/pack.json");
    const blob = new Blob([JSON.stringify(pack, null, 4)], {type: "application/json"});

    const download = document.createElement("a");
    download.href = URL.createObjectURL(blob);
    download.download = "comial-pack.json";
    download.click();

    alert("Pack COMPLETO exportado com sucesso!");
};


/* ============================================================
   PACK BUILDER
============================================================ */

function buildPack(theme) {

    const base = window.location.origin + "/comial-pro";

    return {
        name: "COMIAL PRO — Full Stream Pack",
        version: "1.0",

        theme,

        components: {
            overlay: `${base}/obs.html?theme=${encodeURIComponent(JSON.stringify(theme))}`,
            webcam: `${base}/components/webcam-frame.html?theme=${encodeURIComponent(JSON.stringify(theme))}&glass=1&double=1&tokyo=1&particles=1`,
            alertFollow: `${base}/components/alert.html?user=New+Follower`,
            alertSub: `${base}/components/alert.html?user=New+Subscriber`,
            transition: `${base}/components/transition.html`,
        },

        generatedAt: new Date().toISOString()
    };
}
