export function priceSlider (value,input) {
    value.textContent = input.value;
    input.addEventListener("input", (e) => {
        value.textContent = e.target.value; 
    })
    
}

export function minProductPrice(productsArr) {
    let minPrice = Number(productsArr[0].price);
    for (let i = 1; i < productsArr.length; i++) {
    const currentPrice = Number(productsArr[i].price);
    if (currentPrice < minPrice) {
    minPrice = currentPrice;
  }
}
return minPrice;
}

export function maxProductPrice(productsArr) {
    let maxPrice = Number(productsArr[0].price);
    for (let i = 1; i < productsArr.length; i++) {
    const currentPrice = Number(productsArr[i].price);
    if (currentPrice > maxPrice) {
        maxPrice = currentPrice;
  }
}
return maxPrice;
}

export function slidersCorelation(min,max) {
max.addEventListener("input", () => {

    const maxValueSlider = max.value; // Get the current value of slider2
    min.max = maxValueSlider; // Set the max value of slider1
  });

}
