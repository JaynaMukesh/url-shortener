<?php
require_once('./db.php');
require("./wxp.php");
$App = new WebxsparkAPP();
//redirect to the requested link
if (isset($_GET)) {
    foreach ($_GET as $key => $val) {
        $URL_ID = $key;
        $URL_ID = str_replace('/', '', $URL_ID);
    }
    $redir = $App->redirectURL($conn, $URL_ID);
    if (!$redir) {
        die('<style>#nojs-banner{bottom:0;left:0;padding:16px 16px 16px 32px;width:100%;box-sizing:border-box;background:red;color:#fff;font-family:-apple-system,"Segoe UI",Roboto,Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";font-size:13px;line-height:13px}#nojs-banner a{color:inherit;text-decoration:underline}</style><div id="nojs-banner">404 - Link Not Found!</div>');
    } else {
        header("Location: {$redir['url']}");
        exit();
    }
}
if (empty($_REQUEST)) {
    echo "<script>window.location.replace('https://webxspark.com')</script>;";
}
