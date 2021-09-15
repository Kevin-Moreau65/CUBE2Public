    <?php
    require_once('connexion.php');
    $team = $_POST['id'];
    $path = $_POST['type'];
    $r = "SELECT * FROM equipe WHERE id = $team";
    $query = mysqli_query($conn, $r);
    $result = mysqli_fetch_assoc($query);
    echo $result[$path];
