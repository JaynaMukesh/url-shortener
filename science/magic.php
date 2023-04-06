<?php
require_once './db.php';
require './wxp.php';
$App = new WebxsparkAPP();
$data = [];

if (isset($_REQUEST["insert"])) {
    if (isset($_REQUEST['url'])) {
        $data = $App->newURLInsert($conn, $_REQUEST['url']);
    }
}

header("Content-type: application/json");
echo json_encode($data, JSON_PRETTY_PRINT);
