<?php

require_once('../../php/connexion.php');

$test = $mysqli->query('SELECT * FROM joueurs WHERE equipe ='.$_GET['id']);

$result = $test->fetch_row();
$queryName = $mysqli->query('SELECT Nom FROM equipe WHERE `Id` ='.$_GET['id']);
$teamname = $queryName->fetch_row();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@500&display=swap" rel="stylesheet" />
  <link href="/Site web/css/default.css" rel="stylesheet" type="text/css" />
  <link href="/Site web/css/Index.css" rel="stylesheet" type="text/css" />
 
  <link href="/Site web/css/SeeTeam2.css" rel="stylesheet" type="text/css" />

  <meta charset="UTF-8" />
</head>
<body>
    <h1 id ="Titre"><?php echo $teamname[0]; ?></h1>
		<div class="container-table">
			<div class="wrap-table">
				<div class="table">
					<table>
						<thead>
							<tr class="table-head">
								<th class="column1">Nom</th>
								<th class="column2">Equipe</th>
								<th class="column3">Poste</th>
								<th class="column4">Numéro</th>
								<th class="column5">Buts</th>
								<th class="column6">Fautes</th>
							</tr>
						</thead>
						
						<tbody>
						<?php
						while ($result = $test->fetch_array())
						{
							echo '<tr id="ligne_equipe" onclick="trclick('.$result['Id'].');"><td class="column1">', $result['Nom'], '</td>';
							echo '<td class="column1">', $result['Equipe'], '</td>';
							echo '<td class="column1">', $result['Poste'], '</td>';
							echo '<td class="column1">', $result['Numero'], '</td>';
							echo '<td class="column1">', $result['but'], '</td>';
							echo '<td class="column1">', $result['fautes'], '</td></tr>';
						}
						?>
								
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>





</body>
</html>

<script src="/Site web/js/SeeTeam2.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
