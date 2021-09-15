<?php

require_once('../../php/connexion.php');

$r_team = $mysqli->query('SELECT * FROM equipe '); 

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@500&display=swap" rel="stylesheet" />
  <link href="/Site web/css/default.css" rel="stylesheet" type="text/css" />
  <link href="/Site web/css/Recap_Match.css" rel="stylesheet" type="text/css" />
  <link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css" />
  <meta charset="UTF-8" />
    <title>Sélection d'une équipe </title>
</head>
<body>

    <h1 id="Titre">Equipes </h1>
  <div id="CentreTitre">
    <h2 id="SousTitre">Sélectionnez une équipe</h2>
    <a id="étapes"><span id="Etapetext">Etape 1/2</span>
      <progress id="Barreetape" value="0.50"></progress>
    </a>
  </div>
    
  <div id="greybox"> 



<?php 
 while ($result_team = $r_team->fetch_array())
{
  echo '<a href="SeeTeam2.php?id='.$result_team['Id'].'"><h2>',$result_team['Nom'],'</h2></a>';
} 
      ?>

       
   

    



  </div>
</body>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
</html>