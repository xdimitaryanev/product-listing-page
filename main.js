import "./styles/normalize.css";
import "./styles/style.css";
import "./styles/components/header.css";
import "./styles/components/main.css";
import "/styles/utils.css";

let startIndex = 0;
let endIndex = 20;



function loadCategories(arr) {
  let chosenCategoriesArr = [];
  for (let i = 0; i < arr.length; i++) {
    chosenCategoriesArr.push(arr[i]);
  }
  for (let i = 0; i < chosenCategoriesArr.length; i++) {
    const menuEl = document.createElement("a");
    menuEl.addEventListener("click", (e)=>{
      resetProductGrid()
      loadProducts(e.target.innerText)
    })
    menuEl.textContent = arr[i];
    const ulEl = document.querySelector(".header-menu");
    const liEl = document.createElement("li");
    ulEl.append(liEl);
    liEl.append(menuEl);
  }
}



//fetch products//
async function fetchProducts(category) {
  try {
    const response = await fetch(`data/${category}.json`);
    return await response.json();
  } catch (err) {
    console.error("Error fetching products:", err);
    return [];
  }
}

//declare variables//
const productGrid = document.querySelector(".main-products");
let loadedProducts = 0;
const mainEl = document.querySelector(".main");
const categoryEl = document.querySelector(".main-category")

//* FUNCTION create product *//
function createProduct(i,arr) {
  
  //get product
  const product = arr[i];
  loadedProducts++;

  //create wrapper for the product
  const el = document.createElement("div");
  el.classList.add("product-wrapper");
  
  productGrid.append(el);

  //create elements for the product//

  const counter = document.querySelectorAll(".main-counter")
  counter[0].textContent = `Showing: ${loadedProducts} of ${arr.length}`
  counter[1].textContent = `Showing: ${loadedProducts} of ${arr.length}`

  //img
  const imgWrapper = document.createElement("div");
  imgWrapper.classList.add("main-img-wrapper")
  const productImg = document.createElement("img");
  imgWrapper.append(productImg);
  productImg.src = product.image_link;
  productImg.classList.add("main-img");
  //name
  const productName = document.createElement("h3");
  productName.classList.add("main-product-name")
  productName.textContent = product.name;

  //description
  const productDescription = document.createElement("p");
  productDescription.classList.add("main-product-description")
  productDescription.textContent = product.description;
  //price
  const priceWrapper = document.createElement("div");
  priceWrapper.classList.add("main-price-wrapper")
  priceWrapper.classList.add("main-price-wrapper");
  const productPrice = document.createElement("span");
  productPrice.textContent = `Price: ${product.price}${product.price_sign} ${product.currency}`;
  priceWrapper.append(productPrice)
  if (product.hasOwnProperty("discount")) {
    const discountedPriceProduct = document.createElement("span");
    const discountedPriceProductValue = product.price - (product.discount * product.price / 100);
    discountedPriceProduct.textContent = `${discountedPriceProductValue}$`;
    productPrice.classList.add("main-product-discounted");
    priceWrapper.append(productPrice, discountedPriceProduct);
  }
  
  //rating
  const productRating = document.createElement("span");
  if (product.rating === null) {
    productRating.textContent = `Rating: 0`;
  } else {
    productRating.textContent = `Rating: ${product.rating}`;
  }

  //cart
  const addToCart = document.createElement("button");
  addToCart.textContent = "add to basket"
  addToCart.classList.add("main-add-to-cart-btn");
  addToCart.addEventListener("click", addToCart);
  imgWrapper.append(addToCart)
  //add elements to the product wrapper
  el.append(
    imgWrapper,
    productRating,
    productName,
    priceWrapper,
    
    productDescription,
   

  );

}
const btnWrapper = document.querySelector(".main-btn-wrapper")
//* load products on 1st page load * //
async function loadProducts(category) {
 const arr = await fetchProducts(category);
 const allProducts = arr.length
 console.log(allProducts)
 categoryEl.textContent = category
  if (allProducts >= 20) {
    endIndex = 20;
  } else {
    endIndex = allProducts;
  }
  for (let i = 0; i < endIndex; i++) {
    createProduct(i,arr);
  }

  const addMoreBtn = document.createElement("button");
  addMoreBtn.classList.add("main-btn");
  addMoreBtn.textContent = "Load More"

  btnWrapper.append(addMoreBtn)
  addMoreBtn.addEventListener("click", (e) => {
    
    if (allProducts - loadedProducts === 0) {
      e.target.style.color = "red";
      return;
    } else if (allProducts - loadedProducts < 20) {
      startIndex = loadedProducts;
      endIndex = allProducts;
    } else if (allProducts - loadedProducts >= 20) {
      endIndex += 20;
      startIndex = loadedProducts;
    }
    for (let i = startIndex; i < endIndex; i++) {
      createProduct(i,arr);
    }
 });  
}



function resetProductGrid() {
  while (productGrid.firstChild) {
    productGrid.removeChild(productGrid.firstChild);
  }
  loadedProducts = 0;
  btnWrapper.removeChild(btnWrapper.lastChild)
}



// function addToCart() {
//   return alert("added");
// }



window.onload = loadProducts("lipstick");
window.onload = loadCategories(["eyeliner", "lipliner", "lipstick", "mascara"]);


