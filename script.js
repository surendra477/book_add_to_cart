function SearchFun() {
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    ul = document.getElementById("myUL");
    // ul = document.getElementById("lis");
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("h5")[0];

        txtValue = a.textContent || a.innerText;
        console.log(txtValue);
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
            if (filter == "") {
                li[i].style.display = "";
            }
        }
    }
}

let carts = document.querySelectorAll(".click_add");

let products = [
  {id:"A", name: "HARPER_LEE",tag:'harper', price: 500, inCart: 0},
  {id:"B", name: "BHAGAVAD GITA",tag:'bhagavad', price: 200, inCart: 0},
  {id:"C", name: "CHOSEN MAIDEN",tag:'chosen', price: 900, inCart: 0 },
  {id:"D",name: "The KITE RUNNER",tag:'kite', price: 800, inCart: 0 },
  {id:"E", name: "THE LORDS OF THE RINGS",tag:'rings', price: 600, inCart: 0 },
  {id:"F", name: "THE GIRL IN THE ROOM",tag:'room', price: 500, inCart: 0 },
  {id:"G", name: "CHANAKYA NITI",tag:'chanakya', price: 280, inCart: 0 },
  {id:"H", name: "SRIMAD BHAGAVATAM",tag:'srimad', price: 260, inCart: 0 },
];


for (let i = 0; i<carts.length; i++)
{
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i])
        totalCost(products[i]);
    })
}


function onLoadNumbers(){
    let productNumbers = localStorage.getItem('cartNumbers')

    if(productNumbers){
        document.querySelector(".spns_cart").textContent = productNumbers ;
    }
}
function cartNumbers(product){
   // console.log("My Product is", product);
    let productNumbers = localStorage.getItem('cartNumbers');

    productNumbers = parseInt(productNumbers)

    if(productNumbers){
        localStorage.setItem('cartNumbers', productNumbers+1)
        document.querySelector(".spns_cart").textContent = productNumbers + 1
    }else{
        localStorage.setItem("cartNumbers",1);
        document.querySelector(".spns_cart").textContent =  1;
    }
    setItem(product)
}

 function setItem(product)
 {
    //  console.log("Inside of setitems function")
    //  console.log("My Product is",product)

    let cartItems = localStorage.getItem('productInCart');
    cartItems = JSON.parse(cartItems);
console.log(cartItems)
    if(cartItems != null) {
        if(cartItems[product.name] == undefined)
        {
            cartItems = {
                ...cartItems,
                [product.name]:product
            }
        }
    //   if (cartItems[product.name].inCart <= 2 ) {
         cartItems[product.name].inCart += 1;
      //  }
    }else{
        product.inCart = 1;
        cartItems = {
            [product.name] :product
        }
    }

    localStorage.setItem("productInCart",JSON.stringify(cartItems));
 }

function totalCost(product){
   // console.log("The product price is ",product.price);
  //  localStorage.setItem('totalCost', product.price)

    let cartCost = localStorage.getItem('totalCost');
  //  cartCost = parseInt(cartCost)
    console.log("My CartCost is", cartCost)
    console.log(typeof cartCost);

    if(cartCost != null)
    {
         cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost",cartCost + product.price);
    }else{
        localStorage.setItem("totalCost", product.price);
    }
}
function displayCart(){
   let cartItems = localStorage.getItem('productInCart')
   cartItems =JSON.parse(cartItems);
   let productContainer = document.querySelector(".ulss")
   let total = document.querySelector(".send-tt");
     let totalGST = document.querySelector(".gst");
   console.log(cartItems);
let cartCost = localStorage.getItem('totalCost')
 cartCost = parseInt(cartCost);
   if(cartItems && productContainer)
   {
       productContainer.innerHtml = '';
       total.innerHTML = '';
       totalGST.innerHTML= '';
       Object.values(cartItems).map(item => {
         //  close(item)
          console.log(item.name)  
           productContainer.innerHTML += `
          
            <li><div class="product-header" id=${item.id}>
            <div class="product">
            <ion-icon name="close-circle" class="close" onClick="dec(${
              item.price
            },${item.id},${item.inCart})" ></ion-icon>
          
              <img class="crt_img" src="./cart_img/${item.tag}.jpg" alt="">
       <span>${item.name}</span> 
       </div> 
        <div class="price">
              Rs ${item.price}.00
           </div>
           <div class="quantity">
           
             <span id="crtqty">${item.inCart}</span>
              
           </div>
           <div class="total">
             Rs ${item.inCart * item.price}
           <div>
           
          
            <div></li>
           `;
       })

       total.innerHTML += `
       <span id="product_total_amt">
          Rs ${cartCost }.00
       </span>
       `;
       totalGST.innerHTML += `
       <span id="total_cart_amt">
          Rs ${cartCost + 50}.00
       </span>
       `;
   }

}
// function close(item)
// {
//  console.log(item)
// }
// var close = document.getElementsByClassName("close");
// var i;
// for (i = 0; i < close.length; i++) {
//   close[i].onclick = function () {
//     var div = this.parentElement;
//     div.style.display = "none";
//   };
// }
function  dec(event,id,qty)
{
    //close();
  let cart_cost = localStorage.getItem("totalCost");
      cart_cost = parseInt(cart_cost);
   let productNumbers = localStorage.getItem("cartNumbers");
    productNumbers = parseInt(productNumbers);
    let updatecartNum = productNumbers-1;
  let updatecart = cart_cost - event;
//console.log(updatecart);
// console.log(typeof  qty);
// id.style.display = "none";
 let cartItems = localStorage.getItem("productInCart");
  // console.log(Object.values(cartItems));
     var obj = JSON.parse(cartItems);
     console.log(obj)
     delete obj["HARPER_LEE"];
      console.log(obj);
     // cartItems[product.name].inCart += 1;
  
      // console.log(obj["HARPER_LEE"].name);
  //     // Object.values(cartItems).map(event => {
  //     //     console.log(event("2"))
  //     // })
  //     let arr = [cartItems]
  //     console.log(arr[0])
  //  console.log(event);
   localStorage.setItem("totalCost", updatecart);
   localStorage.setItem("cartNumbers", updatecartNum);
//    displayCart();
document.getElementById("product_total_amt").innerHTML = updatecart;
document.getElementById("total_cart_amt").innerHTML = updatecart  +50;
 document.querySelector(".spns_cart").innerHTML = updatecartNum;
//  if (qty == 1){
//   id.style.display = "none";
//  }
  if (qty > 1) {
    let data = qty - 1;
    document.getElementById("crtqty").innerHTML = data;
  } else if (qty == 1) {
    id.style.display = "none";
  }
  
  if (updatecartNum == 0) {
    // localStorage.removeItem(productInCart);
    localStorage.clear();
    // if (qty == 1) {
    //   id.style.display = "none";
    // }
    id.style.display = "none";
    document.getElementsByClassName("ulss").style.display="none";
  }
    // if (qty <= 1) {
    //   id.style.display = "none";
    // }

}


function check(element) {
//   const itsOk = (document.getElementById("check").checked = true);

  if (element.checked) {
    document.getElementById("dis").disabled = false;
  } else {
    document.getElementById("dis").disabled = true;
  }
}

function donecart()
{
  alert("Your order placed")
}
onLoadNumbers()
displayCart()