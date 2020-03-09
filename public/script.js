const addArtistBtn = document.getElementById('add-artist-btn');
const search = document.getElementById('search');
const searchBtn = document.getElementById('search-btn');
const addBtn = document.getElementById('add-btn');
const artistForm = document.getElementById('artist-form');
const artistList = document.querySelector('.artist-list');

const ARTISTS_URL = '/artists';

// Event listeners.
document.addEventListener('DOMContentLoaded', async () => {
  try {
    let artists = await getArtists();

    if (artists.length === 0) artistList.classList.add('hide');
    else displayArtists(artists);
  } catch (err) {
    console.log(err);
    artists = [];
  }
});

searchBtn.addEventListener('click', async () => {
  // Handle on server.
  const searchStr = search.value;

  try {
    let artists = await getArtists(searchStr);
    displayArtists(artists);
  } catch (err) {
    console.log(err);
  }
});

addArtistBtn.addEventListener('click', () => {
  toggleForm(artistForm);
});

addBtn.addEventListener('click', async e => {
  e.preventDefault();

  const artist = {
    name: document.getElementById('name').value,
    about: document.getElementById('about').value,
    imgUrl: document.getElementById('img-url').value
  };

  try {
    await addArtist(artist);
    addArtistCard(artist);
    artistList.classList.remove('hide');
    toggleForm(artistForm);
  } catch (err) {
    console.log(err);
  }
});

// CRUD methods.
async function getArtists(searchStr) {
  return new Promise(async (resolve, reject) => {
    try {
      let url = ARTISTS_URL;
      if (searchStr !== undefined)
        url += `/${searchStr}`;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) throw response;
      let data = await response.json();
      resolve(data);
    } catch (err) {
      reject(err);
    }
  });
}

async function addArtist(artist) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(ARTISTS_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(artist)
      });
      if (!response.ok) throw response;
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
}

async function deleteArtist(name) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`${ARTISTS_URL}/${name}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) throw response;
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
}

// DOM functions.
function addArtistCard(artist) {
  const card = createArtistCard(artist.name, artist.about, artist.imgUrl);
  artistList.appendChild(card);
}

function createArtistCard(name, about, imgUrl) {
  // create elements
  const li = document.createElement('li');
  const img = document.createElement('img');
  const div = document.createElement('div');
  const h3 = document.createElement('h3');
  const p = document.createElement('p');
  const button = document.createElement('button');

  // add event listeners
  button.addEventListener('click', async () => {
    try {
      await deleteArtist(name);
      li.remove();
      if (artistList.getElementsByTagName('li').length < 1) 
        artistList.classList.add('hide');
    } catch (err) {
      console.log(err);
    }
  });

  // add classes
  li.classList.add('artist-card');
  img.classList.add('artist-img');
  div.classList.add('artist-text');
  h3.classList.add('artist-name');
  p.classList.add('artist-description');
  button.classList.add('delete-btn');

  // set attributes
  img.setAttribute('src', imgUrl);

  // set text content
  h3.textContent = name;
  p.textContent = about;
  button.textContent = 'Delete';

  // append
  li.appendChild(img);
  li.appendChild(div);
  li.appendChild(button);
  div.appendChild(h3);
  div.appendChild(p);

  return li;
}

// Helper functions.
function displayArtists(artists) {
  clearList(artistList);
  if (artists.length < 1) {
    artistList.classList.add('hide');
  } else {
    artistList.classList.remove('hide');
    for (let a of artists) addArtistCard(a);
  }
}

function toggleForm(form) {
  clearForm(form);
  artistForm.classList.toggle('hide');
}

function clearForm(form) {
  const formInputs = form.getElementsByTagName('input');
  for (let i of formInputs) {
    i.value = '';
  }
}

function clearList(list) {
  while (list.firstChild) list.removeChild(list.firstChild);
}
