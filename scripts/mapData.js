import { palette } from '../seeders/palette.js';


export const mapData = (data) => {  //

  let userInfo = {...data.data.repositoryOwner};

  //Map aside data
  const aside = document.getElementsByTagName('aside');
  aside[0].innerHTML = `
    <img src=${userInfo.avatarUrl} alt="User avatar" class="avatar" />
    <div>
      <h1>${userInfo.name}</h1>
      <p>${userInfo.login}</p>
    </div>
    <p>${userInfo.bio}</p>
  `;

  
  //Selects repositories section
  const repoWrapper = document.getElementById('main');

  //Variables for color associated with repo, and dates
  let languageColor, fullDate;
  let today = new Date();
  let todayYear = today.getFullYear();

  userInfo.repositories.edges.map((repo) => {   //Maps repositories data

    //Date logic

    //Variable for date object of repo's date of last update
    fullDate = new Date(repo.node.updatedAt);
  
    //Variables for date of the month (int), month (int, changes to string)
    let date = fullDate.getDate();
    let dateMonth = fullDate.getMonth();
    let monthsArray = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    dateMonth = monthsArray[dateMonth];

    //Sets the year if not this year
    let fullYear = fullDate.getFullYear() === todayYear ? '' : fullDate.getFullYear();

    //If updated today, set hours ago or minutes ago
    let minutesOrHours = (fullDate.getTime() - today.getTime())/1000 >= 1 ? `${(fullDate.getTime() - today.getTime())} mins` : 'Just now';
    minutesOrHours = (fullDate.getTime() - today.getTime())/3600000 >= 1 ? `${(fullDate.getTime() - today.getTime())} hours` : minutesOrHours;

    //Sets date
    fullDate = fullDate === today ? minutesOrHours : `${date} ${dateMonth} ${fullYear}`;


    //Language color logic
    for (const [k, v] of Object.entries(palette)) {
      if (k === repo.node.primaryLanguage?.name)
      languageColor = v;
    }

    //Inserts DOM elements with repo data
    repoWrapper.innerHTML = `
      ${repoWrapper.innerHTML}
      <section class="repo-item">
        <div>
          <div>
            <a href=${repo.node.url}>${repo.node.name}</a>
            ${repo.node.description ? repo.node.description : ''}
          </div>

          <div>
            <span>
              <div class="language-div" style=background-color:${languageColor ? languageColor : ''}>
              </div>
              ${repo.node.primaryLanguage ? repo.node.primaryLanguage.name : ''}
            </span>
            <span><img src="./assets/star.png" alt="Star icon" />${repo.node.stargazerCount}</span>
            <span><img src="./assets/fork.png" alt="Fork icon" />${repo.node.forkCount}</span>
            <span>Updated on ${fullDate}</span>
          </div>
        </div>

        <button class="star-button">
          <img src="./assets/star.png" alt="Star icon" />
          Star
        </button>
      </section>
    `;
  })


  //Maps header info
  const userAvatar = document.getElementById('avatar-div-petit');
  const repoCount = document.getElementById('repo-count');
  const userAvatarLi = document.getElementById('avatar-div-petit-li');
  userAvatar.innerHTML = `<img src=${userInfo.avatarUrl} alt="User avatar" class="avatar" />`;
  repoCount.innerHTML = `${userInfo.repositories.totalCount}`;
  userAvatarLi.innerHTML = `<img src=${userInfo.avatarUrl} alt="User avatar" class="avatar" /><span>${userInfo.login}</span>`
}


  




