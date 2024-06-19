<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Establish database connection
$servername = "localhost";
$username = "root";
$password = "erham2029";
$dbname = "calc";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Save result to database
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $result = $_POST['result'];
    $sql = "INSERT INTO calcans (rslt) VALUES ('$result')";

    if ($conn->query($sql) === TRUE) {
        echo "Result saved";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}

// Get all results from database
if ($_SERVER["REQUEST_METHOD"] == "GET") {
    $sql = "SELECT * FROM calcans";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        // Output data of each row
        while($row = $result->fetch_assoc()) {
            echo "id: " . $row["id"]. " - Result: " . $row["rslt"]. "<br>";
        }
    } else {
        echo "0 results";
    }
}

$conn->close();
?>
