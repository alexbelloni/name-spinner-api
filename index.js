const express = require('express');
require('dotenv').config();
const logger = require('./logs/logger');
const cors = require('cors');

const app = express();

logger(app);

var corsOptions = {
    origin: function (origin, callback) {
        if (true) {
          callback(null, true)
        } else {
          callback(new Error('Not allowed by CORS'))
        }
      },
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }
app.use(cors(corsOptions));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE');//, OPTIONS');
    next();
});

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hi, this is name-spinner api!');
});

require('./routes/names')(app);

const port = process.env.PORT || 5005;
app.listen(port, () => console.log(`App listening at http://localhost:${port}`));
