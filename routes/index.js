var express = require('express');
var router = express.Router();
var path = require('path');
var axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

var home_path = path.join(__dirname, '..', 'public', 'templates', 'home.html');

var FormData = require('form-data');


/* GET home page. */
router.get('/', function(req, res) {
  res.sendFile(home_path);
});

router.get('/getCode', function(req, res, next) {

  var url = 'https://slack.com/api/oauth.access?code='+req.query.code
      +'&client_id='+process.env.client_id
      +'&client_secret='+process.env.client_secret
      +'&redirect_url=http://localhost:3000/getCode';

  axios.get(url)
      .then(function (resp) {

        console.log(resp.data.access_token);
        res.redirect(`/?access_token=${resp.data.access_token}`);

      })
      .catch(function (error) {
        res.send(error);
      });
});


module.exports = router;
