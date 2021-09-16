<?php
session_start();
if (isset($_SESSION['token'])) {
    if ($_SESSION['token'] !== "CESI") {
        header("Location: login.php");
    }
} else {
    header("Location: login.php");
}
