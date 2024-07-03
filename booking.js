//Init
const urlBackend = "https://tickethack-backend-zeta.vercel.app";

fetch('./includes/header.html')
            .then(response => response.text())
            .then(data => {
                // Insert the HTML into the div
                document.getElementById('nav').innerHTML = data;
            })
            .catch(error => console.error('Error loading HTML:', error));
            
//Chargement liste booking
fetch(`${urlBackend}/bookings`)
.then(response => response.json())
.then(bookingsdata => {
    const bookings = bookingsdata.bookings;
    bookings.sort((a, b) => new Date(a.trip.date) - new Date(b.trip.date))
    /* console.log(new Date().toLocaleDateString())
    console.log(moment().format("YYYY-MM-DD"));
    console.log(moment("2024-07-05", "YYYY-MM-DD").fromNow()) */
    if (bookings.length > 0) {
        const booktrips = document.querySelector('#book-trips');
        booktrips.innerHTML =''
        for(const element of bookings) {
            if (new Date(element.trip.date).toLocaleString() >= new Date().toLocaleString()) {
                const objdate = moment(element.trip.date).fromNow();
                const objheure = new Date(element.trip.date).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"});
                booktrips.innerHTML +=`
                <div class="book-row">
                    <p>${element.trip.departure} >   ${element.trip.arrival}</p>
                    <p>${objheure}</p>
                    <p>${element.trip.price}€</p>
                    <p>Departure ${objdate}</p>
                </div>`
            }
        }
        booktrips.innerHTML +=`<hr class="separator">
        <p class="description">Enjoy your travels with Tickethack!</p>`
    }
}
)
