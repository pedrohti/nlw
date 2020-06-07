const express = require("express");
const app = express();
const nunjucks = require("nunjucks");

nunjucks.configure("src/views", {
	express: app,
	noCache: true,
});

app.use(express.static("public"));

app.get("/", (req, res) => {
	return res.render("index.html");
});
app.get("/novoponto", (req, res) =>
	res.render("create-point.html"),
);
app.get("/search", (req, res) => {
	return res.render("search-results.html");
});

app.listen(3000, () => console.log("http://localhost:3000"));
