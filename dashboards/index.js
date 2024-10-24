const main = document.getElementsByTagName("main")[0]
const theme = JSON.parse(localStorage.getItem("theme"));
if (theme == null || theme == "") {
  localStorage.setItem("theme", JSON.stringify("light"));
}
if (theme == "dark") {
  main.classList.add("dark");
  main.classList.remove("light");

}else{
  main.classList.remove("dark");
  main.classList.add("light");
}

const opcao = document.getElementById("dash")
const dashboard = document.getElementById("dashboard")
opcao.addEventListener("change",()=>{
  if(opcao.value ==1){
    dashboard.setAttribute("src","https://app.powerbi.com/view?r=eyJrIjoiMzZmNDg5YWUtZmExNS00ZWUzLWE5NjAtYTk4OTY5NjhhZmI0IiwidCI6ImIxNDhmMTRjLTIzOTctNDAyYy1hYjZhLTFiNDcxMTE3N2FjMCJ9")
  }else{
    dashboard.setAttribute("src","https://app.powerbi.com/view?r=eyJrIjoiOGUzMTZmNmEtYjExNi00ZmQ5LWJkMzQtZjkyNTA4OTQxNmVkIiwidCI6ImIxNDhmMTRjLTIzOTctNDAyYy1hYjZhLTFiNDcxMTE3N2FjMCJ9")
  }
})

firebase.auth().onAuthStateChanged(function(user){
    if(!user){
      window.location.href = "../index.html";
    }
  })
const logout = document.getElementById("logout");
logout.addEventListener("click", () => {
  logoutFirebase();
});

function logoutFirebase() {
  firebase
    .auth()
    .signOut()
    .then(() => {
      window.location.href = "../index.html";
    })
    .catch((error) => {
      alert("Erro ao fazer logout");
    });
}
