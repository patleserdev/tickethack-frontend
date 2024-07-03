//Init
const urlBackend = "https://tickethack-backend-zeta.vercel.app";
document.querySelector('#search-date').value = new Date().toISOString().split('T')[0]; //Init input date

fetch('./includes/header.html')
            .then(response => response.text())
            .then(data => {
                // Insert the HTML into the div
                document.getElementById('nav').innerHTML = data;
            })
            .catch(error => console.error('Error loading HTML:', error));
            
//Event listener bouton Search
document.querySelector('#search-btn').addEventListener('click',()=> {
    //Reading data departure, arrival and date
    const dataInput = document.querySelectorAll('input');
    const tripSearch = {
        departure:dataInput[0].value,
        arrival:dataInput[1].value,
        date:dataInput[2].value,
    }

    //Fetch route POST trips
    fetch(`${urlBackend}/trips`, { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tripSearch)
    })
    .then(response => response.json())
    .then(tripsdata => {
        //Read result = true
        console.log(tripsdata .result)
        if(tripsdata .result) {
            //Init #list-trip
            document.querySelector('#list-trip').innerHTML ='';
            
            //Add trips to #list-trip
            let objheure='';
            for(const element of tripsdata.trips) {
                //objheure = element.date.split('T')[1].split(':')[0] + ":" + element.date.split('T')[1].split(':')[1];
                objheure = new Date(element.date).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"});
                document.querySelector('#list-trip').innerHTML += `
                <div class="book-row">
                    <p class="description">${element.departure}     >       ${element.arrival}    ${objheure}     ${element.price}€</p>
                    <button class="button" data-id="${element._id}">Book</button>
                </div>`
            }
            //Add events to #list-trip
            let bookButtons = document.querySelector('#list-trip').querySelectorAll('.button');
            for(let i = 0; i < bookButtons.length; i++) {
                bookButtons[i].addEventListener('click', ()=> {
                    const tripId = bookButtons[i].dataset.id;
                    fetch(`${urlBackend}/cart/add`, { 
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({tripId})
                    })
                    .then(response => response.json())
                    .then(cartdata => {
                        if(!cartdata .result){
                            document.querySelector('#list-trip').innerHTML = `
                            <img src="./assets/images/notfound.png" alt="No trip found."/>
                            <hr class="separator">
                            <p class="description">No trip found.</p>`
                        }
                    })
                })
            }
        }
        //Read result = false
        else {
            document.querySelector('#list-trip').innerHTML = `
            <img src="./assets/images/notfound.png" alt="No trip found."/>
            <hr class="separator">
            <p class="description">No trip found.</p>`
        }
    })
})
