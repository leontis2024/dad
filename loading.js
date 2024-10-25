function iniciarCarregamento() {
  const div = document.createElement("div");
  div.setAttribute("id", "loading");
  main.appendChild(div);
}

function finalizarCarregamento() {
  const div = document.getElementById("loading");
  if (div) {
    div.remove()
  }
}
