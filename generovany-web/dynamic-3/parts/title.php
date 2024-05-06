<?php
echo implode(
    " - ",
    array_filter(
        [
            empty($page['title']) ? null : $page['title'],
            "SmartCook"
        ]
    )
);
