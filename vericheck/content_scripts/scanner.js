// scanner.js
// Sběr dat z DOMu a detekce pro VeriCheck

function getPunycodeStatus(url) {
    const hostname = new URL(url).hostname;
    return hostname.includes('xn--');
}

function getTld(url) {
    const hostname = new URL(url).hostname;
    const parts = hostname.split('.');
    return '.' + parts[parts.length - 1];
}

function getHeadings() {
    const headings = document.querySelectorAll('h1, h2');
    return Array.from(headings).map(h => h.innerText);
}

function checkAuthorAnon() {
    const authorMeta = document.querySelector('meta[name="author"], meta[property="article:author"], meta[name="bylines"]');
    return authorMeta ? authorMeta.content : null;
}

function checkContactInfo() {
    const textContext = document.body.innerText.toLowerCase();
    const hasContact = textContext.includes('kontakt') || textContext.includes('o nás') || textContext.includes('redakce') || textContext.includes('napište nám') || textContext.includes('impressum') || textContext.includes('o projektu');

    // Zkusíme najít odkazy v patičce nebo menu
    const links = Array.from(document.querySelectorAll('a')).map(a => a.innerText.toLowerCase());
    const hasContactLink = links.some(text => text.includes('kontakt') || text.includes('o nás') || text.includes('redakce') || text.includes('impressum'));

    return hasContact || hasContactLink;
}

function analyzeOutboundLinks() {
    const allLinks = document.querySelectorAll('a[href]');
    const currentHost = window.location.hostname;
    let externalLinks = 0;

    allLinks.forEach(link => {
        try {
            const url = new URL(link.href);
            if (url.hostname !== currentHost && !url.href.startsWith('javascript:')) {
                externalLinks++;
            }
        } catch (e) { /* Neplatná url */ }
    });

    return {
        totalLinks: allLinks.length,
        externalLinks: externalLinks
    };
}

// Funkce na zjištění stáří domény pomocí RDAP (nepřesné, ale dobré pro demonstraci)
// Protože RDAP přesměrovává a má ruzné formáty pro ruzné TLDs, uděláme 
// fallback na "neznámé", pokud se to nepodaří zjistit.
async function checkDomainAge(domain) {
    try {
        // Použijeme bezplatné a bez-API-klíče RDAP rozhraní (např. rdap.org)
        const response = await fetch(`https://rdap.org/domain/${domain}`);
        if (!response.ok) return null;

        const data = await response.json();

        // Zkusíme najít 'registration' událost
        if (data.events) {
            const regEvent = data.events.find(e => e.eventAction === 'registration');
            if (regEvent && regEvent.eventDate) {
                const regDate = new Date(regEvent.eventDate);
                const ageInDays = (new Date() - regDate) / (1000 * 60 * 60 * 24);
                return { date: regEvent.eventDate, ageDays: Math.floor(ageInDays) };
            }
        }
        return null; // Registrace nenalezena
    } catch (e) {
        return null;
    }
}

async function scanPage(lexicon) {
    const url = window.location.href;
    const hostname = new URL(url).hostname;
    const headings = getHeadings();

    // 1. Technická integrita
    const hasPunycode = getPunycodeStatus(url);
    const tld = getTld(url);
    const isRiskyTld = lexicon.risky_tlds.includes(tld);

    // 2. Lingvistická analýza
    let clickbaitCount = 0;
    let excessivePunctuationCount = 0;

    headings.forEach(text => {
        // Kontrola clickbait slov
        const textLower = text.toLowerCase();
        lexicon.clickbait.forEach(word => {
            if (textLower.includes(word)) {
                clickbaitCount++;
            }
        });

        // Kontrola interpunkce (!, ?)
        const punctuationMatch = text.match(/[!?]{2,}/g);
        if (punctuationMatch) {
            excessivePunctuationCount++;
        }

        // Kontrola nadměrných velkých písmen (více než 50% textu)
        const letters = text.replace(/[^a-zA-Zá-žÁ-Ž]/g, '');
        if (letters.length > 5) {
            const upperCount = text.replace(/[^A-ZÁ-Ž]/g, '').length;
            if (upperCount / letters.length > 0.5) {
                excessivePunctuationCount++; // Použijeme to jako obecný indikátor senzace
            }
        }
    });

    const author = checkAuthorAnon();
    const isAnonymous = !author;
    const hasContactInfo = checkContactInfo();
    const linkAnalysis = analyzeOutboundLinks();

    // RDAP Analysis is async, we will return the promise directly
    const domainAgePromise = checkDomainAge(hostname);

    return {
        hasPunycode,
        tld,
        isRiskyTld,
        clickbaitCount,
        excessivePunctuationCount,
        isAnonymous,
        author,
        hasContactInfo,
        linkAnalysis,
        domainAgePromise
    };
}

// Zpráva pro popup, když si vyžádá data
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'scan') {
        const fetchUrl = chrome.runtime.getURL('data/lexicon.json');
        fetch(fetchUrl)
            .then(response => response.json())
            .then(async (lexicon) => {
                const results = await scanPage(lexicon);

                // Vyčkáme na asynchronní RDAP
                if (results.domainAgePromise) {
                    results.domainAge = await results.domainAgePromise;
                }
                delete results.domainAgePromise;

                sendResponse(results);
            })
            .catch(err => {
                console.error('Error fetching lexicon:', err);
                sendResponse({ error: 'Failed to load lexicon' });
            });

        return true; // Asynchronous response
    }
});

// Automatický scan při načtení stránky a odeslání výsledků do background.js
// pro dynamickou aktualizaci barvy notifikační ikony (kruh) rozšíření.
function autoScan() {
    const fetchUrl = chrome.runtime.getURL('data/lexicon.json');
    fetch(fetchUrl)
        .then(response => response.json())
        .then(async (lexicon) => {
            const results = await scanPage(lexicon);
            // Vyčkáme na asynchronní RDAP
            if (results.domainAgePromise) {
                results.domainAge = await results.domainAgePromise;
            }
            delete results.domainAgePromise;

            // Odešle výsledek background workeru
            chrome.runtime.sendMessage({ action: 'updateIcon', results: results });
        })
        .catch(err => {
            console.error('Error fetching lexicon for autoscan:', err);
        });
}

// Spustíme hned po načtení skriptu na dané webové stránce
autoScan();
