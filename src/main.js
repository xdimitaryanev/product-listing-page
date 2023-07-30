import "../styles/normalize.css";
import "../styles/style.css";
import "../styles/components/header.css";
import "../styles/components/main.css";
import "../styles/utils.css";
import mobileMenu from './utils/mobileMenu';
import { fetchCategoryDescriptions,fetchProducts } from "./utils/fetchingData";
import slideFromLeft from "./utils/observer";



mobileMenu()
// DECLARE VARIABLES //
let startIndex = 0;
let endIndex = 20;
let loadedProducts = 0;

// DECLARE ELEMENTS //
const productGrid = document.querySelector(".main-products");
const mainEl = document.querySelector(".main");
const categoryEl = document.querySelector(".main-category");
const categoryDescriptionEl = document.querySelector(".main-category-description");
const filterList = document.querySelector(".main-filter-list");
const filterWrapper = document.querySelector(".main-filter-wrapper");

//* FUNCTION ADD LOAD MORE BTN TO UI *//
function createLoadMoreBtn(allProductsCount, arrOfAllProducts) {
  const loadMoreBtn = document.createElement("button");
  loadMoreBtn.classList.add("main-btn");
  loadMoreBtn.textContent = "Load More";
  btnWrapper.append(loadMoreBtn);
  loadMoreBtn.addEventListener("click", (e) => {
    if (allProductsCount - loadedProducts === 0) {
      e.target.style.color = "red";
      return;
    } else if (allProductsCount - loadedProducts < 20) {
      startIndex = loadedProducts;
      endIndex = allProductsCount;
    } else if (allProductsCount - loadedProducts >= 20) {
      endIndex += 20;
      startIndex = loadedProducts;
    }
    for (let i = startIndex; i < endIndex; i++) {
      createProduct(i, arrOfAllProducts);
    }
  });
}


//* FUNCTION CREATE FILTER *//
async function createFilterList(category) {
  const arr = await fetchProducts(category);
  const arrBrands = [];
  arr.forEach((element) => {
    if (arrBrands.includes(element.brand)) {
      return;
    } else {
      arrBrands.push(element.brand);
    }
  });
  arrBrands.forEach((element) => {
    const brand = document.createElement("li");
    brand.textContent = `${element}`;
    filterWrapper.append(brand);
    brand.classList.add("main-brand-list")
  });
  const obj = arr[0];
  const propertyNames = Object.keys(obj);
  const li = document.createElement("li");
  li.textContent = `${propertyNames[1]}s`;
  li.classList.add("main-brand-list")
  filterWrapper.append(li);
  filterWrapper.addEventListener("click", (event) => {
    const brandel = arrBrands.find(
      (element) => element === event.target.innerText
    );
    if (brandel) {
      const filteredArr = arr.filter((obj) => obj.brand === brandel);
      const allFilteredProducts = filteredArr.length;
      loadedProducts = 0;
      removeProductGrid();
      createLoadMoreBtn(allFilteredProducts, filteredArr);
      if (allFilteredProducts >= 20) {
        endIndex = 20;
      } else {
        endIndex = allFilteredProducts;
      }
      for (let i = 0; i < endIndex; i++) {
        createProduct(i, filteredArr);
      }
    } else {
      return;
    }
  });
}

