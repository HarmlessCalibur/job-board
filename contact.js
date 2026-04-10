const form = document.querySelector(".ds-form");
const response = document.getElementById("ds-response");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  response.classList.remove("hidden");

  form.reset();
});