function mostrarAlerta(mensagem) {
  const div = document.createElement("div");
  const p = document.createElement("p")
  const button = document.createElement("button")
  p.textContent = mensagem
  p.setAttribute("id","texto")
  div.appendChild(p)
  button.textContent="Fechar"
  button.setAttribute("id","btnAlerta")
  button.addEventListener("click",()=>{
    fecharAlerta();
  })
  div.appendChild(button)
  div.setAttribute("id", "alerta");
  main.appendChild(div);
}

function fecharAlerta() {
  const div = document.getElementById("alerta");
  if (div) {
    div.remove();
  }
}
