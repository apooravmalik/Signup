const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fetch = require('node-fetch');

const app = express();

// Bodyparser Middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Static folder
app.use(express.static(path.join(__dirname, 'public')));

// Signup Route
app.post('/signup', (req, res) => {
  const { firstName, lastName, email } = req.body;

  // Make sure fields are filled
  if (!firstName || !lastName || !email) {
    res.redirect('/failure.html');
    return;
  }

  // Construct req data
  const data = {
    members: [
      {
        email_address: email,
        status: 'subscribed',
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };

  const postData = JSON.stringify(data);

  fetch('https://us21.api.mailchimp.com/3.0/lists/0a7fb20500', {
    method: 'POST',
    headers: {
      Authorization: 'auth adf64c4944c20695f0e3819b91e655a8-us21'
    },
    body: postData
  })
    .then(res.statusCode === 200 ?
      res.redirect('/sucess.html') :
      res.redirect('/failure.html'))
    .catch(err => console.log(err))
})

app.listen(process.env.PORT || 5000, console.log(`Server started on ${PORT}`));


  // apiKey: adf64c4944c20695f0e3819b91e655a8-us21