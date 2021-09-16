<?php
require_once("veriftoken.php");
require_once("connexion.php");
if (isset($_GET['id'])) {
    $query = $pdo->prepare("DELETE FROM `note`WHERE id= :id");
    $query->execute(array(':id' => $_GET['id']));
    header("Location: home.php");
}
