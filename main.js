
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
       
    // This would also be a good place to initialize other parts of the UI
}



/** Uses the loaded products data to create a visible product list on the website */
function addProductsToWebpage() {
    // Check your console to see that the products are stored in the listOfProducts varible.
    
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
        productImage.src = "/TechStore/assets/" + productList.image

        let productPrice = document.createElement("b")
        productPrice.innerText = productList.price + " " + "kr" 

        let iconCart = document.createElement("i")
        iconCart.classList = "fas fa-cart-arrow-down"

        let cartButton = document.createElement("button")
        let buttonText = document.createElement("h3")
        buttonText.innerText = "Lägg till i kundvagnen"
        cartButton.data = productList
        cartButton.onclick = function() {
            addProductsToCArt(this.data)
          
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

    /* Funktion för att lägga till produkt i varukorg */ 
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
 
   document.getElementById('loginButton').addEventListener("click", login)
   document.getElementById("registerButton").addEventListener("click", regUser)  
 
   function getUserList() {
     let userList = localStorage.getItem("userList")
     /* creating a list if there is none */
     if(userList == null) {
          userList = []
 }   else  {
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
     let myList = getUserList() 
     
     nameList = false
     for(i = 0; i < myList.length; i++){
         if(nameToCheck == myList[i].name && passwordtoCheck == myList[i].password) {
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
       if (nameList == true) {
          sessionStorage.setItem("successLogin", userName) 
          localStorage.setItem("successLogin", userName) 
          alert("Välkommen " +userName)
         
       } else {
         alert('Invalid login!');
        
       }
     }
 
 function logOut() {
     localStorage.removeItem("successLogin")
     sessionStorage.removeItem("successLogin")
     window.location = "index.html"   
 }
 
    
    

 

 
   
    

