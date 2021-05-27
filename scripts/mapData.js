import { dateModule } from './dateModule.js';
import { languageColorModule } from './languageColorModule.js';


export const mapData = (data) => {  //

  let userInfo = {...data.data.repositoryOwner};


  //Map aside data
  const aside = document.getElementById('aside-section');
  aside.innerHTML = `
    ${aside.innerHTML}
    <div>
      <img src=${userInfo.avatarUrl} alt="User avatar" class="avatar" />
      <div>
        <h1>${userInfo.name}</h1>
        <p>${userInfo.login}</p>
      </div>
    </div>
    <p>${userInfo.bio}</p>
  `;


  //Selects repositories section
  const repoWrapper = document.getElementById('repo-section');

  //Variables for color associated with language, and dates
  let languageColor, fullDate, 
  finalDate, today = new Date(), 
  todayYear = today.getFullYear(), publicRepoCount = 0;


  userInfo.repositories.edges.map((repo) => {   //Maps repo-section data

    //Date creation into GitHub's format
    finalDate = dateModule(repo, fullDate, today, todayYear);

    //Primary language color for repo
    languageColor = languageColorModule(repo);

    //Sets number of public repos
    if (!repo.node.isPrivate) publicRepoCount++;

    //Inserts DOM elements with repo data
    repoWrapper.innerHTML = `
      ${repoWrapper.innerHTML}
      <section class="repo-item">
        <div>
          <div>
            <a href=${repo.node.url}>${repo.node.name}</a>
            <div class="description">${repo.node.description ? repo.node.description : ''}</div>
            <div class="adt-info">
              <span>
                <div class="language-div" style=background-color:${languageColor ? languageColor : ''}>
                </div>
                <span>${repo.node.primaryLanguage ? repo.node.primaryLanguage.name : ''}</span>
              </span>
              <span>
                <span class="iconify" data-icon="octicon:star-24" data-inline="false"></span>
                <span>${repo.node.stargazerCount}</span>
              </span>
              <span>
                <span class="iconify" data-icon="octicon:repo-forked-24" data-inline="false"></span>
                <span>${repo.node.forkCount}</span>
              </span>
              <span>Updated on ${finalDate}</span>
            </div>
          </div>
        </div>

        <button class="star-button">
          <span class="iconify" data-icon="octicon:star-24" data-inline="false"></span>
          Star
        </button>
      </section>
    `;
  })
  document.getElementById('public-repo-count').innerHTML = `<b>${publicRepoCount}</b>`;

  //Maps header data
  const userAvatar = document.getElementById('avatar-div-petit');
  const repoCount = document.getElementById('repo-count');
  const userAvatarLi = document.getElementById('avatar-div-petit-li');
  userAvatar.innerHTML = `<img src=${userInfo.avatarUrl} alt="User avatar" class="avatar" />`;
  repoCount.innerHTML = `${userInfo.repositories.totalCount}`;
  userAvatarLi.innerHTML = `<img src=${userInfo.avatarUrl} alt="User avatar" class="avatar" /><span>${userInfo.login}</span>`
}


  




