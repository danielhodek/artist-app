const addArtistBtn = document.getElementById('add-artist-btn');
const search = document.getElementById('search');
const searchBtn = document.getElementById('search-btn');
const addBtn = document.getElementById('add-btn');
const artistForm = document.getElementById('artist-form');
const artistList = document.querySelector('.artist-list');

let artists;
let numMatches = 0;

document.addEventListener('DOMContentLoaded', async () => {
  artists = await getArtists();

  if (!artists) {
    artists = [];
    return;
  }

  if (artists.length === 0) artistList.classList.add('hide');

  for (let a of artists) {
    addArtistCard(a);
  }
});

searchBtn.addEventListener('click', () => {
  const searchStr = search.value;
  const regex = new RegExp(searchStr, 'i');
  numMatches = 0;

  for (let i = 0; i < artists.length; i++) {
    if (!regex.test(artists[i].name)) {
      artistList.children[i].classList.add('hide');
    } else {
      artistList.children[i].classList.remove('hide');
      numMatches++;
    }
  }

  if (numMatches === 0) artistList.classList.add('hide');
  else artistList.classList.remove('hide');
});

addArtistBtn.addEventListener('click', () => {
  toggleForm(artistForm);
});

addBtn.addEventListener('click', e => {
  e.preventDefault();

  const artist = {
    name: document.getElementById('name').value,
    about: document.getElementById('about').value,
    imgUrl: document.getElementById('img-url').value
  };

  addArtist(artist);
  addArtistCard(artist);
  artistList.classList.remove('hide');
  toggleForm(artistForm);
});

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

function addArtist(artist) {
  artists.push(artist);
  saveArtists();
}

function deleteArtist(index) {
  artists.splice(index, 1);
  saveArtists();
}

async function getArtists() {
  try {
    let response = await fetch('/artists', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    let data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

async function saveArtists() {
  try {
    let response = await fetch('/artists', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(artists)
    });
    console.log(response);
  } catch (err) {
    console.log(err);
  }
}

function addArtistCard(artist) {
  const card = createArtistCard(artist.name, artist.about, artist.imgUrl);
  artistList.appendChild(card);
}

function indexOf(element) {
  let i = 0;
  while ((element = element.previousElementSibling) != null) {
    i++;
  }
  return i;
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
  button.addEventListener('click', () => {
    deleteArtist(indexOf(li));
    numMatches--;
    if (artists.length === 0 || numMatches === 0) artistList.classList.add('hide');
    li.remove();
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
