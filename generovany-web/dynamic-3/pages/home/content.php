<h1>SmartCook</h1>
<div class="articles">
    <?php
    $pages = [];
    foreach (scandir('pages') as $dir) {
        if ($dir == '.' || $dir == '..') {
            continue;
        }
        $data = json_decode(file_get_contents('pages/' . $dir . '/data.json'), true);
        if ($data["type"] == "article") {
            $pages[$data["date"] . '-' . $data["url"]] = $data;
        }
    }
    krsort($pages);
    foreach ($pages as $p) {
        echo '<a href="?p=' . $p["url"] . '">';
        echo '<h2>' . $p["title"] . '</h2>';
        echo '<p>' . $p["description"] . '</p>';
        echo '</a>';
    }
    ?>
</div>