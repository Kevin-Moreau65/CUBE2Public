    <?php
    if (isset($_POST['team'])) {
        require_once('connexion.php');
        $team = $_POST['team'];
        $r = "SELECT * FROM joueurs WHERE Equipe = $team";
        $query = mysqli_query($conn, $r);
        $equipe = array();
        $gardien = array();
        $defenseur = array();
        $milieu = array();
        $attaquant = array();
        while ($joueur = mysqli_fetch_assoc($query)) {
            if ($joueur['Poste'] === "Gardien") {
                $gardien[] = array($joueur['Nom'], $joueur['Numero'], $joueur['Id']);
            } else if ($joueur['Poste'] === "Defenseur") {
                $defenseur[] = array($joueur['Nom'], $joueur['Numero'], $joueur['Id']);
            } else if ($joueur['Poste'] === "Milieu") {
                $milieu[] = array($joueur['Nom'], $joueur['Numero'], $joueur['Id']);
            } else {
                $attaquant[] = array($joueur['Nom'], $joueur['Numero'], $joueur['Id']);
            }
        }
        $team = $_POST['team'];
        utf8_encode($team);
        $r = "SELECT * FROM equipe WHERE id = $team";
        $query = mysqli_query($conn, $r);
        $result = mysqli_fetch_assoc($query);
        $path =  $result[$_POST['donnee']];
        utf8_encode($path);
        $equipe['gardien'] = $gardien;
        $equipe['defenseur'] = $defenseur;
        $equipe['milieu'] = $milieu;
        $equipe['attaquant'] = $attaquant;
        $equipe['chemin'] = $path;
        $equipe['team'] = $team;
        echo json_encode($equipe);
        die;
    }
