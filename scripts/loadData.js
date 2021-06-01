import firestore from '../config/firestore.js';
import { mapData } from "./mapData.js";


export const loadData = async (username) => {   //Gets data using GitHub GraphQL API

  //Makes preloader visible 
  document.getElementById('error-result').innerHTML = ``;
  document.getElementsByTagName('body')[0].setAttribute('id', 'wrapper');
  document.getElementById('preloader-wrapper').setAttribute('class', 'preloader-wrapper-visible');
  document.getElementById('preloader').setAttribute('class', 'preloader');


  //Query arguments
  let requestURL = `https://api.github.com/graphql`;
  let query = 
  `query {
    repositoryOwner(login: "${username}") {
      login,
      ...on User {
        avatarUrl,
        login,
        name,
        bio,
        status {
          emojiHTML,
          message
        },
        repositories(first: 20) {
          totalCount,
          edges {
            node {
              name,
              description,
              url,
              forkCount,
              stargazerCount,
              updatedAt,
              primaryLanguage {
                name
              },
              isPrivate
            }
          }
        }
      }
    }
  }`;


  firestore.getKey()
  .then(s => {
    
    let oauth = {Authorization: `bearer ${s.data().token}`};

    //Sends request to load user's data from Github GraphQL API
    axios.post(requestURL, {query: query}, {headers: oauth})
    .then((res) => {

      //Hides preloader when data arrives
      document.getElementById('wrapper').setAttribute('class', '');
      document.getElementById('preloader-wrapper').setAttribute('class', 'preloader-wrapper');
      document.getElementById('preloader').setAttribute('class', '');

      //if User is not found display error message
      if (!res.data.data.repositoryOwner) {
        document.getElementById('error-result').innerHTML = `*User not found`;
        return;
      } 

      //Displays User profile section
      document.getElementById('form-wrapper').setAttribute('class', 'main');
      document.getElementById('main').setAttribute('class', 'main-visible');

      //Sends user's data to mapData for injection into DOM
      mapData(res.data);
    })
    .catch((err) => console.log(err))
  })
  .catch((e) => console.log(e))
}