const express = require("express");
const cluster = require("cluster");

const app = express();

function delay(duration) {
  const startTime = Date.now();
  while (Date.now() - startTime < duration) {}
}

app.get("/", (req, res) => {
  // real life slow down the server
  // JSON.stringify({}) => "{}"
  // JSON.parse("{}") => {}

  //[5,1,2,3,4].sort()
  //Crypto
  res.send("Performance example");
});

app.get("/timer", (req, res) => {
  delay(9000);
  res.send("Ding ding ding!");
});

if (cluster.isMaster) {
  console.log("Master has been started...");
  cluster.fork();
  cluster.fork();
} else {
  console.log("Worker process started.");
  app.listen(3000);
}
