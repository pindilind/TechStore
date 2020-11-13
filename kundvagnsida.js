function initSite() {
  updateNumberToCart();
  printFromLocal()

}


//UPPDATE NUMBER IN CART
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


  
  
let productsInCart = JSON.parse(localStorage.getItem('userList'));


//PRINT FROM LOCAL
function printFromLocal() {
  let main = document.getElementsByTagName('main') [0]

  let currentUser = sessionStorage.getItem("successLogin") 

  for (let i = 0; i < productsInCart.length; i++) {
      const cart = productsInCart[i].cart
       
    
    if(currentUser == productsInCart[i].name) {
      
      for (let i = 0; i < cart.length; i++) {

      let productcardContainer = document.createElement("div")
     
      let productCard = document.createElement("div")

      let productTitle = document.createElement("h2")
      productTitle.innerText = cart[i].title
      
      let productImage = document.createElement("img")
      productImage.src = "/Techstore/assets/" + cart[i].image

      let productPrice = document.createElement("h5")
      productPrice.innerText = cart[i].price + " " + "kr"
      
      let trashIcon = document.createElement("i")
      trashIcon.classList = "far fa-trash-alt"

      let removeBtn = document.createElement("button")
      let buttonText = document.createElement("h4")
        buttonText.innerText = "Ta bort"
        removeBtn.data = i
        removeBtn.onclick = function() {
        removeProducts(this.data)
        }

      
//Classlist fr styling
      productcardContainer.classList = "productCardContainer"
      productPrice.classList = "priceOfProduct"
      productCard.classList = "productCard"
      productTitle.classList = "titleOfProduct"
      removeBtn.classList = "removeCartItems"
      
     
     //Appendar produkter
      productcardContainer.appendChild(productCard)

      productCard.appendChild(productTitle)

      productCard.appendChild(productImage)
      
      productCard.appendChild(productTitle)
      
      productCard.appendChild(productPrice)

      productCard.appendChild(removeBtn)

      removeBtn.appendChild(trashIcon)

      removeBtn.appendChild(buttonText)

      main.appendChild(productcardContainer)


  }

}

}

function removeProducts(index) {
  let removedProduct = JSON.parse(localStorage.getItem("userList"))
  for (let i = 0; i < removedProduct.length; i++) {
      const remove = removedProduct[i].cart
     remove.splice(index, 1)
  localStorage.setItem("userList", JSON.stringify(removedProduct))
  window.location = "kundvagnsida.html"
  updateNumberToCart()
  }
}
}

// funktion som räknar ut totalpris av produkter
function totalprice() {
  let currentUser = sessionStorage.getItem("successLogin") 
  let priceOfProduct = JSON.parse(localStorage.getItem("userList"))
  let totalprice = 0
  for (let i = 0; i < priceOfProduct.length; i++) {
     cart = priceOfProduct[i].cart 
     if(currentUser == priceOfProduct[i].name) 
     for (let i = 0; i < cart.length; i++) {
      totalprice += cart[i].price
   }
     
} 
      let section = document.getElementsByTagName("section")[0]

      let tomKundvagn = document.createElement("h2")
      tomKundvagn.innerText = "Din kundvagn är tom!"

      let totalprisText = document.createElement("b")
      totalprisText.innerText = "Totalt pris:" + " " + totalprice + " " + "kr"

      let purchaseBtn = document.createElement("button")
      let pbtnText = document.createElement("h4")
      pbtnText.innerText = "Slutför ditt köp"  
      let pbtnIcon = document.createElement("icon")
      pbtnIcon.classList = "fas fa-check"
      purchaseBtn.classList = "purchaseBtn"

      let myArray = JSON.parse(localStorage.getItem("userList"))
      for (let i = 0; i < myArray.length; i++) {
          let cart = myArray[i].cart //Hämtar listan och gör en array
          purchaseBtn.data = cart //För att använda this.data på cartToOrders
      }
      purchaseBtn.appendChild(pbtnIcon)
      purchaseBtn.appendChild(pbtnText)

      purchaseBtn.onclick = function(index) {
          cartToOrders(this.data)
          currentUser = sessionStorage.getItem("successLogin")
          let removeCart = JSON.parse(localStorage.getItem("userList"))         
           //Återanvänder funktion från ta bort knappen
          for (let i = 0; i < removeCart.length; i++) {                                
              const remove = removeCart[i].cart
                          
          remove.splice(index)     //splicear hela "carten" istället.  
          localStorage.setItem("userList", JSON.stringify(removeCart))
             
          }
          alert("Tack för ditt köp")
          window.location = "kundvagnsida.html"
      }
              
      if(totalprice > 0) {  //totalprice & slutför köp knapp visas endast om priset är större än 0
      section.appendChild(totalprisText)
      section.appendChild(purchaseBtn)
       return totalprice
      }  
      else {
          section.appendChild(tomKundvagn)
      }  
  } 

totalprice()
// Funktion för att pusha "carten" till "orders" när man slutför köp
function cartToOrders(order) {
  currentUser = sessionStorage.getItem("successLogin")
  let myCart = localStorage.getItem("userList")
  myCart = JSON.parse(myCart)

  for (let i = 0; i < myCart.length; i++) {
                 
  if(currentUser == myCart[i].name) {
          let myOrder = myCart[i]
          myOrder.orders.push(order) 
          localStorage.setItem("userList", JSON.stringify(myCart))   
          
 }
}
}

/* Öppna meny */
function openNav() {
  document.getElementsByTagName("nav")[0].style.display = "block"
  document.getElementById('kundvagnTitle').style.display = 'none'   
 }

function closeNav() {
   document.getElementsByTagName("nav")[0].style.display = "none"
   document.getElementById('kundvagnTitle').style.display = 'block'      
}

function logOut() {
  localStorage.removeItem("successLogin")
  sessionStorage.removeItem("successLogin")
  window.location = "index.html" 

}