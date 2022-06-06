<?php
$db = @mysqli_connect(
    "127.0.0.1",
    "root",
    "",
    "flights",
    "3306"
);
if ($db === false) {
    return "[]";
}
mysqli_query($db, "SET CHARACTER SET UTF8");
$result = mysqli_query(
    $db,
    "SELECT f.code 'flight', DATE_FORMAT(from_dttm, '%H:%i') 'time', name 'destination', gate_code 'gate', state 
    FROM flight f JOIN airport a ON to_airport_code = a.code
    WHERE from_airport_code = 'PRG' AND from_dttm >= NOW() - INTERVAL 1 minute
    ORDER BY from_dttm ASC
    LIMIT 8"
);
$flights = [];
while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
    $flights[] = $row;
}
echo json_encode($flights, JSON_PRETTY_PRINT);
