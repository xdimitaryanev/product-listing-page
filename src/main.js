import "../styles/normalize.css";
import "../styles/style.css";
import "../styles/components/header.css";
import "../styles/components/main.css";
import "../styles/components/footer.css";
import "../styles/utils.css";

import mobileMenu from "./utils/mobileMenu";
import { fetchProducts } from "./utils/fetchingData";
import { slideFromLeft, slideFromLeftContinuously } from "./utils/observers";
import filterDropDown from "./utils/filterDropdown";
import { removeFilterList, removeProductGrid } from "./dom/resetElements";
import createCategoryDescriptions from "./dom/loadDescription";
import scrollIntoView from "./utils/scrollIntoView";
import {
  minProductPrice,
  maxProductPrice,
  slidersCorelation,
} from "./utils/priceSlider";
import { sortProducts } from "./utils/sortProducts";
import shortenDescription from "./utils/shortenDescriptions";

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
const dropDownEl = document.querySelector(".main-sort-dropdown");
const counter = document.querySelectorAll(".main-counter");
const mobileMenuList = document.querySelector(".header-mobile-menu-list");
const ulEl = document.querySelector(".header-menu");


//< * FUNCTION CREATE Desktop Navigation MENU * >//
function createDesktopNavMenu(arr) {   //takes arr of strings ["EYELINER", "LIPLINER", "LIPSTICK", "MASCARA"]
  for (let i = 0; i < arr.length; i++) {
    const liEl = document.createElement("li");
    liEl.addEventListener("click", (e) => {
      areProductsFiltered = false;
      scrollIntoView();
      removeFilterList();
      removeProductGrid();
      loadedProducts = 0;
      createCategoryDescriptions(e.target.innerText);
      loadProductsByCategory(e.target.innerText);
      createFilterListForCategory(e.target.innerText);
    });
    liEl.textContent = arr[i];
    ulEl.append(liEl);
}}

//< * FUNCTION CREATE Mobile Navigation MENU * >//
function createMobileNavMenu(arr) {
  for (let i = 0; i < arr.length; i++) {
  const mobileLi = document.createElement("li");
  mobileLi.textContent = arr[i];
  mobileLi.classList.add("hidden","header-mobile-menu");
  mobileLi.addEventListener("click", (e) => {
    areProductsFiltered = false;
    scrollIntoView();
    removeFilterList();
    removeProductGrid();
    loadedProducts = 0;
    createCategoryDescriptions(e.target.innerText);
    loadProductsByCategory(e.target.innerText);
    createFilterListForCategory(e.target.innerText);
  });
  mobileMenuList.append(mobileLi);
}
}


// * < load products on page load > * //
async function loadProductsByCategory(category) {
 
  let allProductsArr = await fetchProducts(category);
  const allProductsCount = allProductsArr.length;

  const [criteria, order] = dropDownEl.value.split("-");
  allProductsArr = sortProducts(allProductsArr, criteria, order);
  console.log(criteria, order, allProductsArr);
  categoryEl.textContent = category;
  if (allProductsCount >= 20) {
    endIndex = 20;
  } else {
    endIndex = allProductsCount;
  }
  for (let i = 0; i < endIndex; i++) {
    loadedProducts++;
    createProductElement(i, allProductsArr);
  }
  createLoadMoreBtn(allProductsArr);
  return allProductsArr;
}

