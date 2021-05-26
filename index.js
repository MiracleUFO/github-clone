import { loadData } from './scripts/loadData.js';


window.addEventListener("load", function () {   //Adds click event to retrieve-btn
  let el = document.getElementById("retrieve-btn");

  el.addEventListener("click", function (e){
    sendUsername(e);
  }, false);
});


const sendUsername = (e) => {   //Sends username as argument for datato be loaded
  e.preventDefault();
  let username = document.usernameForm.username.value;

  if (username) {
   loadData(username);
  }
}
