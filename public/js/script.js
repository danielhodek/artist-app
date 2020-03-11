const addArtistBtn = document.getElementById('add-artist-btn');
const search = document.getElementById('search');
const searchBtn = document.getElementById('search-btn');
const addBtn = document.getElementById('add-btn');
const artistForm = document.getElementById('artist-form');
const artistList = document.querySelector('.artist-list');

const ARTISTS_URL = '/artists';

addArtistBtn.addEventListener('click', () => {
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

function clearList(list) {
  while (list.firstChild) list.removeChild(list.firstChild);
}
