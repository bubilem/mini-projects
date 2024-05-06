<!DOCTYPE html>
<html lang="en">

<head>
  <base href="http://www/2023-2024/_work/generovany-web/dynamic-1/" />
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>SmartCook</title>
  <link rel="stylesheet" href="css/style.min.css" />
</head>

<body>
  <header>
    <p><b>SmartCook</b></p>
    <p>Projekt Erasmus+ SmartCook for better food in your life</p>
  </header>
  <div>
    <main>
      <?php
      if (isset($_GET["p"])) {
        include "pages/" . $_GET["p"] . "/content.php";
      } else {
        include "parts/home.php";
      }
      ?>
    </main>
    <?php include "parts/aside.php"; ?>
  </div>
  <footer>
    <p>&copy; 2024 SmartCook</p>
  </footer>
</body>

</html>