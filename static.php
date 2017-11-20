<?php

// print_r($_SERVER);

$pageUrl = 'http://'.$_SERVER['SERVER_NAME'].$_SERVER['REQUEST_URI'];

$parts = explode('/', $_SERVER['REQUEST_URI']);

?>
<!doctype html>
<html>
<head>
    <title>Como cuando</title>
    <!-- You can use open graph tags to customize link previews.
    Learn more: https://developers.facebook.com/docs/sharing/webmasters -->
    <meta property="og:url"           content="<?=$pageUrl?>">
    <meta property="og:type"          content="website">
    <meta property="og:title"         content="Como cuando">
    <meta property="og:description"   content="Juego emocional en línea. Elige un video y un audio para ver, lee las historias y escribe la tuya.">
    <meta property="og:image"         content="http://<?=$_SERVER['SERVER_NAME']?>/data/share-images/<?=$parts[1]?>.jpg">
    <meta property="fb:app_id" 		  content="297911203988402">
    <!-- <meta http-equiv="refresh" content="0;url=<?=$pageUrl?>"> -->
</head>
<body></body>
</html>