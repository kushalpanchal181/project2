<?php
// Add your server-side PHP code for CRUD operations here
require_once 'db.php'; // Include your database connection file

$action = $_GET['action'];

if ($action == 'get_data') {
    // Fetch data from the 'users' table
    $query = "SELECT * FROM users";
    $result = mysqli_query($conn, $query);

    $data = array();
    while ($row = mysqli_fetch_assoc($result)) {
        $data[] = $row;
    }

    echo json_encode(array('data' => $data));
} // ... Previous code ...
elseif ($action == 'save_data') {
    // Add your code to save data to the 'users' table
    $name = mysqli_real_escape_string($conn, $_POST['name']);
    $email = mysqli_real_escape_string($conn, $_POST['email']);
    $password = mysqli_real_escape_string($conn, $_POST['password']);
    $address = mysqli_real_escape_string($conn, $_POST['address']);
    $contact = mysqli_real_escape_string($conn, $_POST['contact']);
    $gender = mysqli_real_escape_string($conn, $_POST['gender']);
    $company = implode(', ', $_POST['company']); // Convert array to comma-separated string

    // Handle file upload
    $profileFileName = ''; // Initialize with an empty string
    if ($_FILES['profile']['error'] == UPLOAD_ERR_OK) {
        $profileTmpName = $_FILES['profile']['tmp_name'];
        $profileFileName = 'profiles/' . uniqid() . '_' . $_FILES['profile']['name']; // Adjust the path as needed
        move_uploaded_file($profileTmpName, $profileFileName);
    }




    // ... Remaining code ...

    $insertQuery = "INSERT INTO users (name, email, password, address, contact, gender, profile, company) VALUES ('$name', '$email', '$password', '$address', '$contact', '$gender', '$profileFileName', '$company')";

    if (mysqli_query($conn, $insertQuery)) {
        echo 'Data saved successfully';
    } else {
        echo 'Error saving data: ' . mysqli_error($conn);
    }
} elseif ($action == 'edit_data') {
    // Add your code to fetch and return data for editing
    $id = $_GET['id'];
    $query = "SELECT * FROM users WHERE id=$id";
    $result = mysqli_query($conn, $query);
    $user = mysqli_fetch_assoc($result);
    echo json_encode($user);
} elseif ($action == 'delete_data') {
    // Add your code to delete data from the 'users' table
    $id = $_POST['id'];
    $deleteQuery = "DELETE FROM users WHERE id=$id";

    if (mysqli_query($conn, $deleteQuery)) {
        echo 'Data deleted successfully';
    } else {
        echo 'Error deleting data: ' . mysqli_error($conn);
    }
}

mysqli_close($conn); // Close the database connection
?>