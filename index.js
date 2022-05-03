const express = require("express");
const bodyParser = require("body-parser");
const connection = require("./database/database");
const Ask = require("./database/Ask");
const Answer = require("./database/Answer");

//database
connection
  .authenticate()
  .then(() => {
    console.log("connection OK");
  })
  .catch((e) => console.log(e));

const app = express();
//calling static arquives
app.use(express.static("public"));
//bodyparser to take the data from forms
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//calling ejs to view engine
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  Ask.findAll({ raw: true, order: [["id", "DESC"]] }).then((asks) => {
    res.render("index", {
      asks: asks,
    });
  });
});

app.get("/asks", (req, res) => {
  res.render("asks");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/ask/:id", (req, res) => {
  const id = req.params.id;
  Ask.findOne({
    where: { id: id },
  }).then((ask) => {
    if (!ask) return res.redirect("/");
    Answer.findAll({
      order: [["id", "DESC"]],
      where: { askId: ask.id },
    }).then((answer) => {
      res.render("ask", {
        ask: ask,
        answers: answer,
      });
    });
  });
});

//route to save data
app.post("/saveask", (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  Ask.create({
    title: title,
    description: description,
  }).then(() => {
    res.redirect("/");
  });
});

app.post("/answer", (req, res) => {
  const body = req.body.answer;
  const id = req.body.question;
  Answer.create({
    body: body,
    askId: id,
  }).then(() => {
    res.redirect(`/ask/${id}`);
  });
});

app.listen(3000, () => {
  console.log("Server on");
});
