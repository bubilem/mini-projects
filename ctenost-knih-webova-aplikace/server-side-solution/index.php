<?php require "fce.php"; ?>
<!DOCTYPE html>
<html lang="cs">

<head>
    <title>Čtenost knih (PHP)</title>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link href="../css/style.css" rel="stylesheet" type="text/css" />
</head>

<body>
    <header>
        <h1>Statistika čtenosti knih</h1>
        <p>Server-side PHP řešení s ukládáním dat na serveru v CSV souboru.</p>
    </header>
    <main>
        <?php
        saveFormData();
        ?>
        <form action="index.php" method="GET">
            <label for="age">Věk [roky]</label>
            <input id="age" name="age" type="number" min="1" max="120" step="1" required>
            <label for="books">Počet přečtených knih [kusy]</label>
            <input id="books" name="books" type="number" min="1" max="999" step="1" required>
            <p></p>
            <input class="btn" type="submit" value="Odeslat informace">
        </form>
        <article>
            <h2>Přehled celkově přečtených knih <a class="btn" href="index.php">reload</a></h2>
            <?php
            generateTable(generateDataFromFile());
            ?>
        </article>

    </main>
    <footer>
        <p>2021 Michal Bubílek, VOŠ, SPŠ a SOŠ Varnsdorf</p>
    </footer>
    <script src="script.js"></script>
</body>

</html>