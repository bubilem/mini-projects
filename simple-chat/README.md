# Simple chat

Simple live web chat application

## Run

### Server

```
npm install
npm run dev
```

### Client

1. Run internet browser.
2. Put localhost IP address `127.0.0.1:3333` or `localhost:3333`.
3. Write messages.
4. Run another browser...

## NPM Quick Manual

### 1. **Inicializace projektu**

- **`npm init`** nebo **`npm init -y`**: Vytvoří nový `package.json` soubor. Příkaz `-y` přeskočí otázky a použije výchozí hodnoty.

### 2. **Instalace modulů**

- **`npm install <module_name>`**: Nainstaluje balíček a přidá jej do `package.json` jako závislost.
- **`npm install <module_name> --save-dev`**: Nainstaluje balíček a přidá jej do `devDependencies` (používá se hlavně pro vývojové nástroje, které nejsou nutné v produkci).
- **`npm install`**: Nainstaluje všechny závislosti uvedené v `package.json` (používá se po naklonování projektu).

### 3. **Spuštění projektu**

- **`npm start`**: Spustí projekt podle příkazu `start` definovaného v `package.json`.
- **`npm run dev`**: Běžně se používá pro spuštění projektu v režimu vývoje, často s `nodemon` pro automatické restartování serveru.

### 4. **Odstranění modulů**

- **`npm uninstall <module_name>`**: Odstraní balíček a odebere jej z `package.json`.

### 5. **Aktualizace a audit závislostí**

- **`npm update`**: Aktualizuje všechny závislosti na nejnovější verze podle pravidel v `package.json`.
- **`npm audit`**: Kontroluje bezpečnostní problémy ve verzích závislostí.
- **`npm audit fix`**: Automaticky opraví bezpečnostní problémy, pokud jsou dostupné opravy.

### 6. **Odstranění všech závislostí a přeinstalování**

- **`rm -rf node_modules`**: Odstraní složku `node_modules`.
- **`npm install`**: Přeinstaluje všechny závislosti podle `package.json`.

### 7. **Správa verzí**

- **`npm outdated`**: Zobrazí seznam balíčků, které mají k dispozici novější verze.
- **`npm install <module_name>@<version>`**: Instaluje konkrétní verzi balíčku. Například `npm install express@4.17.1`.
