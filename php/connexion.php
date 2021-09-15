<?php
//Document obligatoire pour se connecter a la base de donnée azure
$host = 'cubes2foot.mysql.database.azure.com';
$username = 'boss@cubes2foot';
$password = 'Paullemans06';
$db_name = 'cubes';

//Initiation de la connection MySQLi
$conn = mysqli_init();

mysqli_ssl_set($conn, NULL, NULL, "/php/DigiCertGlobalRootG2.crt.pem", NULL, NULL);

// Etablissement de la connection
mysqli_real_connect($conn, $host, $username, $password, $db_name, 3306, MYSQLI_CLIENT_SSL, MYSQLI_CLIENT_SSL_DONT_VERIFY_SERVER_CERT);
$mysqli  = mysqli_init();
$mysqli->options(MYSQLI_OPT_SSL_VERIFY_SERVER_CERT, true);
$mysqli->ssl_set(NULL, NULL, "/php/DigiCertGlobalRootG2.crt.pem", NULL, NULL);
$mysqli->real_connect($host, $username, $password, $db_name, 3306, MYSQLI_CLIENT_SSL, MYSQLI_CLIENT_SSL_DONT_VERIFY_SERVER_CERT);
if ($mysqli->connect_errno) {
    echo "Échec lors de la connexion à MySQL : (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
}
mysqli_set_charset($conn, "utf8mb4");
$mysqli->set_charset("utf8mb4");
