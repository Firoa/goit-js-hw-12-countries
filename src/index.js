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

function logOK() {
  console.log('ok');
}

ressultNode.addEventListener(
  'click',
  _.debounce(() => {        
  }, 500),
);

inputParrentNode.addEventListener(
  'keyup',
  _.debounce(({ target }) => {    
    let namePice = target.value;
    if (namePice !== '') {
      fetchCountries
        .fetchCountry(namePice)
        .then(data => {         
          if (data.length > 1 && data.length <= 10) {
            console.log('return list of country');
            ressultNode.innerHTML= "" ;
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
        .catch(data => {
          console.log('Dont exist');         
          PNotify.notice({
            text: 'Dont exist',
            type: 'notice',
          });
        });
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
