document.addEventListener("DOMContentLoaded", function() {
  const sections = document.querySelectorAll(".section");
  const inputs = document.querySelectorAll("input");

  inputs.forEach(input => {
    // set action for when the area is focused upon
    input.addEventListener("focus", e => {
      Object.assign(input.closest(".section").style, {
        backgroundColor: "#fff",
        width: "120%",
        height: "100%",
        borderLeft: "40px solid white",
        padding: "10px 0px",
        position: "relative",
        left: "-40px"
      });
      // input.parentElement.style.backgroundColor = "orange";
    });
    // reset when the area is focused away from
    input.addEventListener("blur", e => {
      // input.closest(".section").style.backgroundColor = "#EEEEEE";
      Object.assign(input.closest(".section").style, {
        backgroundColor: "#eee",
        width: "auto",
        height: "100%",
        borderLeft: "none",
        padding: "0px",
        position: "relative",
        left: "0px"
      });
    });
  });
});
