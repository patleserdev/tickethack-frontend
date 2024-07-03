const urlBackend = "https://tickethack-backend-zeta.vercel.app";

let cartElementPrototype=`<li class="cart-element" data-id="--cartId--">
<span class="trip"> --departure-- > --arrival-- </span>
<span class="departureHour">--departureHour--</span>
<span class="price">--price--€</span>
<span class="deleteOneCart"  ><i class="fa-solid fa-rectangle-xmark fa-2x"></i></span>
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

            if ( confirm("Want to delete from cart ?"))
            {     
                fetch(`${urlBackend}/cart/deleteone/${this.parentNode.dataset.id}`, { method: 'DELETE' })
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

//booking/add tripId 
function activePurchase()
{
    
    if ( confirm("Want to checkout from cart ?"))
    { 
        let cartElements= document.querySelectorAll('.cart-element')
        // for(let element of cartElements)
        // {
        //     fetch(`${urlBackend}/bookings/add`, { 
        //         method: 'POST',
        //         headers: { 'Content-Type': 'application/json' },
        //         body: JSON.stringify({tripId : element.dataset.id})})
        //         .then(response => response.json())
        //         .then((data) => {
        //            if (data.result == true)
        //            {
        //         fetch(`${urlBackend}/cart/deleteall`, { method: 'DELETE' })
        //         .then(response => response.json())
        //         .then((data) => {
                    
        //             element.remove()
                    
        //             updateTotal()
        //         })
        //            }

        //         })
        // }
        tripIds=[]
        for(let element of cartElements)
        {
            tripIds.push(element.dataset.id)
        }
            fetch(`${urlBackend}/bookings/addMany`, { 
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({tripIds})})
                .then(response => response.json())
                .then((data) => {
                   if (data.result == true)
                   {
                fetch(`${urlBackend}/cart/deleteall`, { method: 'DELETE' })
                .then(response => response.json())
                .then((data) => {
                    
                    element.remove()
                    
                    updateTotal()
                })
                   }

                })
        


        document.querySelector('#cart-content').innerHTML="Your cart is paied"
        setTimeout(() => {
            document.querySelector('#cart-content').innerHTML=""
          }, "3000");


    }
    
}

document.querySelector('#purchase').addEventListener('click',function(e){
        e.preventDefault()

        activePurchase()
})


//deleteall cart


            

/***
 *   calcul du total
 */        

function updateTotal()
{
    let prices=document.querySelectorAll('.price')

    total=0
    for(let price of prices)
    {
        
        let priceValue=Number(price.textContent.replace('€',''))
        total+=priceValue
    }
    
    document.querySelector('#cart-total').innerHTML=`Total : ${total} €`
}