// * < FUNCTION create product > * //
function createProductElement(i, arr) {
  //get products
  const product = arr[i];

  //create wrapper for the product
  const el = document.createElement("div");
  el.classList.add("product-wrapper");
  el.classList.add("blur");
  productGrid.append(el);
  //create elements for the product//

  counter[0].textContent = `Showing: ${loadedProducts} of ${arr.length}`;
  counter[1].textContent = `Showing: ${loadedProducts} of ${arr.length}`;

  //img
  // const imgWrapper = document.createElement("div");
  // imgWrapper.classList.add("main-img-wrapper");
  const productImg = document.createElement("img");
  el.append(productImg);
  productImg.src = product.image_link;
  productImg.classList.add("main-img");
  //name
  const productName = document.createElement("h3");
  productName.classList.add("main-product-name");
  productName.textContent = product.name;

  //description
  const productDescription = document.createElement("p");
  productDescription.classList.add("main-product-description");
  productDescription.textContent = shortenDescription(product.description, 120);

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

    discountedPriceProduct.textContent = `${discountedPriceProductValue}${product.price_sign} ${product.currency}`;
    productPrice.classList.add("main-product-discounted");
    priceWrapper.append(productPrice, discountedPriceProduct);
  }

  //rating
  const productRating = document.createElement("span");
  const ratingStarEl = document.createElement("img");
  ratingStarEl.classList.add("rating-star-img")
  ratingStarEl.src = "star.png"
  
  if (product.rating === null) {
    productRating.textContent = `Rating: 0`;
  } else {
    productRating.textContent = `Rating: ${product.rating}`;
  }

  //cart
  const addToCart = document.createElement("button");
  addToCart.textContent = "add to basket";
  addToCart.classList.add("main-add-to-cart-btn");
  addToCart.addEventListener("click", ()=>{
    alert("Successfully added to your basket!");
  });
  el.append(addToCart);
  //add elements to the product wrapper
  el.append(
    productRating,
    productName,
    priceWrapper,
    productDescription
  );

  productRating.appendChild(ratingStarEl);
 
}

//* FUNCTION ADD LOAD MORE BTN TO UI *//
function createLoadMoreBtn(arrOfAllProducts) {
  const allProductsCount = arrOfAllProducts.length;
  const loadMoreBtn = document.createElement("button");
  loadMoreBtn.classList.add("main-btn");
  loadMoreBtn.textContent = "Load More";
  btnWrapper.append(loadMoreBtn);

  function updateLoadMoreBtn() {
    if (allProductsCount === loadedProducts) {
      loadMoreBtn.disabled = true;
      loadMoreBtn.textContent = "All products loaded";
    }
  }

  loadMoreBtn.addEventListener("click", () => {
    if (allProductsCount - loadedProducts === 0) {
      updateLoadMoreBtn(); 
      return;
    } else if (allProductsCount - loadedProducts < 20) {
      startIndex = loadedProducts;
      endIndex = allProductsCount;
    } else if (allProductsCount - loadedProducts >= 20) {
      endIndex += 20;
      startIndex = loadedProducts;
    }
    for (let i = startIndex; i < endIndex; i++) {
      loadedProducts++;
      createProductElement(i, arrOfAllProducts);

     
    }
    updateLoadMoreBtn(); 
  });
  updateLoadMoreBtn();
}

let areProductsFiltered = false;

