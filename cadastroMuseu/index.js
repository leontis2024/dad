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
    setTimeout(() => {
      finalizarCarregamento();
      fazerRequisicao(email.value);
    }, 2500);
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

function fazerRequisicao(email) {
  fetch(
    "http://ec2-52-44-41-122.compute-1.amazonaws.com:8080/api/museuAdm/inserir",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        museuAdm: {
          id: 0,
          emailAdm: email,
          senhaAdm: "Mus@Senha",
        },
      }),
    }
  )
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Erro ao criar usuário");
      }
    })
    .then((data) => {
      console.log("Usuário criado:", data);
      mostrarAlerta("Usuário museu criado com sucesso");
    })
    .catch((error) => {
      console.error("Erro:", error);
      mostrarAlerta("Erro ao criar usuário");
    });
}
