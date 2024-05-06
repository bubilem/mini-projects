<?php
$get_p = filter_input(INPUT_GET, "p", FILTER_SANITIZE_URL);
if ($get_p) {
    if (!is_dir("pages/$get_p")) {
        $get_p = "error";
    }
} else {
    $get_p = "home";
}
$page = json_decode(file_get_contents("pages/$get_p/data.json"), true);
