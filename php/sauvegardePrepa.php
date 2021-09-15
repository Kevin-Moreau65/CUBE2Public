<?php
require_once('connexion.php');
$array = json_decode($_POST['DOM']);
$TeamDOM = $_POST['EquipeDOM'];
$TeamEXT = $_POST['EquipeEXT'];
$id = $_POST['id'];
$success = [];
$alt = $_POST['alt'];
if (isset($alt) && isset($id) && isset($array) && isset($_POST['EXT'])) {
    if (!($prep = $mysqli->prepare("insert into titulaire (Id_Joueurs, `Match`, `Joue?`, `Position?`, `Capitaine`, `Equipe`) VALUES (?, ?, ?, ?, ?, ?)"))) {
        echo "Échec de la préparation : (" . $mysqli->errno . ") " . $mysqli->error;
    }
    for ($i = 0; $i < 11; $i++) {
        $x = $i;
        $x++;
        $play = 1;
        if ($array[$i] === $array[12]) {
            $cap = 1;
            $prep->bind_param("iiiiii", $array[$i], $id, $play, $x, $cap, $TeamDOM);
        } else {
            $cap = 0;
            $prep->bind_param("iiiiii", $array[$i], $id, $play, $x, $cap, $TeamDOM);
        }
        $prep->execute();
    }
    $prep->close();
    if (!($prep = $mysqli->prepare("insert into titulaire (Id_Joueurs, `Match`, `Joue?`, `Equipe`) VALUES (?, ?, ?, ?)"))) {
        echo "Échec de la préparation : (" . $mysqli->errno . ") " . $mysqli->error;
    }
    for ($i = 0; $i < sizeof($array[13]); $i++) {
        $play = 0;
        $prep->bind_param("iiii", $array[13][$i], $id, $play, $TeamDOM);
        $prep->execute();
    }
    $prep->close();
    if (!($prep = $mysqli->prepare("insert into titulaire (Id_Joueurs, `Match`, `Joue?`, `Position?`, `Capitaine`, `Equipe`) VALUES (?, ?, ?, ?, ?, ?)"))) {
        echo "Échec de la préparation : (" . $mysqli->errno . ") " . $mysqli->error;
    }
    $array = json_decode($_POST['EXT']);
    for ($i = 0; $i < 11; $i++) {
        $x = $i;
        $x++;
        $play = 1;
        if ($array[$i] === $array[12]) {
            $cap = 1;
            $prep->bind_param("iiiiii", $array[$i], $id, $play, $x, $cap, $TeamEXT);
        } else {
            $cap = 0;
            $prep->bind_param("iiiiii", $array[$i], $id, $play, $x, $cap, $TeamEXT);
        }
        $prep->execute();
    }
    $prep->close();
    if (!($prep = $mysqli->prepare("insert into titulaire (Id_Joueurs, `Match`, `Joue?`, `Equipe`) VALUES (?, ?, ?, ?)"))) {
        echo "Échec de la préparation : (" . $mysqli->errno . ") " . $mysqli->error;
    }
    for ($i = 0; $i < sizeof($array[13]); $i++) {
        $play = 0;
        $prep->bind_param("iiii", $array[13][$i], $id, $play, $TeamEXT);
        $prep->execute();
    }
    $prep->close();
    $query = "UPDATE `match` SET `fait?`=1, `Alternatif?`=" . $alt . " WHERE Id=" . $id;
    mysqli_query($conn, $query);
}
