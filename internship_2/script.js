// Add your JavaScript/jQuery code for form validation and CRUD operations here

$(document).ready(function () {
    // Initialize DataTable
    var dataTable = $('#dataTable').DataTable({
        "ajax": "backend.php?action=get_data", // Your server-side script for retrieving data
        "columns": [
            {"data": "name"},
            {"data": "email"},
            {"data": "password"},
            {"data": "address"},
            {"data": "contact"},
            {"data": "gender"},
            {"data": "profile"},
            {"data": "company"},
            {
                "data": null,
                "render": function (data, type, row) {
                    return '<button onclick="editData(' + row.id + ')">Edit</button> ' +
                           '<button onclick="deleteData(' + row.id + ')">Delete</button>';
                }
            }
        ]
    });
});

function saveData() {
    // Add your form validation here
    if (validateForm()) {
        // Add your AJAX code to send form data to the server for saving
        var formData = new FormData($('#crudForm')[0]);

        $.ajax({
            type: 'POST',
            url: 'backend.php?action=save_data',
            data: formData,
            processData: false,
            contentType: false,
            success: function () {
                // Refresh DataTable after saving data
                $('#dataTable').DataTable().ajax.reload();
                // Clear form fields
                $('#crudForm')[0].reset();
            }
        });
    }
}

function editData(id) {
    // Add your AJAX code to fetch data for editing based on the ID
    $.ajax({
        type: 'GET',
        url: 'backend.php?action=edit_data&id=' + id,
        success: function (data) {
            // Populate form fields with data for editing
            var user = JSON.parse(data);
            $('#name').val(user.name);
            $('#email').val(user.email);
            $('#password').val(user.password);
            $('#address').val(user.address);
            $('#contact').val(user.contact);
            $('#gender').val(user.gender);
            // Add code to handle profile and company checkboxes
            // ...

            // After populating form, you may open a modal or directly update the form
        }
    });
}

function deleteData(id) {
    // Add your AJAX code to delete data based on the ID
    if (confirm('Are you sure you want to delete this record?')) {
        $.ajax({
            type: 'POST',
            url: 'backend.php?action=delete_data',
            data: {id: id},
            success: function () {
                // Refresh DataTable after deleting data
                $('#dataTable').DataTable().ajax.reload();
            }
        });
    }
}

function validateForm() {
    // Add your validation logic for each form field
    var name = $('#name').val();
    var email = $('#email').val();
    var password = $('#password').val();
    var address = $('#address').val();
    var contact = $('#contact').val();

    // Example: Validate Name (letters only)
    var nameRegex = /^[a-zA-Z]+$/;
    if (!name.match(nameRegex)) {
        $('#name').addClass('is-invalid');
        return false;
    } else {
        $('#name').removeClass('is-invalid');
    }

    // Example: Validate Email
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.match(emailRegex)) {
        $('#email').addClass('is-invalid');
        return false;
    } else {
        $('#email').removeClass('is-invalid');
    }

    // Example: Validate Password (uppercase, lowercase, number, and special character)
    var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!password.match(passwordRegex)) {
        $('#password').addClass('is-invalid');
        return false;
    } else {
        $('#password').removeClass('is-invalid');
    }

    // Example: Validate Address (not empty)
    if (address.trim() === '') {
        $('#address').addClass('is-invalid');
        return false;
    } else {
        $('#address').removeClass('is-invalid');
    }

    // Example: Validate Contact (only 10 characters)
    if (contact.length !== 10) {
        $('#contact').addClass('is-invalid');
        return false;
    } else {
        $('#contact').removeClass('is-invalid');
    }

    // Add validation for other fields

    // If all validations pass
    return true;
}
