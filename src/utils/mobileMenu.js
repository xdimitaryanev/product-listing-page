
function mobileMenu() {
const mobileMenuList = document.querySelector(".header-mobile-menu-list");
const headerBars = document.querySelector(".header-bars");
const headerX = document.querySelector(".header-x");
let isMobileMenuOpen = false;

headerBars.addEventListener("click", ()=> {
    isMobileMenuOpen = !isMobileMenuOpen;
    if (isMobileMenuOpen) {
        mobileMenuList.style.display = "flex";
        headerBars.style.color = "var(--clr-dark)";
        headerBars.style.display = "none";
        headerX.style.display = "block";
        
    } else {
        mobileMenuList.style.display = "none";
        headerBars.style.color = "var(--clr-light)";
        headerBars.style.display = "block";
        headerX.style.display = "none";
    }
    

})

headerX.addEventListener("click",  ()=> { isMobileMenuOpen = !isMobileMenuOpen;
    if (isMobileMenuOpen) {
        mobileMenuList.style.display = "flex";
        headerBars.style.color = "var(--clr-dark)";
        headerBars.style.display = "none";
        headerX.style.display = "block";
        
    } else {
        mobileMenuList.style.display = "none";
        headerBars.style.color = "var(--clr-light)";
        headerBars.style.display = "block";
        headerX.style.display = "none";
    }})

    
}

export default mobileMenu;