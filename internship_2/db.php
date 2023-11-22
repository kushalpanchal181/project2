<?php
// Replace these with your actual database credentials
$host = 'localhost';
$username = 'root';
$password = '';
$database = 'internship';

// Create connection
$conn = mysqli_connect($host, $username, $password, $database);

// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}
?>