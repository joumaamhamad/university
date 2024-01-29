<?php


header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET,POST,PUT,OPTIONS");
header("Access-Control-Allow-Headers:*");
//header('Access-Control-Allow-Headers: Origin, Content-Type, Accept, Authorization, X-Request-With');

include "connect.php";

if ($_SERVER["REQUEST_METHOD"] == "PUT") {

    $data = json_decode(file_get_contents("php://input"), true);
    $userId = $data['userId'];
    $email = $data["email"];
    $password = $data['password'];

    $sql = "
        UPDATE student
        SET email = '$email', password = '$password'
        WHERE studentID = '$userId';
    ";

    $result = $con->query($sql);

    header('Content-Type: application/json');
    if (!$result) {
        $errorResponse = array('error' => $con->error);
        echo json_encode($errorResponse);
        exit;
    }

    echo json_encode(array('email' => $email , 'password' => $password));

    $con->close();
}


if ($_SERVER["REQUEST_METHOD"] == "POST"){

    $data = json_decode(file_get_contents("php://input"), true);

    $name = $data['name'];
    $email = $data["email"];
    $message = $data['message'];

    $sql = "INSERT INTO message(name, email, message) VALUES ('$name', '$email',' $message')";

    $result = $con->query($sql);

    header('Content-Type: application/json');
    if (!$result) {
        $errorResponse = array('error' => $con->error);
        echo json_encode($errorResponse);
        exit;
    }

    echo json_encode(array('result' => 'Succes'));

    $con->close();
}
?>

