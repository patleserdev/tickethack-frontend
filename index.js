//Init
const urlBackend = "https://tickethack-backend-zeta.vercel.app";
document.querySelector('#search-date').value = new Date().toISOString().split('T')[0]; //Init input date

//Event listener bouton Search
document.querySelector('#search-btn').addEventListener('click',()=> {
    //Reading data departure, arrival and date
    const dataInput = document.querySelectorAll('input');
    const tripSearch = {
        departure:dataInput[0].value,
        arrival:dataInput[1].value,
        date:dataInput[2].value,
    }

    //Fetch route PSOT trips
    fetch(`${urlBackend}/trips`, { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tripSearch)
    })
    .then(response => response.json())
    .then(tripsdata => {
        //Read result = true
        if(tripsdata .result) {
            //Init #list-trip
            document.querySelector('#list-trip').innerHTML ='';
            
            //Add trips to #list-trip
            let objheure='';
            for(const element of tripsdata.trips) {
                objheure = element.date.split('T')[1].split(':')[0] + ":" + element.date.split('T')[1].split(':')[1];
                document.querySelector('#list-trip').innerHTML += `
                <div class="book-row">
                    <p class="description">${element.departure} >   ${element.arrival}  ${objheure}  ${element.price}€</p>
                    <button id="book-btn" class="button">Book</button>
                </div>`
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