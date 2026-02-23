document.addEventListener('DOMContentLoaded', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const activeTab = tabs[0];

        // Pokud jsme na chráněné stránce (např. chrome://), content script nefunguje
        if (activeTab.url.startsWith('chrome://') || activeTab.url.startsWith('edge://') || activeTab.url.startsWith('about:')) {
            showError('Rozšíření nelze spustit na této interní stránce.');
            return;
        }

        // Pošli zprávu content_scriptu pro scan stránky
        chrome.tabs.sendMessage(activeTab.id, { action: 'scan' }, (response) => {
            document.getElementById('loading').style.display = 'none';

            if (chrome.runtime.lastError || !response) {
                showError('Nelze navázat spojení se stránkou. Obnovte ji (F5).');
                return;
            }

            if (response.error) {
                showError('Chyba lexikonu: ' + response.error);
                return;
            }

            document.getElementById('results').style.display = 'block';
            updateUI(response);
        });
    });
});

function showError(msg) {
    document.getElementById('loading').style.display = 'none';
    document.getElementById('results').style.display = 'block';

    document.getElementById('scorecard').textContent = 'CHYBA';
    document.getElementById('scorecard').style.backgroundColor = '#9e9e9e';

    // Skrytí sekcí, protože nemáme data
    const sections = document.querySelectorAll('.section');
    sections.forEach(s => s.innerHTML = msg);
}

