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
    menuEl.textContent = arr[i];
    const ulEl = document.querySelector(".header-menu");
    const liEl = document.createElement("li");
    ulEl.append(liEl);
    liEl.append(menuEl);
  }
}



//fetch products//
async function fetchProducts() {
  try {
    const response = await fetch("data/shoes.json");
    return await response.json();
  } catch (err) {
    console.error("Error fetching products:", err);
    return [];
  }
}

//declare variables//
let productsArr = await fetchProducts();
let allProducts = productsArr.length;
let loadedProducts = 0;

//create product//
function createProduct(i) {
  //get product
  const product = productsArr[i];
  loadedProducts++;

  //create wrapper for the product
  const el = document.createElement("div");
  el.classList.add("product-wrapper");
  const productGrid = document.querySelector(".main-products");
  productGrid.append(el);

  //create elements for the product//

  //img
  const productImg = document.createElement("img");
  productImg.src = product.imageURL;
  productImg.classList.add("main-img");
  //name
  const productName = document.createElement("h3");
  productName.textContent = product.name;
  //description
  const productDescription = document.createElement("p");
  productDescription.textContent = product.slug;
  //price
  const priceWrapper = document.createElement("div");
  priceWrapper.classList.add("main-price-wrapper");
  const productPrice = document.createElement("span");
  productPrice.textContent = `Price: ${product.price}$`;
  if (product.discount > 0) {
    const discountedPriceProduct = document.createElement("span");
    const discountedPriceProductValue = product.price - (product.discount * product.price / 100);
    discountedPriceProduct.textContent = `NOW ${product.discount}% OFF ${discountedPriceProductValue}$`;
    productPrice.classList.add("main-product-discounted");
    priceWrapper.append(productPrice, discountedPriceProduct);
  }
  
  //rating
  const productRating = document.createElement("span");
  productRating.textContent = `Rating: 6`;
  //cart
  const addToCart = document.createElement("img");
  addToCart.src = `cart.png`;
  addToCart.classList.add("card");
  addToCart.addEventListener("click", addToCart);
  //add elements to the product wrapper
  el.append(
    productImg,
    productName,
    productDescription,
    priceWrapper,
    productRating,
    addToCart
  );
}

// * load products on 1st page load * //
function loadProducts() {
  if (allProducts >= 20) {
    endIndex = 20;
  } else {
    endIndex = allProducts;
  }
  for (let i = 0; i < endIndex; i++) {
    createProduct(i);
  }
}

function addToCart() {
  return alert("added");
}

function loadMoreProducts(e) {
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
    createProduct(i);
  }
}

window.onload = loadProducts();
window.onload = loadCategories(["watches", "shoes", "tops", "bags"]);

const addMoreBtn = document.querySelector(".main-btn");
addMoreBtn.addEventListener("click", loadMoreProducts);
