function initSite() { 
    updateNumberToCart()
    printFromLocal()
}

/* Öppna meny */
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

let productsInCart = JSON.parse(localStorage.getItem('userList'));

