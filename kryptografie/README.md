# Téma: Kryptografie

_řešení žákovské závěrečné práce z vývoje software_

duben 2024, Michal Bubílek

## Statický web

### Zadání

_Vytvořte webovou stránku, která bude reprezentovat vámi zvolené tři šifry. Může se jednat o velmi jednoduché šifry jako je například substituční šifra „Caesar“, nebo transpoziční šifra „Slova pozpátku“ atp. Abecedu si můžete zjednodušit na velké znaky A-Z. Ke každé šifře uveďte její název, popis, popis postupu šifrování/dešifrování, zdrojový kód. Na webu bude také možnost online zašifrovat/dešifrovat návštěvníkem zadaný text do textového pole. Navrhněte rozložení jednotlivých prvků webu. K realizaci použijte HTML, CSS a JavaScript. Webová stránka bude
moderní, responzivní, validní, přístupná, SEO optimalizovaná, performance optimalizovaná a bude mít edukační charakter._

### Řešení

- [Řešení webové stránky](web/web.md)

## Databáze

### Zadání

_Navrhněte databázi, ve které se budou evidovat nalezené zašifrované texty. Tento entitní typ budeme evidovat jako „message“ a u každého bude patrné co (obsah šifrované zprávy), kdy (datum a čas) a kde (GPS souřadnice) se nalezl a budou nést nějaké desetiznakové označení (např.: 2024-A-001). Tyto texty se budou kryptoanalytici pokoušet dešifrovat a každý takovýto pokus o dešifrování se bude zaznamenávat do databáze. O pokusu se bude evidovat, kdo jej provedl, kdy jej provedl, jak dlouho prací kryptoanalytik strávil, popis práce kryptoanalytika a informace, povedlo-li se šifrovaný text nakonec tímto pokusem rozšifrovat. Databázi navrhněte v db.md jako tabulky entitních typů. Sloupce tabulky: název atributu, datový typ, klíče, modifikátory integritního omezení._

### Řešení

- [Návrh databáze a řešení SQL dotazů](dat/dat.md)
- [SQL skript pro vytvoření tabulek](dat/create.sql)
- [SQL kompletní databáze - struktura i data](dat/backup.sql)

## Program

_Mějme problém šifrování pomocí šifrovací mřížky. Jedná se o transpoziční šifru, kde se pozice písmen v šifrovaném textu určuje dle otvorů v mřížce.
Mějme například miniaturní mřížku 2x2, která má otvor v pravém horním rohu. Zapsat ji můžeme například jako matici:_

```
10
11
```

_Nula značí otvor, do kterého můžeme psát. Písmena bereme z nešifrovaného textu postupně zleva. Vyčerpáme-li všechny otvory mřížky, kam vstupní písmena zapisujeme také zleva postupně po řádcích dolů, tak mřížku o 90° otočíme. Takto postupujeme do té doby, až mřížku otočíme 4x a tím pádem ji dostaneme do původního stavu. Nyní mřížku posuneme o celou svou šířku doprava a vše opakujeme._

Kompletní popis včetně příkladu najdeme v dokumentaci se zadáním.

### Zadání

Pro výše uvedený algoritmus napište program, který bude obsahovat:

1. Funkci na načtení mřížky 2x2 a mřížky 4x4 ze souboru. Formát souboru si zvolte sami.
2. Funkci na otočení mřížky o 90°. (Nápověda: transpozice matice + reverse řádků)
3. Funkci na otestování validnosti mřížky. Zdali mřížka po 4x rotaci nezapisuje vícekrát do stejného místa.
4. Funkci na zašifrování textu dle vybrané mřížky.

### Řešení

- [Řešení šifrování pomocí mřížky](prg/prg.md)
