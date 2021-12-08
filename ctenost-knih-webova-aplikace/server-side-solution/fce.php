<?php
function saveFormData()
{
    $age = filter_input(INPUT_GET, "age", FILTER_SANITIZE_NUMBER_INT);
    $books = filter_input(INPUT_GET, "books", FILTER_SANITIZE_NUMBER_INT);
    if (!empty($age) && !empty($books)) {
        $file = fopen("data.csv", "a");
        if (fwrite($file, "$age;$books\n")) {
            echo "<div class=\"mess\">Děkujeme. Data ($age,$books) jsme uložili.</p>";
        }
        fclose($file);
    }
}

function generateDataFromFile(): array
{
    $data = [];
    $content = file_get_contents("data.csv");
    $rows = explode("\n", $content);
    foreach ($rows as $row) {
        if (empty($row)) {
            continue;
        }
        $rowArray = explode(";", $row);
        $age = $rowArray[0];
        $books = $rowArray[1];
        $actualBooks = (empty($data[$age]) || empty($data[$age]['books']) ? 0 : $data[$age]['books']);
        $actualCount = (empty($data[$age]) || empty($data[$age]['count']) ? 0 : $data[$age]['count']);
        $data[$rowArray[0]] = [
            'books' => $actualBooks + $books,
            'count' => $actualCount + 1
        ];
    }
    ksort($data);
    return $data;
}

function generateTable(array $data)
{
?>
    <table>
        <tr>
            <th>věk</th>
            <th>počet lidí</th>
            <th>knih přečteno</th>
            <th>knih přečteno na člověka</th>
        </tr>
        <?php
        foreach ($data as $age => $info) {
            echo "<tr>";
            echo "<td>$age</td>";
            echo "<td>" . $info['count'] . "</td>";
            echo "<td>" . $info['books'] . "</td>";
            echo "<td>" . round($info['books'] / $info['count'], 1) . "</td>";
            echo "</tr>\n";
        }
        ?>
    </table>
<?php
}
