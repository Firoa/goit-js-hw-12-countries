import './styles.css';
import _ from 'lodash';
import fetchCountries from './js/fetchCountries';

import PNotify from 'pnotify/dist/es/PNotify';
import PNotifyStyleMaterial from 'pnotify/dist/es/PNotifyStyleMaterial.js';

// Set default styling.
PNotify.defaults.styling = 'material';
// This icon setting requires the Material Icons font. (See below.)
PNotify.defaults.icons = 'material';

const inputParrentNode = document.querySelector('.country_input');
const ressultNode = document.querySelector('.contry_list');
const baseUrl = 'https://restcountries.eu/rest/v2/name/';
console.log(inputParrentNode);
console.log(ressultNode);

function logOK() {
  console.log('ok');
}

ressultNode.addEventListener(
  'click',
  _.debounce(() => {
    console.log('d');
    fetchCountries.fetchCountry('s');
  }, 500),
);

inputParrentNode.addEventListener(
  'keyup',
  _.debounce(({ target }) => {
    console.log(target.value);
    let namePice = target.value;
    if (namePice !== '') {
      fetchCountries.fetchCountry(namePice);
    }
  }, 500),
);

const createList = function(countries) {
  console.log(countries);
  return countries
    .map(countrie => {
      return `<li>${countrie}</li>`;
    })
    .join('\n');
};
console.log(createList(['USA', 'DEB', 'RESM']));
ressultNode.insertAdjacentHTML(
  'afterbegin',
  createList(['USA', 'DEB', 'RESM']),
);
