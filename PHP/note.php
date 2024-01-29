<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE');
header('Access-Control-Allow-Headers: Origin, Content-Type, Accept, Authorization, X-Request-With');


include "connect.php";


if($_SERVER["REQUEST_METHOD"] == "POST"){

    $data = json_decode(file_get_contents("php://input"), true);
    $userID = $data["userID"];
    $year = $data["year"];
    //$selectedYear = $data['selectedYear'];


    $sql = "SELECT e.courseID, c.courseName, e.note, c.credits
            FROM enrolment e
            JOIN course c ON e.courseID = c.courseID
            JOIN student s ON e.studentID = s.studentID
            WHERE s.studentID = $userID AND c.year = $year;
        ";

    $result = $con->query($sql);

    
    if (!$result) {
        $errorResponse = array('error' => $con->error);
        echo json_encode($errorResponse);
        exit;
    }

    $data = array();

    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }
    }

    echo json_encode($data);

    
}


?>