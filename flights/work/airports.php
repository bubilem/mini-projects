<?php
$con = @mysqli_connect("127.0.0.1", "root", "", "flights");
if ($con == false) {
    exit;
}
$result = mysqli_query($con, "SELECT * FROM airport");
if ($result == false) {
    exit;
}
$airports = [];
while (!empty($row = mysqli_fetch_array($result, MYSQLI_ASSOC))) {
    $airports[] = [
        'code' => $row['code'],
        'name' => $row['name']
    ];
}
echo json_encode($airports);
