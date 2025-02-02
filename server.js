const express = require('express');
const app = express();
const translate = require('google-translate-api');

app.use(express.static(__dirname + '/public'));

app.get('/translate', (req, res) => {
  const url = 'https://snapp.doctor/consultation/obstetrician-gynecologist/';
  const targetLang = 'ar'; // Arabic

  translate(url, { from: 'fa', to: targetLang }).then((translation) => {
    res.send(translation.text);
  }).catch((err) => {
    console.error(err);
    res.status(500).send('Error translating page');
  });
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
