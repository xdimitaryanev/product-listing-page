import "../styles/normalize.css";
import "../styles/style.css";
import "../styles/components/header.css";
import "../styles/components/main.css";
import "../styles/components/footer.css";
import "../styles/utils.css";
import "../styles/components/slider.css"

import mobileMenu from "./utils/mobileMenu";
import { fetchProducts } from "./utils/fetchingData";
import { slideFromLeft, slideFromLeftContinuously } from "./utils/observers";
import filterDropDown from "./utils/filterDropdown";
import { removeFilterList, removeProductGrid } from "./dom/removeFilterList";
import createCategoryDescriptions from "./dom/categoryDescription";
import scrollIntoView from "./utils/scrollIntoView";
import { priceSlider,minProductPrice,maxProductPrice } from "./utils/priceSlider";



// DECLARE VARIABLES //
let startIndex = 0;
let endIndex = 20;
let loadedProducts = 0;

// DECLARE ELEMENTS //
const btnWrapper = document.querySelector(".main-btn-wrapper");
const productGrid = document.querySelector(".main-products");
const categoryEl = document.querySelector(".main-category");
const filterList = document.querySelector(".main-filter-list");
const filterEL = document.querySelector(".main-filter");
const minPriceValueEl = document.querySelector(".min-price-value");
const minPriceInputEl = document.querySelector(".min-price-input");
const maxPriceValueEl = document.querySelector(".max-price-value");
const maxPriceInputEl = document.querySelector(".max-price-input");



//< * FUNCTION CREATE Navigation MENU * >//
function createNavMenu(arr) {
  const mobileMenuList = document.querySelector(".header-mobile-menu-list");
  let chosenCategoriesArr = [];
  for (let i = 0; i < arr.length; i++) {
    chosenCategoriesArr.push(arr[i]);
  }
  for (let i = 0; i < chosenCategoriesArr.length; i++) {
    const ulEl = document.querySelector(".header-menu");
    const liEl = document.createElement("li");
    liEl.addEventListener("click", (e) => {
      scrollIntoView();
      removeFilterList();
      removeProductGrid();
      loadedProducts = 0;
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
      removeFilterList();
      removeProductGrid();
      loadedProducts = 0;
      createCategoryDescriptions(e.target.innerText);
      loadProducts(e.target.innerText);
      createFilterList(e.target.innerText);
    });
    mobileMenuList.append(mobileLi);
  }
}

// * < load products on page load > * //
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

// * < FUNCTION create product > * //
function createProduct(i, arr) {
  //get product
  const product = arr[i];
  loadedProducts++;

  //create wrapper for the product
  const el = document.createElement("div");
  el.classList.add("hidden")
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
  const productsArr = await fetchProducts(category);

  let minPrice = minProductPrice(productsArr);
  let maxPrice = maxProductPrice(productsArr);
  console.log(maxPrice)

  
  minPriceInputEl.value = minPrice;
  minPriceValueEl.textContent = minPrice;
  minPriceInputEl.setAttribute("min", minPrice);
  minPriceInputEl.setAttribute("max", maxPrice);


  maxPriceInputEl.value = maxPrice;
  maxPriceValueEl.textContent = maxPrice;
  maxPriceInputEl.setAttribute("min",minPrice);
  maxPriceInputEl.setAttribute("max", maxPrice);
 

  const brandsArr = []; // declaring empty array
  productsArr.forEach((element) => {
    if (brandsArr.includes(element.brand)) {
      return;
    } else {
      brandsArr.push(element.brand); // pushing only unique brand to the empty array
    }
  });

  brandsArr.forEach((brand) => {
    // * < CREATE LABEL AND INPUT ELEMENTS FOR EVERY BRAND > * //
    const brandLabel = document.createElement("label");
    const brandCheckbox = document.createElement("input");
    brandCheckbox.type = "checkbox";
    brandCheckbox.name = "filter-brand";
    brandCheckbox.value = brand;
    brandLabel.textContent = `${brand}`;
    brandLabel.append(brandCheckbox);
    filterList.append(brandLabel);
    brandLabel.classList.add("main-brand-list");
    brandLabel.classList.add("hidden");
  });





  // * < CREATE BUTTON TO SUBMIT FILTERING DATA > * //
  const filterBtn = document.createElement("button");
  filterBtn.classList.add("main-filter-btn");
  filterBtn.textContent = "Filter";
  filterEL.append(filterBtn);


  // * < FILTER BUTTON HANDLER > * //
  filterBtn.addEventListener("click", () => {
    
    const brandCheckboxes = document.querySelectorAll(
      'input[name="filter-brand"]'
    );
    const brandCheckboxesArr = Array.from(brandCheckboxes);

    const filteredBrandsArr = brandCheckboxesArr. // return array of the choosen brands ["nyx,"dior"...]
    filter((element) => element.checked).
    map((checkbox) => checkbox.value);
    let allFilteredProductsArr = [];
    let filteredByBrandArr = [];
    filteredBrandsArr.forEach((brand) => {        
      const brandArr = productsArr.filter((obj) => obj.brand === brand);
      filteredByBrandArr = filteredByBrandArr.concat(brandArr); // return array of objects(products) filtered by brand
    });
    console.log(productsArr)
    console.log(minPriceValueEl.value)
    console.log(maxPriceValueEl.value)
    console.log(filteredBrandsArr)
    console.log(filteredByBrandArr)
    if (filteredBrandsArr.length > 0) {
      const productsByBrandAndPrice = filteredByBrandArr.filter((obj) => Number(obj.price) < maxPriceValueEl.value && Number(obj.price) > minPriceValueEl.value)
      allFilteredProductsArr = allFilteredProductsArr.concat(productsByBrandAndPrice);
      console.log(">")
      console.log(productsByBrandAndPrice)
    }
    

   else if (filteredBrandsArr.length === 0){
      const productsByPrice = productsArr.filter((obj) => Number(obj.price) < maxPriceValueEl.value && Number(obj.price) > minPriceValueEl.value)
      allFilteredProductsArr = allFilteredProductsArr.concat(productsByPrice);
      console.log("===")
    
    }   

    const allFilteredProductsCount = allFilteredProductsArr.length;
    loadedProducts = 0;
    removeProductGrid();
    createLoadMoreBtn(allFilteredProductsCount, allFilteredProductsArr);
    if (allFilteredProductsCount >= 20) {
      endIndex = 20;
    } else {
      endIndex = allFilteredProductsCount;
    }
    for (let i = 0; i < endIndex; i++) {
      createProduct(i, allFilteredProductsArr);
    }
    allFilteredProductsArr = [];
  });

  const singleProductObj = productsArr[0];
  const productProperties = Object.keys(singleProductObj);
  const filterCategory = document.querySelector(".main-filter-category");
  filterCategory.textContent = `Choose from your favourite ${productProperties[1]}s`;
  filterDropDown();
  slideFromLeft();

}

window.onload = function() {
  loadProducts("LIPSTICK");
  createCategoryDescriptions("LIPSTICK");
  createFilterList("LIPSTICK");
  createNavMenu(["EYELINER", "LIPLINER", "LIPSTICK", "MASCARA"]);
  slideFromLeftContinuously();
  mobileMenu();
  priceSlider(minPriceValueEl, minPriceInputEl);
  priceSlider(maxPriceValueEl, maxPriceInputEl);
}

