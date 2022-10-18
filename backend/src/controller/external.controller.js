const axios = require("axios");

require("dotenv").config();

const token = process.env.TOKEN;

const getLocal = (req, res) => {
  const local = encodeURI(req.body.data);
  axios
    .get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${local}%20.json?limit=7&types=postcode%2Caddress&access_token=${token}`
    )
    .then((response) => res.send(response.data))
    .catch((error) => {
      res.status(500).send(error);
    });
};

module.exports = { getLocal };
