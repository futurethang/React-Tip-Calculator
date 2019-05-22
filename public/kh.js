document.addEventListener("DOMContentLoaded", function() {
  const sections = document.querySelectorAll(".section");

  sections.forEach(node => {
    node.addEventListener("mousedown", e => {
      const check = node;
      // debugger;
      const element = e.target.tagName
      if (element === "INPUT") {
        console.log("FART")
        check.style.backgroundColor = "#FFF"
      }
    });
  });
});
