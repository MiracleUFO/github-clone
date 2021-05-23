import { loadData } from './loadData.js';


window.addEventListener("load", function () {
  let el = document.getElementById("retrieve-btn");

  el.addEventListener("click", function (e){
    sendUsername(e);
  }, false);
});


const sendUsername = (e) => {
  e.preventDefault();
  let username = document.usernameForm.username.value;

  if (username) {
   loadData(username);
  }
}
