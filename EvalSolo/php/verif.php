<?php
if ($_SESSION['token'] !== "CESI") {
    header("/php/login.php");
}
