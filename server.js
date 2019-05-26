var express = require("express");
var bodyParser = require("body-parser");
var fs = require("fs");
// -------------------- modules --------------

var app = express();
var stringifyFile;
app.use(bodyParser.json());

// ------- GET note
app.get("/getNote", function(req, res) {
  console.log("File requested");
  fs.readFile("./test.json", "utf8", function(err, data) {
    if (err) throw err;
    stringifyFile = data;
    res.send(data);
  });
});

// -------- POST note (dynamic)
app.post("/updateNote/:note", function(req, res) {
  console.log("File update requested");
  fs.readFile("./test.json", "utf-8", function(err, data) {
    if (err) throw err;
    stringifyFile = data + req.params.note;
    fs.writeFile("./test.json", stringifyFile, function(err) {
      if (err) throw error;
      res.send(stringifyFile);
      console.log("File updated");
    });
  });
});

app.listen(3000);

// ------ handling 404
app.use(function(req, res, next) {
  res.status(404).send("Sorry, these are not the droids you were looking for");
});
