  <?php
  require_once('../../php/connexion.php');
  header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
  header("Cache-Control: post-check=0, pre-check=0", false);
  header("Pragma: no-cache");
  $queryEquipe = mysqli_query($conn, 'SELECT * FROM equipe');
  $queryStade = mysqli_query($conn, 'SELECT * FROM stade');
  $queryArbitre = mysqli_query($conn, 'SELECT * FROM arbitres');
  $arbitres = "";
  $option = "";
  $stades = "";
  while ($team = mysqli_fetch_assoc($queryEquipe)) {
    $teamnom = $team['Nom'];
    $teamId = $team['Id'];
    $option .= "<option value='$teamId'>$teamnom</option>";
  }
  while ($ville = mysqli_fetch_assoc($queryStade)) {
    $stadenom = $ville['Nom'] . "," . $ville['Ville'];
    $stadeID = $ville['Id'];
    $stades .= "<option value='$stadeID'>$stadenom</option>";
  }
  while ($arbitre = mysqli_fetch_assoc($queryArbitre)) {
    $arbitrenom = $arbitre['Nom'] . "," . $arbitre['Nationalité'];
    $arbitreID = $arbitre['Id'];
    $arbitres .= "<option value='$arbitreID'>$arbitrenom</option>";
  }
  ?>

  <head>
    <link rel="icon" type="image/png" href="/Site web/img/icone.jpg" />
    <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@500&display=swap" rel="stylesheet" />
    <link href="/Site web/css/default.css?id=1234" rel="stylesheet" type="text/css" />
    <link href="/Site web/css/Index.css?id=1234" rel="stylesheet" type="text/css" />
    <link href="/Site web/css/CreateMatch.css?id=1234" rel="stylesheet" type="text/css" />
    <link href="/Site web/css/dragndrop.css?id=1234" rel="stylesheet" type="text/css" />
    <link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css" />
    <meta charset="UTF-8" Cache-Control: no-cache />
    <title>Préparation d'un match</title>
  </head>

  <body>
    <h1 id="Titre">Préparation d'un match</h1>
    <div id="CentreTitre">
      <h2 id="SousTitre">Paramètres du match</h2>
      <a id="Etapes"><span id="EtapeText">Etape 1/3</span>
        <progress id="BarreEtape" value="0.33"></progress>
      </a>
    </div>
    <!-----------------------------------------------------Pages 1--------------------------------------------------------->
    <div id="Etape1" class="Etape">
      <div class="Rectangle">
        <div id="M1G">
          <h3>Domicile</h3>
          <select id="BoutonGauche" class="BoutonMenu" name="TeamDom">
            <option value="none" selected disabled hidden>
              Liste des équipes
            </option>
            <?php echo $option ?>
          </select>
        </div>
        <div id="M1D">
          <h3>Exterieur</h3>
          <select id="BoutonGaucheE" class="BoutonMenu" name="TeamExt">
            <option value="none" selected disabled hidden>
              Liste des équipes
            </option>
            <?php echo $option ?>
          </select>
        </div>
      </div>
      <div id="Arbitres">
        <h3>Arbitres</h3>
        <div id="AddArbitre" class="Bouton">
          <h3>Ajouter</h3>
        </div>
      </div>
      <div class="Rectangle">
        <div id="Date">
          <h3 id="DateTitre">Date</h3>
          <input id="DatePicker" class="BoutonMenu" type="date" oninput="IsVoid($('#DatePicker'))" />
        </div>
        <div id="Lieu">
          <h3 id="LieuTitre">Lieu</h3>
          <select id="Stade" class="BoutonMenu">
            <option value="none" selected disabled hidden>Liste des stades</option>
            <?php
            echo $stades
            ?>
          </select>
        </div>
      </div>
      <div class="Bouton" id="SaveFirstStep">
        <h3>Sauvegarder</h3>
      </div>
    </div>
    <!-----------------------------------------------------Pages 2--------------------------------------------------------->
    <div id="Etape2" class="PasPasse Etape">
      <div class="MenuGauche">
        <div class="DivSwitch">
          <p>Domicile</p>
          <label class="Switch">
            <input type="checkbox" id="SwitchDOM">
            <span class="Slider Round"></span>
          </label>
          <p>Neutre</p>
        </div>
        <div class="Gauche Selection">
          <h3 id="ColoneAttaquant">ATTAQUANT</h3>
          <div class="Float Attaquant CategorieDOM">
          </div>
          <h3 id="ColoneMilieu">MILIEU</h3>
          <div class="Float Milieu CategorieDOM">
          </div>
          <h3 id="ColoneDefenseur CategorieDOM">DEFENSEUR</h3>
          <div class="Float Defenseur CategorieDOM">
          </div>
          <h3 id="ColoneGardien CategorieDOM">GARDIEN</h3>
          <div class="Float Gardien CategorieDOM">
          </div>
          <h3 id="ColoneCapitaine">Capitaine</h3>
          <div class="Capitaine" id="CapDOM">
            <div class="Image">
              <img class="Brassard" src="/Site web/img/brassardIcone.png" />
            </div>
            <h4>CAPITAINE</h4>
          </div>
        </div>
      </div>

      <div class="MenuDroit">
        <select id="BoutonDroit" class="BoutonMenu" name="Selec1">
          <option value="0">4-4-2</option>
          <option value="1">4-4-2 losange</option>
          <option value="2">Coupe du monde 2018</option>
          <option value="3">5-3-2</option>
        </select>
        <div id="Droite" class="Banc">
          <h3 id="ColoneBanc">BANC (0/11)</h3>
          <h4 id="Warning">Il faut un minimum de 6 remplaçants</h4>
        </div>
      </div>
      <div id="TerrainMaillot">
        <div class="MaillotT" id="Maillot1">
          <div class="Image">
            <img src="/Site web/img/maillot-blanc.png" />
          </div>
          <h4 class="Nom">&nbsp;</h4>
          <h4 class="Numero"></h4>
        </div>
        <div class="MaillotT" id="Maillot2">
          <div class="Image">
            <img src="/Site web/img/maillot-blanc.png" />
          </div>
          <h4 class="Nom">&nbsp;</h4>
          <h4 class="Numero"></h4>
        </div>
        <div class="MaillotT" id="Maillot3">
          <div class="Image">
            <img src="/Site web/img/maillot-blanc.png" />
          </div>
          <h4 class="Nom">&nbsp;</h4>
          <h4 class="Numero"></h4>
        </div>
        <div class="MaillotT" id="Maillot4">
          <div class="Image">
            <img src="/Site web/img/maillot-blanc.png" />
          </div>
          <h4 class="Nom">&nbsp;</h4>
          <h4 class="Numero"></h4>
        </div>
        <div class="MaillotT" id="Maillot5">
          <div class="Image">
            <img src="/Site web/img/maillot-blanc.png" />
          </div>
          <h4 class="Nom">&nbsp;</h4>
          <h4 class="Numero"></h4>
        </div>
        <div class="MaillotT" id="Maillot6">
          <div class="Image">
            <img src="/Site web/img/maillot-blanc.png" />
          </div>
          <h4 class="Nom">&nbsp;</h4>
          <h4 class="Numero"></h4>
        </div>
        <div class="MaillotT" id="Maillot7">
          <div class="Image">
            <img src="/Site web/img/maillot-blanc.png" />
          </div>
          <h4 class="Nom">&nbsp;</h4>
          <h4 class="Numero"></h4>
        </div>
        <div class="MaillotT" id="Maillot8">
          <div class="Image">
            <img src="/Site web/img/maillot-blanc.png" />
          </div>
          <h4 class="Nom">&nbsp;</h4>
          <h4 class="Numero"></h4>
        </div>
        <div class="MaillotT" id="Maillot9">
          <div class="Image">
            <img src="/Site web/img/maillot-blanc.png" />
          </div>
          <h4 class="Nom">&nbsp;</h4>
          <h4 class="Numero"></h4>
        </div>
        <div class="MaillotT" id="Maillot10">
          <div class="Image">
            <img src="/Site web/img/maillot-blanc.png" />
          </div>
          <h4 class="Nom">&nbsp;</h4>
          <h4 class="Numero"></h4>
        </div>
        <div class="MaillotT" id="Maillot11">
          <div class="Image">
            <img src="/Site web/img/maillot-blanc.png" />
          </div>
          <h4 class="Nom">&nbsp;</h4>
          <h4 class="Numero"></h4>
        </div>
        <img id="Terrain" src="/Site web/img/terrain-menu.jpg" />
      </div>
    </div>
    <!-----------------------------------------------------Pages 3--------------------------------------------------------->
    <div id="Etape3" class="PasPasse Etape">
      <div class="MenuGauche">
        <div class="DivSwitch">
          <p>Exterieur</p>
          <label class="Switch">
            <input type="checkbox" id="switchEXT">
            <span class="Slider Round"></span>
          </label>
          <p>Neutre</p>
        </div>
        <div class="Gauche Selection">
          <h3 id="ColoneAttaquant">Attaquant</h3>
          <div class="Float Attaquant categorieEXT">
          </div>
          <h3 id="ColoneMilieu">Milieu</h3>
          <div class="Float Milieu categorieEXT">
          </div>
          <h3 id="ColoneDefenseur">Defenseur</h3>
          <div class="Float Defenseur categorieEXT">
          </div>
          <h3 id="ColoneGardien">Gardien</h3>
          <div class="Float Gardien categorieEXT">
          </div>
          <h3 id="ColoneCapitaine">CAPITAINE</h3>
          <div class="Capitaine" id="CapEXT">
            <div class="Image">
              <img class="Brassard" src="/Site web/img/brassardIcone.png" />
            </div>
            <h4>Capitaine</h4>
          </div>
        </div>
      </div>

      <div class="MenuDroit">
        <select id="BoutonDroitE" class="BoutonMenu" name="Selec1">
          <option value="0">4-4-2</option>
          <option value="1">4-4-2 losange</option>
          <option value="2">Coupe du monde 2018</option>
          <option value="3">5-3-2</option>
        </select>
        <div id="Droite" class="Banc">
          <h3 id="ColoneBanc2">BANC (0/11)</h3>
          <h4 id="Warning">Il faut un minimum de 6 remplaçants</h4>
        </div>
      </div>
      <div id="TerrainMaillot">
        <div class="MaillotT" id="Maillot1E">
          <div class="Image">
            <img src="/Site web/img/maillot-blanc.png" />
          </div>
          <h4 class="Nom">&nbsp;</h4>
          <h4 class="Numero"></h4>
        </div>
        <div class="MaillotT" id="Maillot2E">
          <div class="Image">
            <img src="/Site web/img/maillot-blanc.png" />
          </div>
          <h4 class="Nom">&nbsp;</h4>
          <h4 class="Numero"></h4>
        </div>
        <div class="MaillotT" id="Maillot3E">
          <div class="Image">
            <img src="/Site web/img/maillot-blanc.png" />
          </div>
          <h4 class="Nom">&nbsp;</h4>
          <h4 class="Numero"></h4>
        </div>
        <div class="MaillotT" id="Maillot4E">
          <div class="Image">
            <img src="/Site web/img/maillot-blanc.png" />
          </div>
          <h4 class="Nom">&nbsp;</h4>
          <h4 class="Numero"></h4>
        </div>
        <div class="MaillotT" id="Maillot5E">
          <div class="Image">
            <img src="/Site web/img/maillot-blanc.png" />
          </div>
          <h4 class="Nom">&nbsp;</h4>
          <h4 class="Numero"></h4>
        </div>
        <div class="MaillotT" id="Maillot6E">
          <div class="Image">
            <img src="/Site web/img/maillot-blanc.png" />
          </div>
          <h4 class="Nom">&nbsp;</h4>
          <h4 class="Numero"></h4>
        </div>
        <div class="MaillotT" id="Maillot7E">
          <div class="Image">
            <img src="/Site web/img/maillot-blanc.png" />
          </div>
          <h4 class="Nom">&nbsp;</h4>
          <h4 class="Numero"></h4>
        </div>
        <div class="MaillotT" id="Maillot8E">
          <div class="Image">
            <img src="/Site web/img/maillot-blanc.png" />
          </div>
          <h4 class="Nom">&nbsp;</h4>
          <h4 class="Numero"></h4>
        </div>
        <div class="MaillotT" id="Maillot9E">
          <div class="Image">
            <img src="/Site web/img/maillot-blanc.png" />
          </div>
          <h4 class="Nom">&nbsp;</h4>
          <h4 class="Numero"></h4>
        </div>
        <div class="MaillotT" id="Maillot10E">
          <div class="Image">
            <img src="/Site web/img/maillot-blanc.png" />
          </div>
          <h4 class="Nom">&nbsp;</h4>
          <h4 class="Numero"></h4>
        </div>
        <div class="MaillotT" id="Maillot11E">
          <div class="Image">
            <img src="/Site web/img/maillot-blanc.png" />
          </div>
          <h4 class="Nom">&nbsp;</h4>
          <h4 class="Numero"></h4>
        </div>
        <img id="Terrain" src="/Site web/img/Terrain-menu.jpg" />
      </div>
    </div>
    <!----------------------------------------------------Flèche et autre éléments---------------------------------------------------------->
    <div id="Precedent">
      <h3>
        < <h4 id="BackStep">Menu principal</h4>
    </div>
    <div id="Suivant">
      <h3>></h3>
      <h4 id="NextStep">Equipe domicile</h4>
    </div>
    <div id="Darken"></div>
    <div id="CentreRetour" class="Centre">
      <div id="AlerteRetour">
        <h2>Retour</h2>
        <h3>Voulez-vous retourner au menu principal ?</h3>
        <h4>(Votre avancée ne sera pas sauvegarder)</h4>
        <h3 id="RetourMenu">Oui</h3>
        <h3 id="RetourPage">Non</h3>
      </div>
    </div>
    <div class="Centre">
      <div id="MenuArbitre">
        <h2>Ajouter des arbitres</h2>
        <h3>Arbitre principal</h3>
        <div class="LigneArbitre">
          <h4>
            Nom :
            <select name="" id="Arbitre1">
              <option value="none" selected disabled hidden>Liste des arbitres</option>
              <?php echo $arbitres ?>
            </select>
          </h4>
        </div>
        <h3>Arbitres secondaires</h3>
        <div class="LigneArbitre">
          <h4>
            Nom :
            <select name="" id="Arbitre2">
              <option value="none" selected disabled hidden>
                Liste des arbitres
              </option>
              <?php echo $arbitres ?>
            </select>
          </h4>
        </div>
        <div class="LigneArbitre">
          <h4>
            Nom :
            <select name="" id="Arbitre3">
              <option value="none" selected disabled hidden>
                Liste des arbitres
              </option>
              <?php echo $arbitres ?>
            </select>
          </h4>
        </div>
        <div class="Bouton" id="Back">
          <h3>Terminer</h3>
        </div>
      </div>
      <div class="Popup blur" id="Sauvegarder">
        <div class="HeaderPOPUP">
          <h3>Sauvegarder ?</h3>
        </div>
        <div class="ContentPOPUP">
          <h4>Une fois la sauvegarde effectuer, impossible de modifier les équipes, la date, le lieu, les arbitres et les joueurs</h4>
        </div>
        <div class="FooterPOPUP">
          <div class="Bouton" id="ConfirmSave" style="background-color: rgba(17, 206, 0, 0.4);">Sauvegarder et continuer</div>
          <div class="Bouton" id="CancelSave" style="background-color: rgba(138, 26, 26, 0.4);">Annuler</div>
        </div>
      </div>
    </div>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"></script>
    <script src="/Site web/js/dragndrop.js"></script>
    <script src="/Site web/js/default.js"></script>
  </body>