function priceSlider (value,input) {

    value.textContent = input.value;
    input.addEventListener("input", (e) => {
        value.textContent = event.target.value;
    })
}

export default priceSlider;