import { loadData } from './loadData.js';
import { mapData } from './mapData.js';


window.addEventListener("load", function () {
  let el = document.getElementById("retrieve-btn");

  el.addEventListener("click", function (e){
    sendUsername(e);
  }, false);
});


const sendUsername = async (e) => {
  e.preventDefault();
  let username = document.usernameForm.username.value;

  if (username) {
    const userData = await loadData(username);
    return userData;
  }
}
