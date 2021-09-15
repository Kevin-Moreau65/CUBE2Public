<?php

require_once('../../php/connexion.php');
$test = $mysqli->query('SELECT * FROM joueurs WHERE Id ='.$_GET['id']);
$result = $test->fetch_array();
$joueurName = $result['Nom'];
$joueurMatch = $result['TotalMatch'];
$joueurBut = $result ['but'];
$joueurFaute =$result ['fautes'];
$joueurPoste =$result ['Poste']; 


?>
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@500&display=swap" rel="stylesheet" />
        <link href="/Site web/css/SeeTeam3.css" rel="stylesheet" type="text/css" />
    </head>

    <body>
      <?php
      ?>


       <h1></h1>

        <table>
            <thead>
                <tr class="table-head">
                    <th class="column1">Nom</th>
                    <th class="column2">Total Matchs</th>
                    <th class="column3">nombre de but</th>
                    <th class="column4">Fautes</th>
                    <th class="column5">Poste</th>
                </tr>
            </thead>

            <tbody>
                <tr>
                    <td class="column1"><?php echo $joueurName; ?></td>
                    <td class="column2"><?php echo $joueurMatch; ?></td>
                    <td class="column3"><?php echo $joueurBut; ?></td>
                    <td class="column4"><?php echo $joueurFaute; ?></td>
                    <td class="column5"> <select  id="poste-select">
                <option selected><?php echo $joueurPoste; ?></option>
                <option value="Attaquant">Attaquant</option>
                <option value="Defenseur">Defenseur</option>
                <option value="Milieu">Milieu</option>
                <option value="Gardien">Gardien</option>
            </select></td>


                </tr>
            </tbody>
        </table>

            <button class="retour" id="valider"> Valider </button>
            <a class="retour" href="/Site web/html/SeeTeam2.php" class="retour">Retour</a>
    </body>
    <script src="/Site web/js/SeeTeam2.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
</html>