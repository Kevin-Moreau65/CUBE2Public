<?php
session_start();
if (isset($_SESSION['token'])) {
    if ($_SESSION['token'] === "CESI") {
        header("Location : home.php");
    }
} else {
    echo '<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
        <form action="verifusername.php" method="POST">
            <div>
            <label for="email">Enter votre email: </label>
        <input type="text" name="email" id="email" required>
        </div>
        <div>
            <label for="password">Veuilez entrer votre mot de passe: </label>
        <input type="password" name="password" id="password" required>
        </div>
        <button type="submit">Envoyer</button>
        </form>
    </body>
    </html>';
}
