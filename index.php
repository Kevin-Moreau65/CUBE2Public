<?php
header('location: /Site web/html/login.html');
$login="";
$password="";
if($_POST["username"]=="paufc" && $_POST["password"]=="4eme"){
    header('location: /Site web/index.html');
}else{
    exit(0);
}


?>