import PNotify from 'pnotify/dist/es/PNotify';
// Set default styling.
PNotify.defaults.styling = 'material';
// This icon setting requires the Material Icons font. (See below.)
PNotify.defaults.icons = 'material';

const baseUrl = 'https://restcountries.eu/rest/v2/name/';
export default {
  fetchCountry(namePice) {
    return fetch(baseUrl + namePice).then(response => response.json()).catch(error => console.log("firts catch dont exist"));
  },
};
