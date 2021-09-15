<?php
require_once("../../php/connexion.php");
$i = 0;
$x = 0;
$reset = false;
$Fait = "";
$Afaire = "";
$NomDOM;
$NomEXT;
$CheminDOM;
$CheminEXT;
$ScoreDOM;
$ScoreEXT;
$date;
$Id = [];
$template;
$query = mysqli_query($conn, 'SELECT * FROM `match` INNER JOIN `equipe` ON `equipe`.Id = `match`.Id_équipe_Domicile OR `equipe`.Id = `match`.Id_équipe_Exterieur ORDER BY `match`.Id');
$queryIdmatch = mysqli_query($conn, "SELECT `Id` FROM `match`");
while ($Idmatch = mysqli_fetch_assoc($queryIdmatch)) {
    array_push($Id, $Idmatch['Id']);
}
while ($match = mysqli_fetch_assoc($query)) {
    if ($match['Id'] == 1) {
        if ($match['Alternatif?'] == 1 || $match['Alternatif?'] == 3) {
            $CheminDOM = $match['CheminMaillotNeutre'];
        } else {
            $CheminDOM = $match['CheminMaillotDom'];
        }
        $NomDOM = $match['Nom'];
        $date = $match['Date'];
        $converted = new DateTime($date);
        $date = $converted->format('d/m/Y');
    } else {
        if ($match['Alternatif?'] == 2 || $match['Alternatif?'] == 3) {
            $CheminEXT = $match['CheminMaillotNeutre'];
        } else {
            $CheminEXT = $match['CheminMaillotExt'];
        }
        $NomEXT = $match['Nom'];
    }
    if ($i === 1) {
        if ($match['fait?'] == 0) {
            $template = '<div class="Match blur Prepared" id="' . $Id[$x] . '">
        <div class="UpperContent">
            <div class="ImageContent">
                <img src="' . $CheminDOM . '" alt="" />
            </div>
            <h3 class="Score">?-?</h3>
            <div class="ImageContent">
                <img src="' . $CheminEXT . '" alt="" />
            </div>
        </div>
        <div class="LowerContent">
            <div class="TeamsTitle">
                <h4>' . $NomDOM . '</h4>
                <h4>' . $NomEXT . '</h4>
            </div>
            <h3 class="Date">' . $date . '</h3>
        </div>
    </div>';
            $Afaire .= $template;
        } else {
            $ScoreDOM = mysqli_fetch_assoc(mysqli_query($conn, 'SELECT COUNT(*) FROM but WHERE `Match`= ' . $Id[$x] . ' AND `Equipe`=' . $match['Id_équipe_Domicile']));
            $ScoreEXT = mysqli_fetch_assoc(mysqli_query($conn, 'SELECT COUNT(*) FROM but WHERE `Match`= ' . $Id[$x] . ' AND `Equipe`=' . $match['Id_équipe_Exterieur']));
            $template = '<div class="Match blur" id="' . $Id[$x] . '">
        <div class="UpperContent">
            <div class="ImageContent">
                <img src="' . $CheminDOM . '" alt="" />
            </div>
            <h3 class="Score">' . $ScoreDOM['COUNT(*)'] . '-' . $ScoreEXT['COUNT(*)'] . '</h3>
            <div class="ImageContent">
                <img src="' . $CheminEXT . '" alt="" />
            </div>
        </div>
        <div class="LowerContent">
            <div class="TeamsTitle">
                <h4>' . $NomDOM . '</h4>
                <h4>' . $NomEXT . '</h4>
            </div>
            <h3 class="Date">' . $date . '</h3>
        </div>
    </div>';
            $Fait .= $template;
        }
        $reset = true;
        $x++;
    }
    if ($reset) {
        $reset = false;
        $i = 0;
    } else {
        $i++;
    }
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@500&display=swap" rel="stylesheet" />
    <link href="/Site web/css/default.css?id=1234" rel="stylesheet" type="text/css" />
    <link href="/Site web/css/SeeMatch.css?id=1234" rel="stylesheet" type="text/css" />
</head>

<body>
    <h1 id="Titre" style="margin-top: 5%;">Voir les matchs</h1>
    <div id="Buttons">
        <div id="SearchDIV">
            <div class="button" id="Search">Rechercher</div>
        </div>
    </div>
    <div id="Main">
        <div id="AFaire">
            <div id="AFaireTitle">
                <h3>A faire</h3>
            </div>
            <div class="content">
                <?php echo $Afaire ?>
            </div>
        </div>
        <div id="Fait">
            <div id="FaitTitle">
                <h3>Fait</h3>
            </div>
            <div class="content">
                <?php echo $Fait ?>
            </div>
        </div>
    </div>
    <div id="Darken"></div>
    <div id="FilterPOPUP" class="Popup blur">
        <div class="ContentPOPUP">
            <div class="button">Date</div>
            <input type="text" list="Equipes">
            <datalist id="Equipes">
                <option data-value="0">PSG</option>
                <option data-value="1">Dortmund</option>
            </datalist>
        </div>
        <div class="FooterPOPUP">
            <div class="button Add">Appliquer</div>
            <div class="button Reset">Réinitialiser</div>
            <div class="button Cancel">Annuler</div>
        </div>
    </div>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <script src="/Site web/js/SeeMatch.js"></script>
</body>

</html>