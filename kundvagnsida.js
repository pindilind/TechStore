function initSite() {
  updateNumberToCart();
  printFromLocal()

}


//UPPDATE NUMBER IN CART
   function updateNumberToCart() {
      let productList = JSON.parse(localStorage.getItem('listOfProducts'));
      if(productList) {
      document.getElementById('purchase').innerText = productList.length
     
      }
    } 

  
  
let productList = JSON.parse(localStorage.getItem('listOfProducts'));


//PRINT FROM LOCAL
function printFromLocal() {
  let main = document.getElementsByTagName('main') [0]

if(productList && productList.length) {
    
  for(let i = 0; i < productList.length; i++) {
    let product = productList[i]; 

      let productcardContainer = document.createElement("div")
     
      let productCard = document.createElement("div")

      let productTitle = document.createElement("h2")
      productTitle.innerText = product.title
      
      let productImage = document.createElement("img")
      productImage.src = "/Techstore/assets/" + product.image

      let productPrice = document.createElement("h5")
      productPrice.innerText = product.price + " " + "kr"
      
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
  let removeItem = JSON.parse(localStorage.getItem('listOfProducts'));
  removeItem.splice(index, 1)
  localStorage.setItem('listOfProducts', JSON.stringify(removeItem))
  window.location = "kundvagnsida.html"
}
/* funktion som räknar ihop totala priset på produkterna i kundvagn */
function totalprice() {
  let priceOfProduct = JSON.parse(localStorage.getItem("listOfProducts"))
  let totalprice = 0
  for (let i = 0; i < priceOfProduct.length; i++) {
     totalprice += priceOfProduct[i].price;    
  }
  /* appendar totalpris & slutförköp knapp i section */
      let section = document.getElementsByTagName("section")[0]

      let totalprisText = document.createElement("b")
      totalprisText.innerText = "Totalt pris:" + " " + totalprice + " " + "kr"

      let purchaseBtn = document.createElement("button")
      let pbtnText = document.createElement("h4")
      pbtnText.innerText = "Slutför ditt köp"  
      let pbtnIcon = document.createElement("icon")
      pbtnIcon.classList = "fas fa-check"
      purchaseBtn.classList = "purchaseBtn"
      purchaseBtn.appendChild(pbtnIcon)
      purchaseBtn.appendChild(pbtnText)

      purchaseBtn.onclick = function() {
          localStorage.removeItem("listOfProducts")
          alert("Tack för ditt köp")
          window.location = "kundvagnsida.html"
      }
      
      section.appendChild(totalprisText)
      section.appendChild(purchaseBtn)

       return totalprice
    
  } 

totalprice()