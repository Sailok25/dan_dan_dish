const buttons = document.querySelectorAll(".btn");
let index = 0;

function updateSelection(newIndex) {
  buttons[index].classList.remove("active");
  index = (newIndex + buttons.length) % buttons.length;
  buttons[index].classList.add("active");
  buttons[index].focus();
}

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowDown") updateSelection(index + 1);
  if (e.key === "ArrowUp") updateSelection(index - 1);

  // ENTER para abrir enlace
  if (e.key === "Enter") {
    const link = buttons[index].getAttribute("href");
    if (link) window.location.href = link;
  }
});
