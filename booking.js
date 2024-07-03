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
    /* console.log(new Date().toLocaleDateString())
    console.log(moment().format("YYYY-MM-DD"));
    console.log(moment("2024-07-05", "YYYY-MM-DD").fromNow()) */
    if (bookings.length > 0) {
        const booktrips = document.querySelector('#book-trips');
        booktrips.innerHTML =''
        for(const element of bookings) {
            if (new Date(element.date).toLocaleDateString() < new Date().toLocaleDateString()) {
                const objdate = moment(moment().format("YYYY-MM-DD"), "YYYY-MM-DD").fromNow();
                booktrips.innerHTML +=`
                <div class="book-row">
                    <p class="description">${element.departure} >   ${element.arrival}  ${objheure}  ${element.price}€ Departure in ${objdate}</p>
                </div>`
            }
        }
    }
}
)
