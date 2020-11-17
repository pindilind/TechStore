
var listOfProducts;

/** Get products from the json file and store it in a gobal variable */
function loadProducts() {
    fetch("./products.json")
    .then(function(response) {
        return response.json();
    })
    .then(function(products) {
        listOfProducts = products;
        addProductsToWebpage();
    });
}


function initSite() {
    loadProducts();
}



/** Uses the loaded products data to create a visible product list on the website */
function addProductsToWebpage() {
       
    for (let i = 0; i < listOfProducts.length; i++) {
        let productList = listOfProducts[i]; 
    
            /* Creating respective elements for all information taken from Product list */
            let productcardContainer = document.createElement("div")
     
            let productCard = document.createElement("div")  
   
            let productTitle = document.createElement("h1")
            productTitle.innerText = productList.title

            let productDesc = document.createElement("div")
            productDesc.innerText = productList.description
    
            let productImage = document.createElement("img")
            productImage.src = "/Techstore/assets/" + productList.image

            let productPrice = document.createElement("b")
            productPrice.innerText = productList.price + " " + "kr" 

            let iconCart = document.createElement("i")
            iconCart.classList = "fas fa-cart-arrow-down"

            let cartButton = document.createElement("button")
            let buttonText = document.createElement("h3")
                buttonText.innerText = "Lägg till i kundvagnen"
                    cartButton.data = productList

                        cartButton.onclick = function() {
                            currentUser = sessionStorage.getItem("successLogin")
           
                                if(currentUser) { //Om inloggad kör funktion productsToCart
                                    addProductsToCArt(this.data)
            
        }
                                    else {
                                        productsToCartNoLogIn(this.data) //Annars kör funktion för att lägga till i varukorg utan att ej vara inloggad.
                                    }  
        }
          
                             
        
            /* Classlists for styling in css */
            productcardContainer.classList = "productCardContainer"
            productPrice.classList = "priceOfProduct"
            productDesc.classList = "productDescription"
            productCard.classList = "productCard"
            productTitle.classList = "titleOfProduct"
            cartButton.classList = "startViewButton"
        

            /* Appending my productcards to show up on webpage */
            productCard.appendChild(productTitle)
            productCard.appendChild(productDesc)
            productCard.appendChild(productImage)
            productCard.appendChild(productPrice)
            productCard.appendChild(cartButton)
            cartButton.appendChild(iconCart)
            cartButton.appendChild(buttonText)

            productcardContainer.appendChild(productCard)

            let main = document.getElementsByTagName("main")[0]
            main.appendChild(productcardContainer)


}
  
    updateNumberToCart()

// Funktion för att lägga till produkt i varukorg som inloggad.
function addProductsToCArt(addProduct) {
    currentUser = sessionStorage.getItem("successLogin")
        let productList = localStorage.getItem("userList")
        productList = JSON.parse(productList)
    
            for (let i = 0; i < productList.length; i++) {
                       
                if(currentUser == productList[i].name) {
                    let product = productList[i]
                        product.cart.push(addProduct) 
                            localStorage.setItem("userList", JSON.stringify(productList))   
                            updateNumberToCart()
                }
        }
}

// funktion för att lägga till produkter i varukorg ej inloggad.
function productsToCartNoLogIn(addProduct) {
    currentUser = sessionStorage.getItem("successLogin")
    let productList = [addProduct]
        if(localStorage.getItem("guestCart")) {
            productList = JSON.parse(localStorage.getItem('guestCart')); 
                productList.push(addProduct)
                 
        }
            localStorage.setItem("guestCart", JSON.stringify(productList))
            updateNumberToCart()
        
}
    

function updateNumberToCart() {
    let currentUser = sessionStorage.getItem("successLogin") 
       
    if(currentUser) { //Räknar cart för inloggad användare. 
    let productList = JSON.parse(localStorage.getItem("userList"))
    for (let i = 0; i < productList.length; i++) {
    const cart = productList[i].cart  
    document.getElementById("purchase").innerText = cart.length
}
}
    else {
        let guestCart = JSON.parse(localStorage.getItem("guestCart")); //Räknar guestCart dvs ej inloggad. 
        if(guestCart) 
        document.getElementById('purchase').innerText = guestCart.length
    }
}          
}    

/* Reguser & login funktioner nedan */
function openNav() {
    document.getElementsByTagName("nav")[0].style.display = "block"    
}
 
 function closeNav() {
     document.getElementsByTagName("nav")[0].style.display = "none"   
}  
 
 function openForm() {
     document.getElementsByTagName("section")[0].style.display = "block"
     document.getElementsByTagName("nav")[0].style.display = "none"
} 
   
function closeForm() {
    document.getElementsByTagName("section")[0].style.display = "none";
}
 
//Hämtar knapp för reg
document.getElementById("registerButton").addEventListener("click", regUser)  
 
function getUserList() {
    let userList = localStorage.getItem("userList")
         
        if(userList == null) { //skapar en lista om det inte finns någon, annars parsea den. 
            userList = []
        }       else  {
                    userList = JSON.parse(userList)
                }
                    return userList
}

 /* Save array to localstorage */
function saveUserList(saveUserList) {
    localStorage.getItem("userList",JSON.stringify(saveUserList))
 }
 
 /* function for regging users, pushes a new "person" to the userList in localstorage. */
function regUser() {
    let regUsername = document.getElementById("registerUsername").value
    let regPassword = document.getElementById("registerPassword").value
     
    let cart = []
    let orders = []
    
    let newUser = getUserList()
    let newAcc = {
        name: regUsername,
        password: regPassword,
        cart: cart,
        orders: orders
    }
        newUser.push(newAcc)
        localStorage.setItem("userList", JSON.stringify(newUser))
        saveUserList(newUser)
  
}

 /* Checking if the username & password exist, returning true or false */
function checkUser(nameToCheck, passwordtoCheck) { 
    let userList = getUserList() 
     
     nameList = false
        for(i = 0; i < userList.length; i++){
            if(nameToCheck == userList[i].name && passwordtoCheck == userList[i].password) {
                nameList = true
            }
        }
                return nameList
}
 
 /* Login-function, fetches value from login-inputs, calling checkUser, if a match = successLogin */
function login() {
    let userName = document.getElementById("signinUsername").value
    let userPass = document.getElementById("signinPassword").value
        checkUser(userName, userPass)
            if(nameList == true) {
                sessionStorage.setItem("successLogin", userName) 
                    localStorage.setItem("successLogin", userName) 
                        alert("Välkommen " +userName)
            }
                           else {
                                alert('Invalid login!');
                            }
                                
}

// funktion för att föra över guestCarten till user.cart när man loggar in.  
function guestCartToUser() {
    currentUser = sessionStorage.getItem("successLogin")
    let userName = document.getElementById("signinUsername").value
    let first = JSON.parse(localStorage.getItem("userList"))
    let second = JSON.parse(localStorage.getItem("guestCart"))
    
            if(second) {
                for (let i = 0; i < first.length; i++) {

                    if(first[i].name == userName) { 
                        let newCart = first[i].cart.concat(second) //Mergar guestCart till user.cart
                        first[i].cart = newCart
                        localStorage.setItem("userList", JSON.stringify(first))
                        localStorage.removeItem("guestCart") 
                }    
            }
                
    }   
       
}   
 
function logOut() {
    localStorage.removeItem("successLogin")
        sessionStorage.removeItem("successLogin")
            window.location = "index.html"   
}


    



 
   
    

