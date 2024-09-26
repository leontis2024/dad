firebase.auth().onAuthStateChanged(function(user){
  if(user){
    window.location.href = "./dashboards/index.html";
  }
})

const theme = JSON.parse(localStorage.getItem("theme"));
if (theme == null || theme == "") {
  localStorage.setItem("theme", JSON.stringify("light"));
}

const background = document.getElementsByClassName("background")[0];
const main = document.getElementsByTagName("main")[0];
const buttonTheme = document.getElementById("button_theme");
buttonTheme.addEventListener("click", () => {
  if (theme == "light") {
    localStorage.setItem("theme", JSON.stringify("dark"));
  } else {
    localStorage.setItem("theme", JSON.stringify("light"));
  }
  window.location.reload();
});
if (theme == "dark") {
  main.classList.add("dark");
  main.classList.remove("light");
  buttonTheme.setAttribute("src", "./assets/sun_light.png");
  background.classList.add("background_dark");
  background.classList.remove("background_light");
}
const container = document.getElementsByTagName("div")[1];

const botaoSubmit = document.getElementById("acessar");
const senha = document.getElementById("password");
const email = document.getElementById("email");
const erroEmail = document.getElementById("erroEmail");
const erroSenha = document.getElementById("erroSenha");
email.addEventListener("change", () => {
  validarCampos();
});
senha.addEventListener("keydown", (e) => {
  if (e.target == senha) {
    validarCampos();
  }
});
botaoSubmit.addEventListener("click", () => {
  if (botaoSubmit.disabled == false) {
    iniciarCarregamento();
    login();
  }
});

function validarCampos() {
  const valorEmail = email.value;
  const valorSenha = senha.value;
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
    if (valorSenha == null || valorSenha == "") {
      botaoSubmit.disabled = true;
      senha.classList.add("erro");
      container.classList.add("erroContainer");
      erroSenha.textContent = "A senha é obrigatória";
      erroSenha.classList.add("visivel");
    } else {
      container.classList.remove("erroContainer");
      senha.classList.remove("erro");
      erroSenha.classList.remove("visivel");
      botaoSubmit.disabled = false;
    }
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

function login() {
  firebase
    .auth()
    .signInWithEmailAndPassword(email.value, senha.value)
    .then((response) => {
      console.log("sucess", response);
      setTimeout(()=>{
        finalizarCarregamento()
      },3000)
      window.location.href = "./dashboards/index.html";
    })
    .catch((error) => {
      finalizarCarregamento()
      alert(mostrarErro(error));
      console.log("error", error);
    });
}

function mostrarErro(error) {
  if (error.code == "auth/user-not-found") {
    return "Usuário não encontrado";
  } else if (error.code == "auth/invalid-credential") {
    return "Credenciais inválidas";
  } else {
    return error.message;
  }
}
