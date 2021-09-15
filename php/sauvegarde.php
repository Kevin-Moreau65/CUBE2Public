<?php
require_once('connexion.php');
$date = new dateTime($_POST['date']);
if (!isset($_POST['id'])) {
    $query = "INSERT INTO `match`(`Id_équipe_Domicile`, `Id_équipe_Exterieur`, `Id_Arbitre_Principal`, `Id_Arbitre_1`, `Id_Arbitre_2`, `Date`, `Lieu`, `fait?`) VALUES (
    " . $_POST['teamDOM'] . "," . $_POST['teamEXT'] . "," . $_POST['arbitre1'] . "," . $_POST['arbitre2'] . "," . $_POST['arbitre3'] . ",'" . $date->format('Y-m-d') . "'," . $_POST['stade'] . ", 0)";
} else {
    $query = "UPDATE `match` SET `Id_équipe_Domicile` = " . $_POST['teamDOM'] . ", `Id_équipe_Exterieur` = " . $_POST['teamEXT'] . ", `Id_Arbitre_Principal` = " . $_POST['arbitre1'] . ", `Id_Arbitre_1` = " . $_POST['arbitre2'] . ", `Id_Arbitre_2` = " . $_POST['arbitre3'] . ", `Date` = '" . $date->format('Y-m-d') . "', `Lieu` = " . $_POST['stade'] . " WHERE Id=" . $_POST['id'];
}
mysqli_query($conn, $query);
$last_id = mysqli_insert_id($conn);
echo $last_id;
