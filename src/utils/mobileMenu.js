function mobileMenu() {
  const mobileMenuList = document.querySelector(".header-mobile-menu-list");
  const headerBars = document.querySelector(".header-bars");
  const headerX = document.querySelector(".header-x");
  const mobileMenuLiElArr = document.querySelectorAll(".header-mobile-menu");
  let isMobileMenuOpen = false;

  headerBars.addEventListener("click", () => {
    isMobileMenuOpen = true;
    if (isMobileMenuOpen) {
      mobileMenuList.style.display = "flex";
      headerBars.style.color = "var(--clr-dark)";
      headerBars.style.opacity = 0;
      headerX.style.opacity = 100;
      document.body.style.overflow = "hidden";
    }
  });

  headerX.addEventListener("click", () => {
    isMobileMenuOpen = !isMobileMenuOpen;
    if (!isMobileMenuOpen) {
      mobileMenuList.style.display = "none";
      headerBars.style.color = "var(--clr-light)";
      headerBars.style.opacity = 100;
      headerX.style.opacity = 0;
      document.body.style.overflow = "";
    }
  });

  mobileMenuLiElArr.forEach((mobileLi) => {
    isMobileMenuOpen = false;
    mobileLi.addEventListener("click", () => {
      mobileMenuList.style.display = "none";
      headerBars.style.color = "var(--clr-light)";
      headerBars.style.opacity = 100;
      headerX.style.opacity = 0;
      document.body.style.overflow = "";
    });
  });
}

export default mobileMenu;
