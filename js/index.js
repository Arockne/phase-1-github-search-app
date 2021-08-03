//when form is submitted
  //take the value of input
  //search github for user matches
  //using user search endpoint

  function search() {
    const form = document.querySelector('#github-form');
    form.addEventListener('submit', searchResult)
  }
  
  function searchResult(e) {
    e.preventDefault();
    removeCurrentSearch();
 
    const search = e.target.querySelector('#search').value;
    getUser(search);
    this.reset();
  }

  function getUser(userSearch) {
  fetch(`https://api.github.com/search/users?q=${userSearch}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/vnd.github.v3+json'
    }
  })
  .then(resp => resp.json())
  .then(search => search.items.forEach(displayUser))
  .catch(err => console.log(err));
}

function removeCurrentSearch() {
  const currentSearch = document.querySelector('#user-list');
  if (currentSearch.children.length > 0) {
    const newSearch = document.createElement('ul');
    newSearch.id = 'user-list';
    currentSearch.remove();
    document.querySelector('#github-container').prepend(newSearch);
  }
}

function displayUser(user) {
  const h2 = document.createElement('h2');
  h2.textContent = user.login;

  const img = document.createElement('img');
  img.src = user.avatar_url
  img.id = user.login;
  img.addEventListener('click', getRepo)

  const link = document.createElement('a');
  link.href = user.html_url;
  link.textContent = 'Github Page';

  const li = document.createElement('li');
  li.className = 'card';
  li.append(h2, img, link);

  document.querySelector('#user-list').appendChild(li);
}

function getRepo(e) {
  removeCurrentRepo();
  const user = e.target.id;
  fetch(`https://api.github.com/users/${user}/repos`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/vnd.github.v3+json'
    }
  })
  .then(resp => resp.json())
  .then(repos => repos.forEach(displayRepo))
  .catch(err => document.querySelector('#repos-list').textContent(err.message));
}

function removeCurrentRepo() {
  const repoList = document.querySelector('#repos-list');
  if (repoList.children.length > 0) {
    const newRepoList = document.createElement('ul');
    newRepoList.id = 'repos-list';
    repoList.remove();
    document.querySelector('#github-container').appendChild(newRepoList);
  }
}

function displayRepo(repo) {
  const link = document.createElement('a');
  link.href = repo.html_url;
  link.textContent = repo.name
  link.target - '_blank';

  const li = document.createElement('li');
  li.appendChild(link);

  document.querySelector('#repos-list').appendChild(li);
}

search();