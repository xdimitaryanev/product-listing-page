function priceSlider (value,input) {

    value.textContent = input.value;
    input.addEventListener("input", (e) => {
        value.textContent = e.target.value;
        return(e.target.value)
    })
    
}

export default priceSlider;