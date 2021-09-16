<?php
require_once("veriftoken.php");
require_once("header.php");
$addnote = "'/EvalSolo/php/addnote.php'";
$seenote = "'/EvalSolo/php/seenote.php'";
$seematiere = "'/EvalSolo/php/seematiere.php'";
$seeeleve = "'/EvalSolo/php/seeeleve.php'";
echo  '<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h1>Bonjour ' . $_SESSION['prenom'] . ' ' . $_SESSION['nom'] . '</h1>
    <button onclick="location.href=' . $addnote . '">Ajouter une note</button>
    <button onclick="location.href=' . $seenote . '">Voir les notes</button>
    <button onclick="location.href=' . $seematiere . '">Voir les matières</button>
    <button onclick="location.href=' . $seeeleve . '">Voir les élèves</button>
</body>
</html>';
