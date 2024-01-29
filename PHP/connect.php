<?php

$servername = "127.0.0.1";
$username = "root";
$password = "";
$database = "university";

// Create connection
$con = new mysqli($servername, $username, $password, $database);

// Check connection
if ($con->connect_error) {
    die("Connection failed: " . $con->connect_error);
}



?>