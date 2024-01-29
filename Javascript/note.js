
if(!localStorage.getItem('userID')){
    window.location.href = '../Html/signin.html';
}

let emailBold = document.querySelector('#emailBold');
let nameBold = document.querySelector('#nameBold');

emailBold.innerHTML = `Email: ${localStorage.getItem('userEmail')}`;
nameBold.innerHTML = `Name: ${localStorage.getItem('userName')}`;

let h1Title = document.querySelector('.title h1');
h1Title.innerHTML = `Weolcome ${localStorage.getItem('userName')} , You Can See Your Notes!!`;




function getNotes(year = 1) {

    let dataToSend = { userID: localStorage.getItem('userID') , year: year };
    console.log(dataToSend);

    $.ajax({
        
        type: "POST",
        url: "http://localhost/university/PHP/note.php",
        data: JSON.stringify(dataToSend),
        contentType: "application/json",
        dataType: "json",
    
        success: function (response) {
            console.log(response);
            
            let table = document.createElement('table');
            table.className = 'data-table';
            let thead = document.createElement('thead');
            let tr = document.createElement('tr');
    
            for(let key in response[0]){
                let th = document.createElement('th');
                th.appendChild(document.createTextNode(key));
                tr.appendChild(th);
                
            }
    
            thead.appendChild(tr);
    
            table.appendChild(thead);
    
            let tbody = document.createElement('tbody');
    
            for(let i=0; i<response.length; i++){
    
                let tr = document.createElement('tr');
                for(let key in response[i]){
                    let td = document.createElement('td');
                    td.appendChild(document.createTextNode(response[i][key]));
                    tr.appendChild(td);
                }
                
                tbody.appendChild(tr);
            }
    
            table.appendChild(tbody);
            document.body.appendChild(table);
        },
    
    
        error: function(xhr, status, error) {
            console.error("AJAX Error:", status, error);
            console.log("Server response:", xhr.responseText);
        }
        
    });
}

let select = document.getElementById('selectedYear');

getNotes();

select.addEventListener('change', function () {
    
    let table = document.querySelector('.data-table');
    table.remove();
    let selectedYear = select.value;

    getNotes(selectedYear);

    console.log(select, select.value);
});

