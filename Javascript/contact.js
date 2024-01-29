let name = document.getElementById('name').value;
let email = document.getElementById('email').value;
let message = document.getElementById('message').value;

$(document).ready(function() {
    $(".sendButton").click(function() {

        let name = document.getElementById('name').value;
        let email = document.getElementById('email').value;
        let message = document.getElementById('message').value;

        let dataToSend = { name: name , email: email , message: message };

        console.log(dataToSend);

        $.ajax({
            type: "POST",
            url: "http://localhost/university/PHP/home.php",
            data: JSON.stringify(dataToSend),
            contentType: "application/json",
            dataType: "json",

            success: function(response) {
                console.log(response.result);
                let alertMessage = `Welcome!  , Your Message is saved!!`;
                alert(alertMessage);
            },

            error: function(xhr, status, error) {
                console.error("AJAX Error:", status, error);
                console.log("Server response:", xhr.responseText);
            }
        });
    });
});