<?php
require_once("veriftoken.php");
require_once("header.php");
require_once("connexion.php");
$query = $pdo->prepare("SELECT * FROM `etudiant`");
$query->execute(array(':id' => $_SESSION['id']));
$arrayquery = $query->fetchAll();
$resultlist = "";
foreach ($arrayquery as $result) {
    $nom = $result['prenom'] . " " . $result['nom'];
    $eleveID = $result['id'];
    $option = '<div> <a href="seenote.php?el=' . $eleveID . '">' . $nom . ' </a></div>';
    $resultlist .= $option;
}
echo $resultlist;
