import PNotify from 'pnotify/dist/es/PNotify';
// Set default styling.
PNotify.defaults.styling = 'material';
// This icon setting requires the Material Icons font. (See below.)
PNotify.defaults.icons = 'material';

const baseUrl = 'https://restcountries.eu/rest/v2/name/';
export default {
  fetchCountry(namePice) {
    return fetch(baseUrl + namePice).then(response => {
      console.log(response);
      return response.json();
    });
  },
};
