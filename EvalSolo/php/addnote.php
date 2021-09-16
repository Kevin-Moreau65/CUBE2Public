<?php
require_once("veriftoken.php");
require_once("connexion.php");
require_once("header.php");
$ID = "";
$modify = false;
if (isset($_GET['id'])) {
    $modify = true;
    $ID = "?id=" . $_GET['id'];
    $querymodify = $pdo->prepare("SELECT * FROM `note` WHERE id= :id");
    $querymodify->execute(array(':id' => $_GET['id']));
    $arraymodify = $querymodify->fetchAll();
    $arraymodify = $arraymodify[0];
    if ($arraymodify['professeurID'] !== $_SESSION['id']) {
        header("Location: home.php");
    }
    $IDeleve = $arraymodify['etudiantID'];
    $IDmatiere = $arraymodify['matiereID'];
    $NoteMOD = $arraymodify['resultat'];
}
$matiere = $pdo->prepare("SELECT * FROM `matiereprofesseur` INNER JOIN `matiere` ON `matiereprofesseur`.matiereID = `matiere`.id WHERE professeurID= :id");
$matiere->execute(array(':id' => $_SESSION['id']));
$arraymatiere =  $matiere->fetchAll();
$optionmatiere = "";
foreach ($arraymatiere as $result) {
    $valuematiere = $result[3];
    $nommatiere = $result['nom'];
    if ($modify && $valuematiere === $IDmatiere) {
        $option = '<option value="' . $valuematiere . '" selected>' . $nommatiere . '</option>';
    } else {
        $option = '<option value="' . $valuematiere . '">' . $nommatiere . '</option>';
    }
    $optionmatiere .= $option;
}
$eleve = $pdo->query("SELECT * FROM `etudiant`");
$arrayeleve = $eleve->fetchAll();
$optioneleve = "";
foreach ($arrayeleve as $result) {
    $valueeleve = $result['id'];
    $nomeleve = $result['prenom'] . " " . $result['nom'];
    if ($modify && $valueeleve === $IDeleve) {
        $option = '<option value="' . $valueeleve . '" selected>' . $nomeleve . '</option>';
    } else {
        $option = '<option value="' . $valueeleve . '">' . $nomeleve . '</option>';
    }
    $optioneleve .= $option;
}
echo '<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <form action="postaddnote.php' . $ID . '" method="POST">
        <div>
        <label for="matiere">Matière</label>
    <select type="text" name="matiere" id="matiere" required>
    ' . $optionmatiere . '
        </select>
    </div>
    <div>
        <label for="eleve">Elève</label>
    <select type="text" name="eleve" id="eleve" required>
    ' . $optioneleve . '
        </select>
        <label for="note">Note</label>
    <select type="text" name="note" id="note" required>
        <option value="A">A</option>
        <option value="B">B</option>
        <option value="C">C</option>
        <option value="D">D</option>
        </select>
    </div>
    <button type="submit">Envoyer</button>
    </form>
</body>
</html>';
