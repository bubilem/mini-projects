<?php
$page = filter_input(INPUT_GET, "p", FILTER_SANITIZE_URL);
if ($page) {
    if (!file_exists("pages/$page/content.php")) {
        $page = "error";
    }
} else {
    $page = "home";
}