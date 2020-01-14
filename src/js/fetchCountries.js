import PNotify from 'pnotify/dist/es/PNotify';
// Set default styling.
PNotify.defaults.styling = 'material';
// This icon setting requires the Material Icons font. (See below.)
PNotify.defaults.icons = 'material';

const baseUrl = 'https://restcountries.eu/rest/v2/name/';
export default {
  fetchCountry(namePice) {
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
          });
        }
      })
      .catch(data => {
        console.log('Dont exist');
        debugger;
        PNotify.notice({
          text: 'Dont exist',
          type: 'notice',            
        });
      });
  },
};
