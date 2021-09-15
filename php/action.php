<?php
require_once('connexion.php');
$array = [];
$array['DOM'] = [];
$array['EXT'] = [];
$array['DOM']['but'] = [];
$array['EXT']['but'] = [];
$array['DOM']['sortie'] = [];
$array['EXT']['sortie'] = [];
$array['DOM']['remplacement'] = [];
$array['EXT']['remplacement'] = [];
$array['DOM']['faute'] = [];
$array['EXT']['faute'] = [];
$array['fin'] = [];
if (isset($_POST['id'])) {
    $query = mysqli_query($conn, "SELECT * FROM `match` WHERE Id=" . $_POST['id']);
    $match = mysqli_fetch_assoc($query);
    $EquipeDOM = $match['Id_équipe_Domicile'];
    $EquipeEXT = $match['Id_équipe_Exterieur'];
    $query = $mysqli->query("SELECT * FROM but WHERE `Match`=" . $_POST['id']);
    if ($query) {
        while ($but = $query->fetch_assoc()) {
            if ($but['Equipe'] == $EquipeDOM) {
                array_push($array['DOM']['but'], $but);
            } else {
                array_push($array['EXT']['but'], $but);
            }
        }
    }
    $query = $mysqli->query("SELECT * FROM `sortie` WHERE `Match`=" . $_POST['id']);
    if ($query) {
        while ($sortie = $query->fetch_assoc()) {
            if ($sortie['Equipe'] == $EquipeDOM) {
                if ($sortie['Catégorie'] !== "Remplacement") {
                    array_push($array['DOM']['sortie'], $sortie);
                } else {
                    array_push($array['DOM']['remplacement'], $sortie);
                }
            } else {
                if ($sortie['Catégorie'] !== "Remplacement") {
                    array_push($array['EXT']['sortie'], $sortie);
                } else {
                    array_push($array['EXT']['remplacement'], $sortie);
                }
            }
        }
    }
    $query = $mysqli->query("SELECT * FROM `fautes` WHERE `Match`=" . $_POST['id']);
    if ($query) {
        while ($faute = $query->fetch_assoc()) {
            if ($faute['Equipe'] == $EquipeDOM) {
                array_push($array['DOM']['faute'], $faute);
            } else {
                array_push($array['EXT']['faute'], $faute);
            }
        }
    }
}
$query = $mysqli->query("SELECT `Duree` FROM `match` WHERE `Id`=" . $_POST['id']);
while ($fin = $query->fetch_assoc()) {
    array_push($array['fin'], $fin);
}
print_r(utf8_encode(json_encode($array)));
