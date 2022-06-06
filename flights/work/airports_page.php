<!DOCTYPE html>
<html lang="cs">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Letiště</title>
    <link rel="stylesheet" href="./css/style.min.css">
</head>

<body>
    <header>
        <h1>Letiště</h1>
        <p>Výpis letišť z databáze</p>
    </header>
    <main>
        <?php
        $con = @mysqli_connect("127.0.0.1", "root", "", "flights");
        if ($con == false) {
            die("Can't connect to DBMS.");
        }
        $result = mysqli_query($con, "SELECT * FROM airport");
        if ($result != false) {
            echo '<table>' . PHP_EOL;
            echo '<tr><th>kód</th><th>název</th></tr>' . PHP_EOL;
            while (!empty($row = mysqli_fetch_array($result, MYSQLI_ASSOC))) {
                echo '<tr>';
                echo '<td><strong>' . $row['code'] . '</strong></td>';
                echo '<td>' . $row['name'] . '</td>';
                echo '</tr>' . PHP_EOL;
            }
            echo '</table>' . PHP_EOL;
        }
        ?>
    </main>
    <footer>
        <p>&copy;Bubílek 2022 </p>
    </footer>
    <script src="js/script.js"></script>
</body>

</html>