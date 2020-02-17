import './styles.css';
import _ from 'lodash';
import fetchCountries from './js/fetchCountries';
import countryInfoMarkup from './templates/countryInfoMarkup.hbs';

import PNotify from 'pnotify/dist/es/PNotify';
import PNotifyStyleMaterial from 'pnotify/dist/es/PNotifyStyleMaterial.js';

// Set default styling.
PNotify.defaults.styling = 'material';
// This icon setting requires the Material Icons font. (See below.)
PNotify.defaults.icons = 'material';

const inputParrentNode = document.querySelector('.country_input');
const ressultNode = document.querySelector('.contry_list');
const resultWraperNode = document.querySelector('.country-info');

function logOK() {
  console.log('ok');
}

inputParrentNode.addEventListener(
  'keyup',
  _.debounce(({ target }) => {    
    let namePice = target.value;    
    if (namePice !== '') {
      fetchCountries
        .fetchCountry(namePice)
        .then(data => {
          if (data.status === 404){
            console.log(data);
            PNotify.notice({
              text: data.message,
              type: 'notice',
            });
          }
          if (data.length === 1) {
            ressultNode.innerHTML = '';
            ressultNode.style.height = '0px';
            resultWraperNode.innerHTML = '';           
            setCoutryInfo(data, resultWraperNode);
          }
          if (data.length > 1 && data.length <= 10) {
            resultWraperNode.innerHTML = '';
            ressultNode.style.height = '';
            ressultNode.innerHTML = '';
            ressultNode.insertAdjacentHTML(
              'afterbegin',
              createList(data.map(({ name }) => name)),
            );
          }
          if (data.length > 10) {
            console.log('to many countries match');
            PNotify.error({
              text: 'Too many matches',
              type: 'notice',
            });
          }
        })
        
    }
    else{
      ressultNode.innerHTML = '';
      resultWraperNode.innerHTML = '';
    }
  }, 500),
);

const createList = function(countries) {
  return countries
    .map(countrie => {
      return `<li class="listItem" >${countrie}</li>`;
    })
    .join('\n');
};

const setCoutryInfo = function(data, insertNode) {
  insertNode.insertAdjacentHTML('beforeend', countryInfoMarkup(data[0]));
};

async function fetchData(namePice) {
  try {
    const response = await fetch(
      'https://restcountries.eu/rest/v2/name/gggggg',
    );
    const data = await response.json();
    console.log(data);
  } catch (err) {
    alert(err.message);
  }
}
