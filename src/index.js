import './styles.css';
import _ from 'lodash';

import PNotify from 'pnotify/dist/es/PNotify';
import PNotifyStyleMaterial from 'pnotify/dist/es/PNotifyStyleMaterial.js';

// Set default styling.
PNotify.defaults.styling = 'material';
// This icon setting requires the Material Icons font. (See below.)
PNotify.defaults.icons = 'material';

const inputParrentNode = document.querySelector('.country_input');
const ressultNode = document.querySelector('.result_wrapper');
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
  }, 500),
);

inputParrentNode.addEventListener(
  'keyup',
  _.debounce(({ target }) => {
    console.log(target.value);
    let namePice = target.value;
    if (namePice !== '') {
      fetch(baseUrl + namePice)
        .then(response => {
          console.log(response);
          return response.json();
        })
        .then(data => {
          console.log(data);
          if (data.length > 1 && data.length <= 10) {
            console.log('return list of country');
          }
          if (data.length > 10) {
            console.log('to many countries match');
            PNotify.error({
              text: 'Too many matches',
              type: 'notice',
              dir1: 'down',
              dir2: 'left',
            });
          }
        })
        .catch(() => {
          console.log('Dont exist');
        });
    }
  }, 500),
);
