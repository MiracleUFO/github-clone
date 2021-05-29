var firebaseConfig = {
  apiKey: "AIzaSyANfaiZuoNgR2zmOvPziZPU6PWUbX7cVNk",
  authDomain: "github-clone-7fba2.firebaseapp.com",
  databaseURL: "https://github-clone-7fba2-default-rtdb.firebaseio.com",
  projectId: "github-clone-7fba2",
  storageBucket: "github-clone-7fba2.appspot.com",
  messagingSenderId: "964408805129",
  appId: "1:964408805129:web:97666921dbedab0e8e75d8",
  measurementId: "G-C0003P4G8T"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const db = firebase.firestore();

const firebaseMethods = {
  getKey: () =>
    db.collection("API_KEY").doc('T1Vqw2kf8Rb0jWXEDdac').get()    
};

export default firebaseMethods;