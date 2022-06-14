<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Speak Out Admin Panel</title>

    <link rel="stylesheet" href="/css/general.css">
    <link rel="stylesheet" href="/css/header.css">

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@5.15.4/css/fontawesome.min.css"
          integrity="sha384-jLKHWM3JRmfMU0A5x5AkjWkw/EYfGUAGagvnfryNV3F9VqM98XiIH7VBGVoxVSc7" crossorigin="anonymous">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/mdb-ui-kit/3.10.1/mdb.min.css" rel="stylesheet">

    <link rel="shortcut icon" href="/images/favicon.ico" type="image/ico">
</head>
<body>
<div>
    <#include "includes/modal/schema_create.ftl">
    <#include "includes/modal/word_create.ftl">
    <#include "includes/modal/confirm.ftl">
    <#include "includes/modal/message.ftl">

    <#include "includes/header.ftl">
    <content>
        <#include "includes/screen/home.ftl">
        <#include "includes/screen/word.ftl">
        <#include "includes/screen/schema.ftl">
    </content>
</div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/js/bootstrap.bundle.min.js"></script>
<script src="https://kit.fontawesome.com/926f077d93.js" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/mdb-ui-kit/3.10.1/mdb.min.js"></script>

<script src="scripts/general.js"></script>
<script src="scripts/word.js"></script>
<script src="scripts/home.js"></script>
<script src="scripts/schema.js"></script>
<script src="scripts/confirm.js"></script>
<script src="scripts/message.js"></script>
<script src="scripts/word_autocomplete.js"></script>
</body>
</html>