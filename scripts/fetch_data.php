<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "phrase";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT * FROM fav";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $index = 1;
    while ($row = $result->fetch_assoc()) {
        echo "<div class='rows' style='width:100%;margin-top:1rem;border-bottom:1px solid rgb(217, 217, 222);'><p>". $index . ".) " . $row["text"] . "</p></div>";
        $index += 1;
    }
} else {
    echo "0 results";
}

$conn->close();
?>
