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
      productImage.src = "/assets/" + product.image

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