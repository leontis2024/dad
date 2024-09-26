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
