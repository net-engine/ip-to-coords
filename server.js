'use strict';

const maxmind     = require("maxmind");
const request     = require("request");
const express     = require("express");
const bodyParser  = require("body-parser");

const app         = express();
const router      = express.Router();

const cityLookup = maxmind.open("./GeoLite2-City.mmdb");

const port = process.env.PORT || 3001;

const lookupIps = ipList => {
  if (!cityLookup) return "Database Unavailable";
  return ipList.map(ip => cityLookup.get(ip).location);
};

app.all("*", function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
  next();
});

app.use("/geolookup", router);

router.use(bodyParser.json());

router.route('/array')
  .post((req, res) => {
    res.status(200).send(lookupIps(req.body.iplist));
  });
router.route('/:ip')
  .get((req, res) => {
    res.status(200).send(lookupIps([req.params.ip]));
  });

app.listen(port, () => {
  console.log("app started on port", port);
});
