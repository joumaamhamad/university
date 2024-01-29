<?php


header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE');
header('Access-Control-Allow-Headers: Origin, Content-Type, Accept, Authorization, X-Request-With');


include "connect.php";


if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // Retrieve data sent by AJAX
    //$email = $_POST["email"];
    //$pass = $_POST["password"];

    $data = json_decode(file_get_contents("php://input"), true);
    $email = $data["email"];
    $pass = $data["password"];


    $sql = "SELECT * FROM student WHERE email = '$email' AND password = '$pass'";
    $result = $con->query($sql);

    header('Content-Type: application/json');
    
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            echo json_encode(array('successSignIn' => true ,'studentID' => $row['studentID'], 'email' => $row['email'] , 'name' => $row['name']));
        }
    } else {
        // Authentication failed, redirect back to the login page or show an error message
        echo json_encode(array('successSignIn' => false));
    }

    // Close the database connection
    $con->close();
}

?>
