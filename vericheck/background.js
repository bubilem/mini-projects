// Rozhraní pro dynamické kreslení ikon pomocí OffscreenCanvas (MV3 Service Worker)
function drawIcon(color) {
    const canvas = new OffscreenCanvas(16, 16);
    const ctx = canvas.getContext('2d');

    // Připravíme průhledné pozadí
    ctx.clearRect(0, 0, 16, 16);

    // Nakreslíme kruh
    ctx.beginPath();
    ctx.arc(8, 8, 7, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();

    return ctx.getImageData(0, 0, 16, 16);
}

// Posluchač zpráv od content_scriptu (scanner.js)
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'updateIcon' && sender.tab) {
        const data = request.results;
        let riskScore = 0;

        // Hodnotící logika převzatá z popup.js pro zajištění barevné konzistence
        if (data.hasPunycode) riskScore += 3;
        if (data.isRiskyTld) riskScore += 2;
        if (data.clickbaitCount > 2) riskScore += 2;
        else if (data.clickbaitCount > 0) riskScore += 1;
        if (data.excessivePunctuationCount > 2) riskScore += 2;
        else if (data.excessivePunctuationCount > 0) riskScore += 1;
        if (data.isAnonymous) riskScore += 1;

        let color = '#2e7d32'; // Zelená (bez rizika)
        if (riskScore >= 3) {
            color = '#c62828'; // Červená (vysoké riziko)
        } else if (riskScore > 0) {
            color = '#f57f17'; // Oranžová/Žlutá (opatrnost)
        }

        // Vykreslíme ikonu s určenou barvou v reálném čase
        const imgData = drawIcon(color);

        // Nastavíme ikonu specificky pro aktuální tabulární list
        chrome.action.setIcon({
            tabId: sender.tab.id,
            imageData: { "16": imgData }
        });
    }
});
