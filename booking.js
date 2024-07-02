//Init
const urlBackend = "https://tickethack-backend-zeta.vercel.app";

//Chargement liste booking
fetch(`${urlBackend}/bookings`)
.then(response => response.json())
.then(bookingsdata => {
    const bookings = bookingsdata.bookings;
    console.log(bookings)
    if (bookings.length > 0) {
        const booktrips = document.querySelector('#book-trips');
        booktrips.innerHTML =''
        for(const element of bookings) {
            if (new Date(element.date).toISOString() < new Date().toISOString()) {
                booktrips.innerHTML +=`
                <div class="book-row">
                    <p class="description">${element.departure} >   ${element.arrival}  ${objheure}  ${element.price}€ Departure in </p>
                </div>`
            }
        }
    }
}
)