function updateUI(data) {
    let riskScore = 0; // 0 = green, 1-2 = yellow, 3+ = red

    // 1. Punycode
    const punyEl = document.getElementById('punycode-status');
    const punyHelp = document.getElementById('punycode-help');
    if (data.hasPunycode) {
        punyEl.textContent = 'Detekováno!';
        punyEl.className = 'status red';
        punyHelp.textContent = 'Pozor! Adresa využívá skryté znaky (xn--). Může jít o homografický útok zkoušející napodobit známý web.';
        riskScore += 3;
    } else {
        punyEl.textContent = 'Čisté';
        punyEl.className = 'status green';
        punyHelp.textContent = 'Adresa neobsahuje podezřelé znaky.';
    }

    // 2. TLD
    const tldEl = document.getElementById('tld-status');
    const tldHelp = document.getElementById('tld-help');
    document.getElementById('tld-value').textContent = data.tld;
    if (data.isRiskyTld) {
        tldEl.textContent = 'Riziková';
        tldEl.className = 'status red';
        tldHelp.textContent = 'Tato koncovka domény se často vyskytuje u pochybných či spamových webů.';
        riskScore += 2;
    } else {
        tldEl.textContent = 'Standardní';
        tldEl.className = 'status green';
        tldHelp.textContent = 'Běžná koncovka, riziko je nízké.';
    }

    // 3. Clickbait
    const cbEl = document.getElementById('clickbait-status');
    const cbHelp = document.getElementById('clickbait-help');
    // Score logic pro zbytek (staré)
    if (data.clickbaitCount > 2) {
        cbEl.textContent = data.clickbaitCount + ' nálezů';
        cbEl.className = 'status red';
        cbHelp.textContent = 'Vysoký výskyt senzacechtivých výrazů typických pro clickbait.';
        riskScore += 2;
    } else if (data.clickbaitCount > 0) {
        cbEl.textContent = data.clickbaitCount + ' nálezů';
        cbEl.className = 'status yellow';
        cbHelp.textContent = 'Nalezeny některé pochybné výrazy hrající na emoce.';
        riskScore += 1;
    } else {
        cbEl.textContent = '0 nálezů';
        cbEl.className = 'status green';
        cbHelp.textContent = 'Nadpisy působí vcelku neutrálně a střízlivě.';
    }

    // 4. Punctuation
    const puEl = document.getElementById('punct-status');
    const puHelp = document.getElementById('punct-help');
    if (data.excessivePunctuationCount > 2) {
        puEl.textContent = 'Značná';
        puEl.className = 'status red';
        puHelp.textContent = 'Příliš mnoho vykřičníků, otazníků nebo VELKÝCH PÍSMEN v nadpisech (bulvární styl).';
        riskScore += 2;
    } else if (data.excessivePunctuationCount > 0) {
        puEl.textContent = 'Trojitá';
        puEl.className = 'status yellow';
        puHelp.textContent = 'Mírně zvýšený výskyt interpunkce poutející pozornost.';
        riskScore += 1;
    } else {
        puEl.textContent = 'V normě';
        puEl.className = 'status green';
        puHelp.textContent = 'Text nepoužívá agresivní vizuální upoutávky.';
    }

    // 5. Author
    const auEl = document.getElementById('author-status');
    const auHelp = document.getElementById('author-help');
    if (data.isAnonymous) {
        auEl.textContent = 'Anonymní';
        auEl.className = 'status yellow';
        auHelp.textContent = 'Web neuvádí v meta tagách konkrétního autora článku. Cílená obezřetnost je namístě.';
        riskScore += 1;
    } else {
        let authName = data.author;
        if (authName.length > 20) authName = authName.substring(0, 20) + '...';
        auEl.textContent = 'Uveden (' + authName + ')';
        auEl.className = 'status green';
        auHelp.textContent = 'Autor je identifikovatelný, což pomáhá k transparentnosti.';
    }

    // 6. Contact Info
    const ctEl = document.getElementById('contact-status');
    const ctHelp = document.getElementById('contact-help');
    if (!data.hasContactInfo) {
        ctEl.textContent = 'Nenalezeny';
        ctEl.className = 'status red';
        ctHelp.textContent = 'Nepodařilo se dohledat sekci "Kontakt" nebo "O nás". Anonymní weby jsou často nedůvěryhodné.';
        riskScore += 2;
    } else {
        ctEl.textContent = 'Dostupné';
        ctEl.className = 'status green';
        ctHelp.textContent = 'Web pravděpodobně uvádí své vydavatele nebo redakci.';
    }

    // 7. Links Analysis
    const lkEl = document.getElementById('links-status');
    const lkHelp = document.getElementById('links-help');
    document.getElementById('links-value').textContent = data.linkAnalysis.externalLinks;

    if (data.linkAnalysis.totalLinks === 0) {
        lkEl.textContent = 'Žádné';
        lkEl.className = 'status yellow';
        lkHelp.textContent = 'Neobvyklé. Stránka neobsahuje žádné odkazy na další zdroje.';
    } else {
        const extRatio = data.linkAnalysis.externalLinks / data.linkAnalysis.totalLinks;
        if (extRatio < 0.05) {
            lkEl.textContent = 'Izolovaný';
            lkEl.className = 'status yellow';
            lkHelp.textContent = 'Stránka téměř neodkazuje na externí weby, chybí citace jiných názorů a zdrojů.';
            riskScore += 1;
        } else {
            lkEl.textContent = 'Propojený';
            lkEl.className = 'status green';
            lkHelp.textContent = 'Přítomnost externích odkazů naznačuje integraci do širšího informačního ekosystému.';
        }
    }

    // 8. Domain Age (RDAP)
    const ageEl = document.getElementById('domain-age-status');
    const ageHelp = document.getElementById('domain-age-help');
    if (data.domainAge) {
        if (data.domainAge.ageDays < 30) {
            ageEl.textContent = '< 1 měsíc!';
            ageEl.className = 'status red';
            ageHelp.textContent = 'Varování: Tato doména byla registrována velmi nedávno. To je časté u dezinformačních narativů a phishingu.';
            riskScore += 3;
        } else if (data.domainAge.ageDays < 180) {
            ageEl.textContent = '< 6 měsíců';
            ageEl.className = 'status yellow';
            ageHelp.textContent = 'Doména je relativně nová. Stojí za to ověřit pověst projektu jinými zdroji.';
            riskScore += 1;
        } else {
            ageEl.textContent = '> půl roku';
            ageEl.className = 'status green';
            ageHelp.textContent = 'Doména má již nějakou historii (' + data.domainAge.ageDays + ' dní). Riziko účelového webu je menší.';
        }
    } else {
        ageEl.textContent = 'Neznámé';
        ageEl.className = 'status yellow';
        ageHelp.textContent = 'Stáří domény se nepodařilo z veřejných databází vyčíst.';
    }

    // Scorecard
    const scEl = document.getElementById('scorecard');
    if (riskScore === 0) {
        scEl.textContent = 'Důvěryhodné (Zelená)';
        scEl.style.backgroundColor = '#2e7d32'; // green
    } else if (riskScore <= 2) {
        scEl.textContent = 'Nutná opatrnost (Žlutá)';
        scEl.style.backgroundColor = '#f57f17'; // yellow
        scEl.style.color = '#fff';
    } else {
        scEl.textContent = 'Vysoce rizikové (Červená)';
        scEl.style.backgroundColor = '#c62828'; // red
    }
}
