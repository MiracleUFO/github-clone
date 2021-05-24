import { mapData } from './mapData.js';


export const loadData = async (username) => {   //Gets data using GitHub GraphQL API

  //Makes preloader visible 
  document.getElementsByTagName('body')[0].setAttribute('id', 'wrapper');
  document.getElementById('preloader-wrapper').setAttribute('class', 'preloader-wrapper-visible');
  document.getElementById('preloader').setAttribute('class', 'preloader');

  //Query arguments
  let requestURL = `https://api.github.com/graphql`;
  let query = 
  `query {
    repositoryOwner(login: "${username}") {
      login
      ...on User {
        avatarUrl,
        login,
        name,
        bio,
        repositories(first: 20) {
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
              }
            }
          }
        }
      }
    }
  }`;
  let oauth = {Authorization: `bearer ${config.API_TOKEN}`};

  //Sends request to load user's data from Github GraphQL API
  axios.post(requestURL, {query: query}, {headers: oauth})
  .then((res) => {

    //Hides preloader when data arrives
    document.getElementById('wrapper').setAttribute('class', '');
    document.getElementById('preloader-wrapper').setAttribute('class', 'preloader-wrapper');
    document.getElementById('preloader').setAttribute('class', '');

    //Sends user's data to mapData for injection into the DOM
    mapData(res.data);

    return res.data
  })
  .catch((err) => console.log(err))
}