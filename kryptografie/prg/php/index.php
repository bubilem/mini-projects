<?php
require "Grid.php";

echo $grid = (new Grid)->load("grid4x4.json");
echo "Validní: " . ($grid->validate() ? "Ano" : "Ne") . "\n";

$text = "Krypto";
echo $grid->encrypt($text) . "\n";

$text = "Ahoj, jak se tady zakum v cryptodilne vede?";
echo $grid->encrypt($text) . "\n";