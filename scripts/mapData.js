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
  let languageColor, fullDate, finalDate, today, todayYear;
  today = new Date();
  todayYear = today.getFullYear();

  userInfo.repositories.edges.map((repo) => {   //Maps repo-section data

    //Date creation into GitHub's format
    finalDate = dateModule(repo, fullDate, today, todayYear);

    //Primary language color for repo
    languageColor = languageColorModule(repo);

    //Inserts DOM elements with repo data
    repoWrapper.innerHTML = `
      ${repoWrapper.innerHTML}
      <section class="repo-item">
        <div>
          <div>
            <a href=${repo.node.url}>${repo.node.name}</a>
            <div>${repo.node.description ? repo.node.description : ''}</div>
          </div>

          <div>
            <span>
              <div class="language-div" style=background-color:${languageColor ? languageColor : ''}>
              </div>
              ${repo.node.primaryLanguage ? repo.node.primaryLanguage.name : ''}
            </span>
            <span><img src="./assets/star.png" alt="Star icon" />${repo.node.stargazerCount}</span>
            <span><img src="./assets/fork.png" alt="Fork icon" />${repo.node.forkCount}</span>
            <span>Updated on ${finalDate}</span>
          </div>
        </div>

        <button class="star-button">
          <img src="./assets/star.png" alt="Star icon" />
          Star
        </button>
      </section>
    `;
  })


  //Maps header data
  const userAvatar = document.getElementById('avatar-div-petit');
  const repoCount = document.getElementById('repo-count');
  const userAvatarLi = document.getElementById('avatar-div-petit-li');
  userAvatar.innerHTML = `<img src=${userInfo.avatarUrl} alt="User avatar" class="avatar" />`;
  repoCount.innerHTML = `${userInfo.repositories.totalCount}`;
  userAvatarLi.innerHTML = `<img src=${userInfo.avatarUrl} alt="User avatar" class="avatar" /><span>${userInfo.login}</span>`
}


  




