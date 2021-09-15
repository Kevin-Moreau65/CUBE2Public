<?php

// connexion à la bdd 
require_once("connexion.php");

// déclaration des variables 
$joueursTAB = json_decode($_POST['joueursTAB']);
print_r($joueursTAB);
$team = ($_POST['team']);
print_r($team);


$addteam = "INSERT INTO `equipe` (Nom, CheminMaillotDom, CheminMaillotExt, CheminMaillotNeutre, CheminLogo) VALUES ('" . $team . "','/Site web/img/maillot-noir.png','/Site web/img/maillot-blanc.png','/Site web/img/maillot-bleu.png','/Site web/img/logo-ballon.png')";
mysqli_query($conn, $addteam);
$last_id = mysqli_insert_id($conn);
// requete préparée : préparation 
$prep = $mysqli->prepare("INSERT INTO joueurs(nom, numero, poste, equipe ) VALUES (?,?,?,?)");
// requête préparée : liaison des valeurs et exécution de la requête 
foreach ($joueursTAB as $joueur) {
    $prep->bind_param("sisi", $joueur[0], $joueur[1], $joueur[2], $last_id);
    $prep->execute();
}

