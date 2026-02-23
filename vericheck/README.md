# VeriCheck

**VeriCheck** je vzdělávací nástroj ve formě rozšíření do webového prohlížeče (Google Chrome, Microsoft Edge, Brave a další prohlížeče na bázi Chromium). Jeho hlavním cílem je pomáhat uživatelům identifikovat technické a obsahové znaky manipulace na webových stránkách.

Projekt je určen primárně pro studenty a běžné uživatele internetu se zájmem o mediální gramotnost a kybernetickou bezpečnost.

---

## 1. Účel aplikace

Rozšíření analyzuje aktuálně prohlíženou webovou stránku a upozorňuje na potenciální rizika spojená s dezinformacemi, clickbaitem a podvodnými weby (např. phishing). Získané informace vizualizuje v přehledném popup okně pomocí semaforového hodnocení (zelená, žlutá, červená).

Aplikace se zaměřuje na dvě hlavní oblasti:
1. **Technická integrita:** Analýza URL adresy (Punycode/homografické útoky, rizikové domény (TLD)).
2. **Obsahová analýza:** Hledání prvků manipulativního obsahu (clickbaitové nadpisy, nadměrná interpunkce/kapitálky, absence údajů o autorovi).

Samotná **ikona rozšíření** v prohlížeči navíc funguje jako rychlý semafor – po načtení stránky se automaticky zbarví (zelený, oranžový nebo červený kruh) podle míry rizika, aniž byste museli popup okno otevírat.

---

## 2. Technické řešení

Rozšíření nevyužívá žádný backend a veškerá (dosavadní) analýza probíhá **lokálně** přímo ve vašem prohlížeči, čímž je zaručena ochrana soukromí (žádná data o prohlížených stránkách se nikam neodesílají).

Architektura je postavena na **Manifest V3** a skládá se z následujících modulů:

* **`manifest.json`**: Konfigurace rozšíření a definice oprávnění (`activeTab`, `storage`).
* **Background Worker (`background.js`)**: Skript běžící na pozadí prohlížeče, který dynamicky vykreslíje barvu ikony rozšíření podle výsledků prvotní analýzy z obsahu zobrazené stránky.
* **Content Script (`content_scripts/scanner.js`)**: Skript, který se spouští na pozadí právě prohlížené stránky. Přistupuje k DOMu a získává z něj informace (nadpisy `<h1>`, `<h2>`, meta tagy pro autora) a kontroluje URL objekt.
* **Popup rozhraní (`popup/popup.html` a `popup/popup.js`)**: Uživatelské rozhraní, které se zobrazí po kliknutí na ikonu rozšíření v liště prohlížeče. Komunikuje s content skriptem a vizualizuje výsledky analýzy skóre.
* **Lexikon dat (`data/lexicon.json`)**: Konfigurační JSON soubor, který obsahuje databázi "clickbaitových" výrazů a seznam netradičních/rizikových domén nejvyššího řádu (TLD). Lze jej libovolně doplňovat za účelem výuky.

---

## 3. Postup instalace a zprovoznění

Vzhledem k tomu, že rozšíření zatím není publikováno v oficiálním Internetovém obchodě Chrome, je potřeba jej nainstalovat ručně v **režimu pro vývojáře**.

### Pro Google Chrome / Brave / Opera

1. Stáhněte si složku s projektem lokálně na svůj disk.
2. Otevřete prohlížeč a do adresního řádku zadejte: `chrome://extensions/`
3. V pravém horním rohu stránky zapněte přepínač **Vývojářský režim** (Developer mode).
4. V levém horním rohu se objeví nová tlačítka. Klikněte na **Načíst rozbalené** (Load unpacked).
5. V dialogovém okně vyberte složku s rozšířením (tu, ve které se nachází soubor `manifest.json`).
6. Rozšíření VeriCheck se objeví v seznamu nainstalovaných rozšíření.

### Pro Microsoft Edge

1. Otevřete prohlížeč a do adresního řádku zadejte: `edge://extensions/`
2. V levém dolním panelu zapněte přepínač **Režim vývojáře** (Developer mode).
3. V pravém horním rohu klikněte na tlačítko **Načíst rozbalené** (Load unpacked).
4. Vyberte složku s rozšířením obsahující `manifest.json`.
5. Rozšíření bude načteno do vašeho prohlížeče Edge.

---

## 4. Používání (Jak testovat)

1. Pro snadný přístup doporučujeme kliknout na ikonu "puzzle" v pravé horní liště prohlížeče a rozšíření VeriCheck si **připnout** (ikona špendlíku).
2. Otevřete libovolný článek na libovolném zpravodajském nebo bulvárním webu.
3. Klikněte na ikonu VeriCheck v liště prohlížeče.
4. Okamžitě se zobrazí výsledky analýzy daného obsahu společně se zdůvodněním a vysvětlujícími texty.

**Tip pro testování homografických útoků:** Otevřete si stránku `https://www.аррle.com` (pozor, některá písmena jsou z cyrilice) a zkuste spustit naše rozšíření.
