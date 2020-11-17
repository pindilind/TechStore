function initSite() { 
    updateNumberToCart()
    addProductsFromLocal()
}

// Öppna Meny
function openNav() {
    document.getElementsByTagName("nav")[0].style.display = "block"      
}
 
function closeNav() {
    document.getElementsByTagName("nav")[0].style.display = "none"      
}

 /* Getting the function for cart-counter from main.js, a copy */
 function updateNumberToCart() {
    let currentUser = sessionStorage.getItem("successLogin") 
    let productList = JSON.parse(localStorage.getItem("userList"))

        for (let i = 0; i < productList.length; i++) {
            const cart = productList[i].cart        
                if(currentUser == productList[i].name)
                    document.getElementById("purchase").innerText = cart.length
                    else {
                        document.getElementById("purchase").innerText = null
                    }
        }              
}    

function logOut() {
    localStorage.removeItem("successLogin")
    sessionStorage.removeItem("successLogin")
    window.location = "index.html"   
}

let users = JSON.parse(localStorage.getItem("userList"))
  
function addProductsFromLocal() {
    let main = document.getElementsByTagName("main")[0]
    let currentUser = sessionStorage.getItem("successLogin") 
    let userObject

        for (let i = 0; i < users.length; i++) { 
               
            if(currentUser == users[i].name) {
                userObject = users[i]
                    let ordersHeader = document.createElement("h1")
                        ordersHeader.innerText = "Dina senaste beställningar"
                            ordersHeader.classList = "ordersHeader"   
                                main.appendChild(ordersHeader)   
                                    break
          
            }
        }
            for (let x = 0; x < userObject.orders.length; x++) { //Loopar igenom users.orders
                let productList = userObject.orders[x]
                    let orderDiv = document.createElement("div")   
                        let orderText = document.createElement("h1")
                            orderText.innerText = "Order" + "#" + (x + 1) //printar ut ordrarna i nummer-ordning.         
                                console.log("NewOrder")

                for (let y = 0; y < productList.length; y++) { //Hämtar alla ordrar och skapar container och appendar. 
                    console.log(productList[y])
               
                    let orderContainer = document.createElement("div")
        
                    let productTitle = document.createElement("h1")
                    productTitle.innerText = productList[y].title

                    let productPrice = document.createElement("b")
                    productPrice.innerText = productList[y].price + " " + "kr" 

       
        
                    /* Appending elements to main*/
                    orderContainer.appendChild(orderText)
                    orderDiv.appendChild(productTitle)
                    orderDiv.appendChild(productPrice)
                    orderContainer.appendChild(orderDiv) 
                    main.appendChild(orderContainer)

                    /* Classlists for styling in css */
                    orderContainer.classList = "orderContainer"
                    productPrice.classList = "priceOfProduct"
                    productTitle.classList = "titleOfProduct"
                    orderDiv.classList = "orderDiv"
                    orderText.classList = "orderText"
       
                }   
            }     
}



