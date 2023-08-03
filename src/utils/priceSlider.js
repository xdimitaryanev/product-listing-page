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

export function slidersCorelation(minInputEl,maxInputEl,minValueEl,maxValueEl) {

maxInputEl.addEventListener("input", (e) => {

    const currentValue = maxInputEl.value; // Get the current value of slider2
    minInputEl.max = currentValue; // Set the max value of slider1
    minValueEl.textContent = minInputEl.value; 
    maxValueEl.textContent = e.target.value;
  });

minInputEl.addEventListener("input", (e) => {
    const currentValue = minInputEl.value;
    maxInputEl.min = currentValue;
    minValueEl.textContent = e.target.value;
    maxValueEl.textContent = maxInputEl.value

})

}
