function scrollIntoView () {
    const view = document.querySelector(".main-products");
    view.scrollIntoView({ behavior: "smooth",inline: "end" });
  }

  export default scrollIntoView;