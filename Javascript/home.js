
let signin = document.getElementById("signin");
let signout = document.getElementById("signout");
let profileButton = document.getElementById('profileButton');

if(!(localStorage.getItem('userEmail') || localStorage.getItem('userName'))){

    signout.style.display = 'none';
    profileButton.style.display = 'none';
}

else{
    signin.style.display = 'none';
}


/*-----------------------------------------------------------------------------------*/

//For The Name 
let boldName = document.querySelector('#boldName');
boldName.innerHTML = localStorage.getItem('userName');

/*------------------------------------------------------------------------------------*/


//For The SignOut Button
document.getElementById('signout').addEventListener('click' , function() {

    localStorage.removeItem('userID');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
});

/*-----------------------------------------------------------------------------------------*/


// Foe Sign In

signin.addEventListener('click' , (e) => {

    e.preventDefault();
    window.location.href = '../Html/signin.html';
})

//For The Profile Popup

let popupContainer = document.querySelector('.popup-container');

profileButton.addEventListener('click' , (e) => {
    e.preventDefault();
    popupContainer.style.visibility = 'visible';
})

//Profile Information

let profileId = document.getElementById('profileId');
let emailInput = document.querySelector('.emailInput');
emailInput.value = localStorage.getItem('userEmail');

profileId.innerHTML = `<span>Your Id:</span> ${localStorage.getItem('userID')}`;



let closeButton = document.querySelector('.closeButton');
closeButton.addEventListener('click' , function() {

    popupContainer.style.visibility= 'hidden';
});



// Update Email And Password

$(document).ready(function() {
    $(".updateButton").click(function() {

        let emailInput = document.querySelector('.emailInput');
        let passwordInput = document.querySelector('.passwordInput');
        let confirmPasswordInput = document.querySelector('.confirmPasswordInput');

        let dataToSend = { userId: localStorage.getItem('userID') , email: emailInput.value , password: passwordInput.value };


        if(passwordInput.value !== confirmPasswordInput.value){
            alert('The password and the confirm password not the same!!');
        }
        console.log(dataToSend);

        $.ajax({
            type: "PUT",
            url: "http://localhost/university/PHP/home.php",
            data: JSON.stringify(dataToSend),
            contentType: "application/json",
            dataType: "json",

            success: function(response) {

                console.log("response:" , response.email);
                localStorage.setItem('userEmail' , response.email);
                popupContainer.style.visibility= 'hidden';
            },

            error: function(xhr, status, error) {
                console.error("AJAX Error:", status, error);
                console.log("Server response:", xhr.responseText);
            }
        });
    });
});




/* Add Comment Form (Contact Section) */

$(document).ready(function() {
    $(".sendButton").click(function() {

        let name = document.querySelector('.sendName').value;
        let email = document.querySelector('.sendEmail').value;
        let message = document.querySelector('.sendMessage').value;

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

