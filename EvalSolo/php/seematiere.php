<?php
require_once("veriftoken.php");
require_once("header.php");
require_once("connexion.php");
$query = $pdo->prepare("SELECT * FROM `matiereprofesseur` INNER JOIN `matiere` ON `matiereprofesseur`.matiereID = `matiere`.id WHERE professeurID= :id");
$query->execute(array(':id' => $_SESSION['id']));
$arrayquery = $query->fetchAll();
$resultlist = "";
foreach ($arrayquery as $result) {
    $nom = $result['nom'];
    $matiereID = $result['matiereID'];
    $option = '<div> <a href="seenote.php?mat=' . $matiereID . '">' . $nom . ' </a></div>';
    $resultlist .= $option;
}
echo $resultlist;
