const translate = require('google-translate-api');

const url = 'https://snapp.doctor/consultation/obstetrician-gynecologist/';
const language = 'ar'; // Arabic

translate(url, {from: 'en', to: language}).then(res => {
  const translatedHtml = res.text;
  document.getElementById('translated-iframe').srcdoc = translatedHtml;
}).catch(err => {
  console.error(err);
});
