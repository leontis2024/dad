const main = document.getElementsByTagName("main")[0];
const theme = JSON.parse(localStorage.getItem("theme"));
const botaoSubmit = document.getElementsByTagName("button")[0];
const email = document.getElementById("email");
const erroEmail = document.getElementById("erroEmail");
const container = document.getElementsByTagName("div")[0];
if (theme == null || theme == "") {
  localStorage.setItem("theme", JSON.stringify("light"));
}
if (theme == "dark") {
  main.classList.add("dark");
  main.classList.remove("light");
} else {
  main.classList.remove("dark");
  main.classList.add("light");
}

email.addEventListener("change", () => {
  validarCampos();
});

botaoSubmit.addEventListener("click", () => {
  if (botaoSubmit.disabled == false) {
    iniciarCarregamento();
    setTimeout(()=>{
      finalizarCarregamento()
      mostrarAlerta("Usuário museu criado com sucesso")
    },2500)
  }
});

function validarCampos() {
  const valorEmail = email.value;
  if (valorEmail == null || valorEmail == "") {
    botaoSubmit.disabled = true;
    email.classList.add("erro");
    container.classList.add("erroContainer");
    erroEmail.textContent = "O e-mail é obrigatório";
    erroEmail.classList.add("visivel");
  } else if (verificarEmailValido(valorEmail)) {
    erroEmail.classList.remove("visivel");
    email.classList.remove("erro");
    container.classList.remove("erroContainer");
    botaoSubmit.disabled = false;
  } else {
    email.classList.add("erro");
    container.classList.add("erroContainer");
    erroEmail.textContent = "Digite um e-mail válido";
    erroEmail.classList.add("visivel");
    botaoSubmit.disabled = true;
  }
}

function verificarEmailValido(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}