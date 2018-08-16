var cs = require("coffee-script/register");
const express = require('express');
const path = require('path');
const app = express();
require('dotenv').config()

const {google} = require('googleapis');

// Each API may support multiple version. With this sample, we're getting
// v1 of the urlshortener API, and using an API key to authenticate.
const sheets = google.sheets({
  version: 'v4',
  auth: process.env.API_KEY
});

const params = {
  spreadsheetId: process.env.SPREADSHEET_ID,
  range: 'A2:D',
  dateTimeRenderOption: 'FORMATTED_STRING'
};


//app.engine('html', require('ejs').renderFile);
app.get('/', (req, res) => {
  //res.render(path.join(__dirname, '/', 'index.html'));

  sheets.spreadsheets.values.get(params, (err, response) => {
    if (err) {
      console.error(err);
      throw err;
    }
    var data = response.data.values;
    console.log(data);
    var users = '<iframe src="https://docs.google.com/forms/d/e/1FAIpQLSfypPkuhJNKZnYWckmWSz6h1TVThiCf4GX0DlaaM0hQ-IGbkw/viewform?embedded=true" width="700" height="520" frameborder="0" marginheight="0" marginwidth="0">Loading...</iframe>';
    for(var i = 0; i < data.length; i++){
      users += '<h1>User: ' + data[i][3] + '<br>Favorite Color: ' + data[i][1] +
            '<br>Interests: ' + data[i][2] + '</h1>';
    }
    res.send(users);
  });
});

app.listen(8000, () => {
  console.log('Example app listening on port 8000!')
});
