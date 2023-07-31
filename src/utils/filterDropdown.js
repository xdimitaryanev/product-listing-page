import { slideFromLeft } from "./observers";

function filterDropDown () {
    const dropDownContentArr = document.querySelectorAll(".main-brand-list");
    const filterCategory = document.querySelector(".main-filter-category");
    let isDropDownOpen = true;

    filterCategory.addEventListener("click", () => {
        slideFromLeft()
        if (isDropDownOpen) {
            dropDownContentArr.forEach(element => { 
                element.style.display = "none";
            });

        } else {
            dropDownContentArr.forEach(element => { 
                element.style.display = "block";
            });
            
        }
        isDropDownOpen = !isDropDownOpen;
})
}

export default filterDropDown;