function scrollIntoView () {
    const view = document.getElementById("products");
    view.scrollIntoView({ behavior: "smooth",inline: "end" });
  }

  export default scrollIntoView;