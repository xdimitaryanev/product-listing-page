export function removeFilterList() {
    const filterBtn = document.querySelector(".main-filter-btn");
    filterBtn.remove();
    const brandsArr = document.querySelectorAll(".main-brand-list");
    brandsArr.forEach(element => { 
      element.remove();
    });
  }


  export function removeProductGrid() {
    const btnWrapper = document.querySelector(".main-btn-wrapper");
    const productGrid = document.querySelector(".main-products");
    while (productGrid.firstChild) {
      productGrid.removeChild(productGrid.firstChild);
    }
    btnWrapper.removeChild(btnWrapper.lastChild);
  }

