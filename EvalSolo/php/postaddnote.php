<?php
require_once("veriftoken.php");
require_once("connexion.php");
if (!isset($_POST['matiere']) || !isset($_POST['eleve']) || !isset($_POST['note'])) {
    header("Location: home.php");
} else {
    if (!isset($_GET['id'])) {
        $query = $pdo->prepare("INSERT INTO `note`(`professeurID`, `etudiantID`, `matiereID`, `resultat`) VALUES (:prof , :etudiant , :matiere , :resultat)");
        $query->execute(array(':prof' => $_SESSION['id'], ':etudiant' => $_POST['eleve'], ':matiere' => $_POST['matiere'], ':resultat' => $_POST['note']));
    } else {
        $query = $pdo->prepare("UPDATE `note` SET `professeurID` = :prof , `etudiantID` = :etudiant , `matiereID`= :matiere , `resultat` = :resultat  WHERE id= :id");
        $query->execute(array(':prof' => $_SESSION['id'], ':etudiant' => $_POST['eleve'], ':matiere' => $_POST['matiere'], ':resultat' => $_POST['note'], ':id' => $_GET['id']));
    }
    header("Location: seenote.php");
}
