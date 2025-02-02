const express = require('express');
const app = express();
const translate = require('google-translate-api');
const path = require('path');

app.use(express.static(__dirname));

app.get('/translate', (req, res) => {
  const url = 'https://snapp.doctor/consultation/obstetrician-gynecologist/';
  const targetLang = 'ar'; // Arabic

  translate(url, { from: 'fa', to: targetLang }).then((translation) => {
    res.send(`<html><body>${translation.text}</body></html>`);
  }).catch((err) => {
    console.error(err);
    res.status(500).send('Error translating page');
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});
