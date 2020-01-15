const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const DigestFetch = require('digest-fetch');
const qs = require('qs');
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res) {
  const client = new DigestFetch('tcxc_route_tester', 'T2HYImI2mSNA');

  const url =
    'https://apiv2.telecomsxchange.com/buyers/tools/getnumbers?' +
    qs.stringify(req.query);
  const options = {};

  client
    .fetch(url, options)
    .then(resp => resp.json())
    .then(data => {
      const { status, message } = data;
      if (status === 'error') {
        return res.status(400).json(data);
      }
      return res.status(200).json(data);
    })
    .catch(e => {
      return res.status(400).json(data);
    });
});

const server = app.listen(8080, function() {
  console.log('app running on port.', server.address().port);
});