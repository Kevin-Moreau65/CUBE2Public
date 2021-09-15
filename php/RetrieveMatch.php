<?php
require_once('connexion.php');
if (isset($_POST['id'])) {
    $query = "SELECT * FROM `match` WHERE Id=" . $_POST['id'];
    $result = mysqli_query($conn, $query);
    print_r(json_encode(mysqli_fetch_row($result)));
}
