<?php
require_once("veriftoken.php");
require_once("connexion.php");
require_once("header.php");
$query = $pdo->prepare("SELECT * FROM `note` INNER JOIN `etudiant` ON `note`.etudiantID = `etudiant`.id WHERE professeurID= :id");
$mat = false;
$el = false;
if (isset($_GET['mat'])) {
    $mat = true;
}
if (isset($_GET['el'])) {
    $el = true;
}
$query->execute(array(':id' => $_SESSION['id']));
$arrayquery = $query->fetchAll();
$listnote = "";
foreach ($arrayquery as $result) {
    $id = $result[0];
    $note = $result['resultat'];
    $eleve = $result['prenom'] . " " . $result['nom'];
    $querymatiere = $pdo->query("SELECT * FROM `matiere` WHERE id=" . $result['matiereID']);
    $arraymatiere = $querymatiere->fetchAll();
    $matiere = $arraymatiere[0]['nom'];
    $option = '<div style="display: flex;flex-direction: row;justify-content: space-around;"> <h3> ' . $eleve . ' </h3> <h3> ' . $matiere . ' </h3> <h3> ' . $note . ' </h3> <a href="addnote.php?id=' . $id . '"> Modifier </a> <a href="deletenote.php?id=' . $id . '"> Supprimer </a></div> </br>';
    if ($el) {
        if ($_GET['el'] === $result['etudiantID']) {
            $listnote .= $option;
        }
    } else if ($mat) {
        if ($_GET['mat'] === $result['matiereID']) {
            $listnote .= $option;
        }
    } else {
        $listnote .= $option;
    }
}
echo $listnote;
