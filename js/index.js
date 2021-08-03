//when form is submitted
  //take the value of input
  //search github for user matches
  //using user search endpoint

  function search() {
    const form = document.querySelector('#github-form');
    form.addEventListener('submit', searchResult)
  }
  search();
  
  function searchResult(e) {
    e.preventDefault();
    document.querySelector('#user-list').remove();
    
    const ul = document.createElement('ul');
    ul.id = 'user-list';
    
    const githubContainer = document.querySelector('#github-container');
    githubContainer.prepend(ul);
    
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
  .then(search => search.items.forEach(displayUser));
}

function displayUser(user) {

  const h2 = document.createElement('h2');
  h2.textContent = user.login;

  const img = document.createElement('img');
  img.src = user.avatar_url

  const link = document.createElement('a');
  link.href = user.html_url;
  link.textContent = 'Github Page';

  const li = document.createElement('li');
  li.append(h2, img, link);

  document.querySelector('#user-list').appendChild(li);
}


//using the results of the search
  //display information about the users to the page

//clicking on one of these users
  //should send a request using user Repos endpoint
  //return all the data about the repositories for that user
  
//using the response for the user repos
  //display all the repositories for that user on the page