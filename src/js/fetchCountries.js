import PNotify from 'pnotify/dist/es/PNotify';
// Set default styling.
PNotify.defaults.styling = 'material';
// This icon setting requires the Material Icons font. (See below.)
PNotify.defaults.icons = 'material';

const baseUrl = 'https://restcountries.eu/rest/v2/name/';
export default {
  async fetchCountry(namePice) {
    try {
      const response = await fetch(baseUrl + namePice);
      return await response.json();
    }
    catch (error) {
      return console.log("firts catch dont exist");
    }
  },
};
