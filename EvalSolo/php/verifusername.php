<?php
require_once('connexion.php');
session_start();
if (isset($_POST['email']) && isset($_POST['password'])) {
    $email = $_POST['email'];
    $pwd = $_POST['password'];
    $query = $pdo->prepare("SELECT * FROM `professeur` WHERE `email`= :email AND `mdp`= :mdp");
    $query->execute(array(':email' => $email, ':mdp' => $pwd));
    $result = $query->fetchAll();
    if (count($result) === 0) {
        header("Location: login.php");
    } else {
        $_SESSION['token'] = "CESI";
        $_SESSION['nom'] = $result[0]['nom'];
        $_SESSION['id'] = $result[0]['id'];
        $_SESSION['prenom'] = $result[0]['prenom'];
        header("Location: home.php");
    }
} else {
    header("Location: login.php");
}
