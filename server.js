const express = require("express");
const cluster = require("cluster");
const app = express();
const os = require("os");

function delay(duration) {
  const startTime = Date.now();
  while (Date.now() - startTime < duration) {}
}
app.get("/", (req, res) => {
  res.send(`Performance example: ${process.pid}`);
});

app.get("/timer", (req, res) => {
  delay(9000);
  res.send(`timer!!!!!!!!!!!!!!!: ${process.pid}`);
});

if (cluster.isMaster) {
  const NUM_FORK = os.cpus().length;
  for (i = 0; i < NUM_FORK; i++) {
    cluster.fork();
  }
 
} else {
  console.log("Worker process started");
  app.listen(3000);
}
