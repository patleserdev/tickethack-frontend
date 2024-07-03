const urlBackend = "https://tickethack-backend-zeta.vercel.app";

let cartElementPrototype=`<li class="cart-element">
<span class="trip"> --departure-- > --arrival-- </span>
<span class="departureHour">--departureHour--</span>
<span class="price">--price--€</span>
<span class="deleteOneCart" data-id="--cartId--" ><i class="fa-solid fa-rectangle-xmark fa-2x"></i></span>
</li>`

/***
 *  récupère le header 
 */

fetch('./includes/header.html')
            .then(response => response.text())
            .then(data => {
                // Insert the HTML into the div
                document.getElementById('nav').innerHTML = data;
            })
            .catch(error => console.error('Error loading HTML:', error));
            // récupérer le panier en live


/***
 *  récupère le panier 
 */

            fetch(`${urlBackend}/cart`)
            .then(response => response.json())
            .then((data) => {
                

                if (data.result == true)
                {
                    for(oneCart of data.carts)
                    {
                        let theHour=new Date(oneCart.trip.date)
                        let newCartElement=cartElementPrototype
                        newCartElement=newCartElement.replace('--departure--',oneCart.trip.departure)
                        newCartElement=newCartElement.replace('--arrival--',oneCart.trip.arrival)
                        newCartElement=newCartElement.replace('--departureHour--',theHour.toLocaleTimeString([],{ hour: "2-digit", minute: "2-digit" }))
                        newCartElement=newCartElement.replace('--price--',oneCart.trip.price)
                        newCartElement=newCartElement.replace('--cartId--',oneCart.trip._id)
                        document.querySelector('#cart-content ul').innerHTML +=newCartElement
                    }

                    activeDeleteButtons()
                    updateTotal()
                }
            })


/***
 *  listner de deleteOne
 * 
 */

function activeDeleteButtons()
{
let buttons = document.querySelectorAll('.deleteOneCart')

    for(let button of buttons)
    {
        button.addEventListener('click',function(){

            console.log(this.dataset.id)
            if ( confirm("Want to delete from cart ?"))
            {     
                fetch(`${urlBackend}/cart/deleteone/${this.dataset.id}`, { method: 'DELETE' })
                .then(response => response.json())
                .then((data) => {
                    console.log(data)
                    this.parentNode.remove()
                    updateTotal()
                })
            }
        })
    }
}
            


/***
 *  listner de purchase
 */
            

/***
 *   calcul du total
 */        

function updateTotal()
{}