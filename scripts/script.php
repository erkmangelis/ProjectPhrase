<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "phrase";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST["text"])) {
    $text = $conn->real_escape_string($_POST["text"]);

    $sql = "INSERT INTO fav (text) VALUES ('$text')";

    if ($conn->query($sql) === TRUE) {
        echo "Text saved successfully";
    } else {
        echo "Error: " . $sql . " " . $conn->error;
    }
} else {
    echo "Error: Text not received.";
}

$conn->close();
?>