//* FUNCTION CREATE FILTER *//
async function createFilterListForCategory(category) {
  let productsArr = await fetchProducts(category);
  console.log(productsArr);
  let minPrice = minProductPrice(productsArr);
  let maxPrice = maxProductPrice(productsArr);

  minPriceInputEl.value = minPrice;
  minPriceValueEl.textContent = minPrice;
  minPriceInputEl.setAttribute("min", minPrice);
  minPriceInputEl.setAttribute("max", maxPrice);

  maxPriceInputEl.value = maxPrice;
  maxPriceValueEl.textContent = maxPrice;
  maxPriceInputEl.setAttribute("min", minPrice);
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
  filterBtn.classList.add("main-filter-btn", "button");
  filterBtn.textContent = "Filter";
  filterEL.append(filterBtn);

  let allFilteredProductsArr = [];
  let cloneFilteredProductsArr = [];
  // * < FILTER BUTTON HANDLER > * //
  filterBtn.addEventListener("click", () => {
    scrollIntoView();
    areProductsFiltered = true;

    const brandCheckboxes = document.querySelectorAll(
      'input[name="filter-brand"]'
    );
    const brandCheckboxesArr = Array.from(brandCheckboxes);

    const filteredBrandsArr = brandCheckboxesArr // return array of the choosen brands ["nyx,"dior"...]
      .filter((element) => element.checked)
      .map((checkbox) => checkbox.value);

    let filteredByBrandArr = [];
    filteredBrandsArr.forEach((brand) => {
      const brandArr = productsArr.filter((obj) => obj.brand === brand);
      filteredByBrandArr = filteredByBrandArr.concat(brandArr); // return array of objects(products) filtered by brand
    });

    if (filteredBrandsArr) {
    } else {
    }

    if (filteredBrandsArr.length > 0) {
      const productsByBrandAndPrice = filteredByBrandArr.filter(
        (obj) =>
          Number(obj.price) <= maxPriceValueEl.value &&
          Number(obj.price) >= minPriceValueEl.value
      );
      allFilteredProductsArr = allFilteredProductsArr.concat(
        productsByBrandAndPrice
      );
    } else if (filteredBrandsArr.length === 0) {
      const productsByPrice = productsArr.filter(
        (obj) =>
          Number(obj.price) <= maxPriceValueEl.value &&
          Number(obj.price) >= minPriceValueEl.value
      );
      allFilteredProductsArr = allFilteredProductsArr.concat(productsByPrice);

      console.log("===");
    }

    const [criteria, order] = dropDownEl.value.split("-");
    allFilteredProductsArr = sortProducts(
      allFilteredProductsArr,
      criteria,
      order
    );
    const allFilteredProductsCount = allFilteredProductsArr.length;
    if (allFilteredProductsCount === 0) {
      loadedProducts = 0;
      counter[0].textContent = `Showing: ${loadedProducts} of ${allFilteredProductsCount}`;
      counter[1].textContent = `Showing: ${loadedProducts} of ${allFilteredProductsCount}`;
      removeProductGrid();
      return;
    }
    loadedProducts = 0;
    removeProductGrid();
    createLoadMoreBtn(allFilteredProductsArr);
    if (allFilteredProductsCount >= 20) {
      endIndex = 20;
    } else {
      endIndex = allFilteredProductsCount;
    }
    for (let i = 0; i < endIndex; i++) {
      loadedProducts++;
      createProductElement(i, allFilteredProductsArr);
    }
    cloneFilteredProductsArr = [...allFilteredProductsArr];
    allFilteredProductsArr = [];
  });

  dropDownEl.addEventListener("change", (e) => {
    e.preventDefault();
    let sortedProductsArr = [];
    loadedProducts = 0;
    const [criteria, order] = dropDownEl.value.split("-");
    if (areProductsFiltered) {
      sortedProductsArr = sortProducts(
        cloneFilteredProductsArr,
        criteria,
        order
      );
    } else {
      sortedProductsArr = sortProducts(productsArr, criteria, order);
    }

    removeProductGrid();

    if (sortedProductsArr.length >= 20) {
      endIndex = 20;
    } else {
      endIndex = sortedProductsArr.length;
    }
    for (let i = 0; i < endIndex; i++) {
      loadedProducts++;
      createProductElement(i, sortedProductsArr);
    }
    createLoadMoreBtn(sortedProductsArr);
  });

  const singleProductObj = productsArr[0];
  const productProperties = Object.keys(singleProductObj);
  const filterCategory = document.querySelector(".main-filter-category");
  filterCategory.textContent = `Choose your ${productProperties[1]}s`;
  filterDropDown();
  slideFromLeft();
}

window.onload = function () {
  loadProductsByCategory("LIPSTICK");
  createCategoryDescriptions("LIPSTICK");
  createFilterListForCategory("LIPSTICK");
  createDesktopNavMenu(["EYELINER", "LIPLINER", "LIPSTICK", "MASCARA"]);
  createMobileNavMenu(["EYELINER", "LIPLINER", "LIPSTICK", "MASCARA"]);
  slideFromLeftContinuously();
  mobileMenu();
  slidersCorelation(
    minPriceInputEl,
    maxPriceInputEl,
    minPriceValueEl,
    maxPriceValueEl
  );
};
