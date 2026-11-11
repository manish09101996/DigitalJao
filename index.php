<?php
$uri = urldecode(
    parse_url($_SERVER['REQUEST_URI'] ?? '', PHP_URL_PATH) ?? ''
);

// Strip /DigitalJao prefix
$subPath = preg_replace('#^/DigitalJao/?#i', '', $uri);

header('Location: /DigitalJao/public/' . $subPath, true, 302);
exit;
