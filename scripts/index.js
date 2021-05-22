//import { loadData } from './loadData';

window.addEventListener("load", function () {
  let el = document.getElementById("retrieve-btn");
  el.addEventListener("click", function (e){
    sendUsername(e);
  } , false);
});

const sendUsername = (e) => {
  e.preventDefault();
  let username = document.usernameForm.username.value;
  if (username) {
    console.log(username);
  }
}