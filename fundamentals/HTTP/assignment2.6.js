const express = require("express");
const app = express();
const port = 8000;
global.urlVisitsCounter = new Map();

app.get(/^.*/, (req, res) => {
  if (!global.urlVisitsCounter.get(req.originalUrl)) {
    res.send("0");
    global.urlVisitsCounter.set(req.originalUrl, 1);
    res.end();
  }
  res.send(
    `${global.urlVisitsCounter.get(req.originalUrl)}`
  );
  global.urlVisitsCounter.set(
    req.originalUrl,
    global.urlVisitsCounter.get(req.originalUrl) + 1
  );
  res.end();
});

app.listen(port);
