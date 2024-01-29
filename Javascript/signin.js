
localStorage.removeItem('userEmail');
localStorage.removeItem('userName');
localStorage.removeItem('userID');



$(document).ready(function() {
    $(".SignInButton").click(function() {

        let email = document.querySelector("#email");
        let password= document.querySelector("#password");

        let emailValue = email.value;
        let passwordValue = password.value;
    
        let dataToSend = { email: emailValue , password: passwordValue };
        //json.stringify() : covert from javascript object to json object
    
        console.log(dataToSend);
    
        $.ajax({
            
            type: "POST",
            url: "http://localhost/university/PHP/signin.php",
            data: JSON.stringify(dataToSend),
            contentType: "application/json",
            dataType: "json",
    
            success: function (response) {
                
                
                if(response.successSignIn === true){
                    //console.log("response is ", response.successSignIn  , response.email , response.name);
                    localStorage.setItem('userID' , response.studentID);
                    localStorage.setItem('userName' , response.name);
                    localStorage.setItem('userEmail' , response.email);
                    window.location.href = "../Html/home.html";
                }else{
    
                    alert(`Email Or Password Is Incorrect!!`)
                }
                
            },
    
            error: function(xhr, status, error) {
                console.error("AJAX Error:", status, error);
                console.log("Server response:", xhr.responseText);
            }
            
        });
    }

)}
);




/*
SignInButton.onclick = function() {

    let emailValue = email.value;
    let passwordValue = password.value;

    let dataToSend = { email: emailValue , password: passwordValue };
    //json.stringify() : covert from javascript object to json object

    console.log(dataToSend);

    $.ajax({
        
        type: "POST",
        url: "http://localhost/university/PHP/signin.php",
        data: JSON.stringify(dataToSend),
        contentType: "application/json",
        dataType: "json",

        success: function (response) {
            
            
            if(response.successSignIn === true){
                //console.log("response is ", response.successSignIn  , response.email , response.name);
                localStorage.setItem('userID' , response.studentID);
                localStorage.setItem('userName' , response.name);
                localStorage.setItem('userEmail' , response.email);
                window.location.href = "../Html/home.html";
            }else{

                alert(`Email Or Password Is Incorrect!!`)
            }
            
        },

        error: function(xhr, status, error) {
            console.error("AJAX Error:", status, error);
            console.log("Server response:", xhr.responseText);
        }
        
    });
}
*/
