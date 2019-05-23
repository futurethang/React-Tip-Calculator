document.addEventListener("DOMContentLoaded", function() {
  // select for the input fields to add interaction effect
  const inputs = document.querySelectorAll("input");
  // add event listener to activate and deactivate each individual input
  inputs.forEach(input => {
    // set action for when the area is focused upon
    input.addEventListener("focus", e => {
      input.closest(".section").classList.toggle("focus");
    });
    // reset when the area is focused away from
    input.addEventListener("blur", e => {
      input.closest(".section").classList.toggle("focus");
    });
  });
});
