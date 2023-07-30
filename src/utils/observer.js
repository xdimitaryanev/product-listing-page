
function slideFromLeft() {
const hiddenLeftEl = document.querySelectorAll(".hidden");
const observer = new IntersectionObserver((entries)=> {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show")
    } else {
      entry.target.classList.remove("show")
    }
  })
},{
  threshold: 1,
})

hiddenLeftEl.forEach((el)=>observer.observe(el));
}
export default slideFromLeft;