const descriptionsArr = await fetchCategoryDescriptions();
//* FUNCTION add Short Description for Selected Category *//
function createCategoryDescriptions(category) {
  const description = descriptionsArr[0][category];
  categoryDescriptionEl.textContent = description;
}
const mobileMenuList = document.querySelector(".header-mobile-menu-list");
//* FUNCTION add Navigation MENU *//
function createCategories(arr) {
  let chosenCategoriesArr = [];
  for (let i = 0; i < arr.length; i++) {
    chosenCategoriesArr.push(arr[i]);
  }
  for (let i = 0; i < chosenCategoriesArr.length; i++) {
    const ulEl = document.querySelector(".header-menu");
    const liEl = document.createElement("li");
    liEl.addEventListener("click", (e) => {
      removeFilterList()
      removeProductGrid();
      createCategoryDescriptions(e.target.innerText);
      loadProducts(e.target.innerText);
      createFilterList(e.target.innerText);
    });
    liEl.textContent = arr[i];
    ulEl.append(liEl);
    const mobileLi = document.createElement("li");
    mobileLi.textContent = arr[i];
    mobileLi.classList.add("hidden");
    mobileLi.addEventListener("click", (e) => {
      removeFilterList()
      removeProductGrid();
      createCategoryDescriptions(e.target.innerText);
      loadProducts(e.target.innerText);
      createFilterList(e.target.innerText);
    })
    mobileMenuList.append(mobileLi);


  }
}


//* FUNCTION create product *//
function createProduct(i, arr) {
  //get product
  const product = arr[i];
  loadedProducts++;

  //create wrapper for the product
  const el = document.createElement("div");
  el.classList.add("product-wrapper");
  productGrid.append(el);

  //create elements for the product//
  const counter = document.querySelectorAll(".main-counter");
  counter[0].textContent = `Showing: ${loadedProducts} of ${arr.length}`;
  counter[1].textContent = `Showing: ${loadedProducts} of ${arr.length}`;

  //img
  const imgWrapper = document.createElement("div");
  imgWrapper.classList.add("main-img-wrapper");
  const productImg = document.createElement("img");
  imgWrapper.append(productImg);
  productImg.src = product.image_link;
  productImg.classList.add("main-img");
  //name
  const productName = document.createElement("h3");
  productName.classList.add("main-product-name");
  productName.textContent = product.name;

  //description
  const productDescription = document.createElement("p");
  productDescription.classList.add("main-product-description");
  productDescription.textContent = product.description;
  //price
  const priceWrapper = document.createElement("div");
  priceWrapper.classList.add("main-price-wrapper");
  priceWrapper.classList.add("main-price-wrapper");
  const productPrice = document.createElement("span");
  productPrice.textContent = `Price: ${product.price}${product.price_sign} ${product.currency}`;
  priceWrapper.append(productPrice);
  if (product.hasOwnProperty("discount")) {
    const discountedPriceProduct = document.createElement("span");
    const discountedPriceProductValue =
      product.price - (product.discount * product.price) / 100;
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
  addToCart.textContent = "add to basket";
  addToCart.classList.add("main-add-to-cart-btn");
  addToCart.addEventListener("click", addToCart);
  imgWrapper.append(addToCart);
  //add elements to the product wrapper
  el.append(
    imgWrapper,
    productRating,
    productName,
    priceWrapper,
    productDescription
  );
}

const btnWrapper = document.querySelector(".main-btn-wrapper");
//* load products on page load * //
async function loadProducts(category) {
  const arrOfAllProducts = await fetchProducts(category);
  const allProductsCount = arrOfAllProducts.length;
  categoryEl.textContent = category;
  if (allProductsCount >= 20) {
    endIndex = 20;
  } else {
    endIndex = allProductsCount;
  }
  for (let i = 0; i < endIndex; i++) {
    createProduct(i, arrOfAllProducts);
  }
  createLoadMoreBtn(allProductsCount, arrOfAllProducts);
}

function removeProductGrid() {
  while (productGrid.firstChild) {
    productGrid.removeChild(productGrid.firstChild);
  }
  loadedProducts = 0;
  btnWrapper.removeChild(btnWrapper.lastChild);
}

function removeFilterList() {
  const arr = document.querySelectorAll(".main-brand-list")
  arr.forEach(element => { 
    element.remove()
  });
}


window.onload = loadProducts("lipstick");
window.onload = createCategoryDescriptions("LIPSTICK");
window.onabort = createFilterList("lipstick");
window.onload = createCategories(["eyeliner", "lipliner", "lipstick", "mascara"]);
window.onload = slideFromLeft()
