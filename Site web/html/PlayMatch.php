<?php
require_once("../../php/connexion.php");
if (isset($_GET['id'])) {
    $query = $mysqli->query('SELECT * FROM `match` INNER JOIN `equipe` ON `equipe`.`Id` = `match`.`Id_équipe_Domicile` OR `equipe`.`Id` = `match`.`Id_équipe_Exterieur` WHERE `match`.`Id`=' . $_GET['id']) or die($mysqli->error);
    $i = 0;
    while ($Equipe = $query->fetch_assoc()) {
        if ($i === 0) {
            $idDOM = $Equipe['Id'];
            $NomEquipeDOM = $Equipe['Nom'];
            $ScoreDOM = mysqli_fetch_all(mysqli_query($conn, "SELECT `ScoreDOM` FROM `match` WHERE `match`.Id=" . $_GET['id']));
            if ($Equipe['Alternatif?'] == 1 || $Equipe['Alternatif?'] == 3) {
                $IconeDOM = $Equipe['CheminMaillotNeutre'];
            } else {
                $IconeDOM = $Equipe['CheminMaillotDom'];
            }
            $i++;
        } else {
            $idEXT = $Equipe['Id'];
            $NomEquipeEXT = $Equipe['Nom'];
            if ($Equipe['Alternatif?'] == 2 || $Equipe['Alternatif?'] == 3) {
                $IconeDOM = $Equipe['CheminMaillotNeutre'];
            } else {
                $IconeDOM = $Equipe['CheminMaillotExt'];
            }
            $ScoreEXT = mysqli_fetch_all(mysqli_query($conn, "SELECT `ScoreEXT` FROM `match` WHERE `match`.Id=" . $_GET['id']));
        }
    }
}
$DOMREMP = " ";
$DOMTIT = " ";
$EXTREMP = " ";
$EXTTIT = " ";
$query = $mysqli->query('SELECT * FROM `titulaire` INNER JOIN `joueurs` ON `titulaire`.`Id_Joueurs` = `joueurs`.`Id` WHERE `Match`=' . $_GET['id']);
while ($joueur = $query->fetch_assoc()) {
    if ($joueur['Equipe'] === $idDOM) {
        if ($joueur['Joue?'] == 1) {
            $DOMTIT .= '<option value="' . $joueur['Id_Joueurs'] . '">' . $joueur['Nom'] . '</option>';
        } else {
            $DOMREMP .= '<option value="' . $joueur['Id_Joueurs'] . '">' . $joueur['Nom'] . '</option>';
        }
    } else {
        if ($joueur['Joue?'] == 1) {
            $EXTTIT .= '<option value="' . $joueur['Id_Joueurs'] . '">' . $joueur['Nom'] . '</option>';
        } else {
            $EXTREMP .= '<option value="' . $joueur['Id_Joueurs'] . '">' . $joueur['Nom'] . '</option>';
        }
    }
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <link rel="icon" type="image/png" href="/Site web/img/icone.jpg" />
    <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@500&display=swap" rel="stylesheet" />
    <link href="/Site web/css/default.css?id=1234" rel="stylesheet" type="text/css" />
    <link href="/Site web/css/PlayMatch.css?id=1234" rel="stylesheet" type="text/css" />
    <meta charset="UTF-8" Cache-Control: no-cache />
    <title>Match en cours</title>
</head>

<body>
    <h1 id="Titre">Déroulement du match</h1>
    <div id="Main" class="blur">
        <div id="Camps">
            <div class="TeamPreview">
                <h2 class="Name"><?php echo $NomEquipeDOM ?></h2>
                <div class="TeamContent">
                    <div class="Content">
                        <div class="Image"><img src=<?php echo '"' . $IconeDOM . '"' ?> /></div>
                    </div>
                    <h3 class="Score" id="ScoreDOM"><?php echo implode($ScoreDOM[0]) ?></h3>
                </div>
            </div>
            <div class="TeamPreview">
                <h2 class="Name"><?php echo $NomEquipeEXT ?></h2>
                <div class="TeamContent">
                    <h3 class="Score" id="ScoreEXT"><?php echo implode($ScoreEXT[0]) ?></h3>
                    <div class="Content">
                        <div class="Image"><img src=<?php echo '"' . $IconeEXT . '"' ?>></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="Deroulement">
            <div id="Categories">
                <div id="CategoriesDOM">
                    <h3 class="Temps">T</h3>
                    <h3 class="Action">Action</h3>
                    <h3 class="Joueurs">Joueurs</h3>
                </div>
                <div id="CategoriesEXT">
                    <h3 class="Joueurs">Joueurs</h3>
                    <h3 class="Action">Action</h3>
                    <h3 class="Temps">T</h3>
                </div>
            </div>
            <div class="Scroller">
            </div>
        </div>
        <div class="Stat">
            <div class="StatContent" id="StatDOM">
                <h3 class="Faute">Fautes : 0</h3>
                <h3 class="Remplacement">Remplacement : 0/3</h3>
                <h3 class="Sortie">Sortie : 0</h3>
            </div>
            <div class="StatContent" id="StatEXT">
                <h3 class="Faute">Fautes : 0</h3>
                <h3 class="Remplacement">Remplacement : 0/3</h3>
                <h3 class="Sortie">Sortie : 0</h3>
            </div>
        </div>
    </div>
    <div class="button blur" id="btnDOM">
        <h3>+</h3>
    </div>
    <div class="button blur" id="btnEXT">
        <h3>+</h3>
    </div>
    <div id="Footer">
        <div class="button blur Mode" id="StatBTN">
            <h3>Statistiques</h3>
        </div>
        <div class="button blur Mode Selected" id="DeroulementBTN">
            <h3>Déroulement</h3>
        </div>
        <a href="/Site web/html/SeeMatch.php">
            <div class="button blur Mode" id="CancelBTN">
                <h3>Annuler</h3>
            </div>
        </a>
        <div class="button blur" id="Save">
            <h3>Enregistrer</h3>
        </div>
    </div>
    <div id="Darken"></div>
    <div class="Popup blur" id="PopupDOM">
        <h3>Ajouter une action : <?php echo $NomEquipeDOM ?></h3>
        <div class="ContentPopup">
            <div class="DivPlayer">
                <div>
                    Joueur:
                    <select name="" class="ListPlayer">
                        <option value="" disabled>Titulaires</option>
                        <?php echo $DOMTIT ?>
                        <option value="" disabled>Remplaçants</option>
                        <?php echo $DOMREMP ?>
                    </select>
                </div>
                <div>
                    Par:
                    <select name="" class="ListPlayer">
                        <option value="" disabled>Titulaires</option>
                        <?php echo $DOMTIT ?>
                        <option value="" disabled>Remplaçants</option>
                        <?php echo $DOMREMP ?>
                    </select>
                </div>
            </div>
            Action :
            <div class="ListActionDIV">
                <select name="" class="ListAction">
                    <option value="0">But</option>
                    <option value="1">Faute</option>
                    <option value="2">Remplacement</option>
                    <option value="3">Sortie</option>
                    <option value="4">Fin du match</option>
                </select>
                <select>
                    <option value="">Carton jaune</option>
                    <option value="">Carton rouge</option>
                    <option value="">Pénalty</option>
                    <option value="">Coup franc</option>
                </select>
            </div>
            Temps :
            <input type="number" maxlength="3" class="InputNumber">
        </div>
        <div class="FooterPopup">
            <div class="BtnPopup Add">
                Ajouter
            </div>
            <div class="BtnPopup Cancel">
                Annuler
            </div>
        </div>
    </div>
    <div class="Popup blur" id="PopupEXT">
        <h3>Ajouter une action : <?php echo $NomEquipeEXT ?></h3>
        <div class="ContentPopup">
            <div class="DivPlayer">
                <div>
                    Joueur:
                    <select name="" class="ListPlayer">
                        <option value="" disabled>Titulaires</option>
                        <?php echo $EXTTIT ?>
                        <option value="" disabled>Remplaçants</option>
                        <?php echo $EXTREMP ?>
                    </select>
                </div>
                <div>
                    Par:
                    <select name="" class="ListPlayer">
                        <option value="" disabled>Titulaires</option>
                        <?php echo $EXTTIT ?>
                        <option value="" disabled>Remplaçants</option>
                        <?php echo $EXTREMP ?>
                    </select>
                </div>
            </div>
            Action :
            <div class="ListActionDIV">
                <select name="" class="ListAction">
                    <option value="0">But</option>
                    <option value="1">Faute</option>
                    <option value="2">Remplacement</option>
                    <option value="3">Sortie</option>
                    <option value="4">Fin du match</option>
                </select>
                <select>
                    <option value="">Carton jaune</option>
                    <option value="">Carton rouge</option>
                    <option value="">Pénalty</option>
                    <option value="">Coup franc</option>
                </select>
            </div>
            Temps :
            <input type="number" maxlength="3" class="InputNumber">
        </div>
        <div class="FooterPopup">
            <div class="BtnPopup Add">
                Ajouter
            </div>
            <div class="BtnPopup Cancel">
                Annuler
            </div>
        </div>
    </div>
    <div class="Popup blur" id="PopupMOD">
        <h3>Modifier une action</h3>
        <div class="ContentPopup">
            <div class="DivPlayer">
                <div>
                    Joueur:
                    <select name="" class="ListPlayer">
                    </select>
                </div>
                <div>
                    Par:
                    <select name="" class="ListPlayer">
                    </select>
                </div>
            </div>
            Action :
            <div class="ListActionDIV">
                <select name="" class="ListAction">
                    <option value="0">But</option>
                    <option value="1">Faute</option>
                    <option value="2">Remplacement</option>
                    <option value="3">Sortie</option>
                    <option value="4">Fin du match</option>
                </select>
                <select>
                    <option value="">Carton jaune</option>
                    <option value="">Carton rouge</option>
                    <option value="">Pénalty</option>
                    <option value="">Coup franc</option>
                </select>
            </div>
            Temps :
            <input type="number" maxlength="3" class="InputNumber">
        </div>
        <div class="FooterPopup">
            <div class="BtnPopup Modify">
                Modifier
            </div>
            <div class="BtnPopup Cancel" style="background-color: var(--PrimaryColor);">
                Annuler
            </div>
            <div class="BtnPopup Delete">
                Supprimer
            </div>
        </div>
    </div>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <script src="/Site web/js/PlayMatch.js"></script>
</body>

</html>