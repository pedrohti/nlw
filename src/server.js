const express = require("express");
const app = express();

const nunjucks = require("nunjucks");
nunjucks.configure("src/views", {
	express: server,
	noCache: true,
});

app.use(express.static("public"));

app.get("/", (req, res) => res.render("index.html"));
app.get("/novoponto", (req, res) =>
	res.sendFile(__dirname + "/views/create-point.html"),
);
app.get("/buscarponto", (req, res) =>
	res.sendFile(__dirname + "/views/search-results.html"),
);

app.listen(3000, () => console.log("http://localhost:3000"));
