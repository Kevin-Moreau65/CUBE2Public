<?php
require_once('connexion.php');
$data = json_decode($_POST["donnee"]);
$array = $data->array;
$but = [];
$faute = [];
$sortie = [];
$remplacement = [];
$fin = [];
$isSortie = false;
$isBut = false;
$isFaute = false;
$isRemp = false;
$isFin = false;
$delete = "DELETE FROM `but` WHERE `Match` = " . $_POST['id'] . ";";
$mysqli->query($delete);
print_r($mysqli->affected_rows);
$delete = "DELETE FROM `sortie` WHERE `Match` = " . $_POST['id'] . ";";
$mysqli->query($delete);
print_r($mysqli->affected_rows);
$delete = "DELETE FROM `fautes` WHERE `Match` = " . $_POST['id'] . ";";
$mysqli->query($delete);
print_r($mysqli->affected_rows);
$query = "SELECT * FROM `match` WHERE Id=" . $_POST['id'];
$result = $mysqli->query($query);
print_r($mysqli->affected_rows);
while ($match = $result->fetch_assoc()) {
    $IDDOM = $match['Id_équipe_Domicile'];
    $IDEXT = $match['Id_équipe_Exterieur'];
}
foreach ($array as $action) {
    if ($action->actionValue === "0") {
        array_push($but, $action);
        $isBut = true;
    } else if ($action->actionValue === "1") {
        array_push($faute, $action);
        $isFaute = true;
    } else if ($action->actionValue === "2") {
        array_push($remplacement, $action);
        $isRemp = true;
    } else if ($action->actionValue === "3") {
        array_push($sortie, $action);
        $isSortie = true;
    } else if ($action->actionValue === "4") {
        array_push($fin, $action);
        $isFin = true;
    }
}
if ($isBut) {
    $prep = $mysqli->prepare("INSERT INTO `but`(`Id_Joueurs`, `Date`, `Match`, `Equipe`) VALUES (?, ?, ?, ?)");
    foreach ($but as $action) {
        if ($action->cote === "ActionDomicile") {
            $prep->bind_param("iiii", $action->joueurValue, $action->temps, $_POST['id'], $IDDOM);
        } else {
            $prep->bind_param("iiii", $action->joueurValue, $action->temps, $_POST['id'], $IDEXT);
        }
        $prep->execute();
    }
    $prep->close();
}
if ($isFaute) {
    $prep = $mysqli->prepare("INSERT INTO `fautes`(`Id_Joueurs`, `Catégorie`, `Match`, `Equipe`, `Temps`) VALUES (?, ?, ?, ?, ?)");
    foreach ($faute as $action) {
        if ($action->cote === "ActionDomicile") {
            $prep->bind_param("isiii", $action->joueurValue, $action->action, $_POST['id'], $IDDOM, $action->temps);
        } else {
            $prep->bind_param("isiii", $action->joueurValue, $action->action, $_POST['id'], $IDEXT, $action->temps);
        }
        $prep->execute();
    }
    $prep->close();
}
if ($isSortie) {
    $prep = $mysqli->prepare("INSERT INTO `sortie`(`Joueur_sortant`,`Joueur_rentrant`,`Catégorie`,`Match`,`Equipe`,`Temps_du_match`) VALUES (?, null, ?, ?, ?, ?)");
    foreach ($sortie as $action) {
        if ($action->cote === "ActionDomicile") {
            $prep->bind_param("isiii", $action->joueurValue, $action->action, $_POST['id'], $IDDOM, $action->temps);
        } else {
            $prep->bind_param("isiii", $action->joueurValue, $action->action, $_POST['id'], $IDEXT, $action->temps);
        }
        $prep->execute();
    }
    $prep->close();
}
if ($isRemp) {
    $prep = $mysqli->prepare("INSERT INTO `sortie`(`Joueur_sortant`,`Joueur_rentrant`,`Catégorie`,`Match`,`Equipe`,`Temps_du_match`) VALUES (?, ?, ?, ?, ?, ?)");
    foreach ($remplacement as $action) {
        if ($action->cote === "ActionDomicile") {
            $prep->bind_param("iisiii", $action->joueurValue, $action->remplaceValue, $action->action, $_POST['id'], $IDDOM, $action->temps);
        } else {
            $prep->bind_param("iisiii", $action->joueurValue, $action->remplaceValue, $action->action, $_POST['id'], $IDEXT, $action->temps);
        }
        $prep->execute();
    }
    $prep->close();
}
if ($isFin) {
    $prep = $mysqli->prepare("UPDATE `Match` SET `Duree`=? WHERE Id=" . $_POST['id']);
    foreach ($fin as $action) {
        $prep->bind_param("i", $action->temps);
        $prep->execute();
    }
    $prep->close();
}
