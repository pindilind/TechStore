
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
        productImage.src = "/assets/" + productList.image

        let productPrice = document.createElement("b")
        productPrice.innerText = productList.price + " " + "kr" 

        let iconCart = document.createElement("i")
        iconCart.classList = "fas fa-cart-arrow-down"

        let cartButton = document.createElement("button")
        cartButton.innerText = "Lägg till i kundvagnen"
        cartButton.data = productList
        cartButton.onclick = function() {
            addProductsToCArt(this.data)
          
        }
        updateNumberToCart()

        
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

        productcardContainer.appendChild(productCard)

        let main = document.getElementsByTagName("main")[0]
        main.appendChild(productcardContainer)


    }

    //PURCHASE FUNKTION /STARTVIEW 
    //ADD PRODUCT TO LOCAL STORAGE
    function addProductsToCArt(addProduct) {
        let productList = [addProduct]
        if(localStorage.getItem('listOfProducts')) {
           productList = JSON.parse(localStorage.getItem('listOfProducts')); 
           productList.push(addProduct)
        }
        
        localStorage.setItem("listOfProducts", JSON.stringify(productList))
        updateNumberToCart()
    }
    //PRINTING PRODUCTS ON PAGE

    function updateNumberToCart() {
      let productList = JSON.parse(localStorage.getItem("listOfProducts"));
      if(productList) 
      document.getElementById('purchase').innerText = productList.length

    } 

    }


    
    

 

 
    // Add your code here, remember to brake your code in to smaller function blocks
    // to reduce complexity and increase readability. Each function should have
    // an explainetory comment like the one for this function, see row 22.   // TODO: Remove the console.log and these comments when you've read them.
    

