const express = require("express");
const app = express();
const nunjucks = require("nunjucks");

const db = require("./database/db");

nunjucks.configure("src/views", {
	express: app,
	noCache: true,
});

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/all", (req, res) => {
	db.all(`SELECT * FROM places`, (err, rows) => {
		if (err) {
			return console.log(err);
		}

		return res.json(rows);
	});
});

app.get("/", (req, res) => {
	return res.render("index.html");
});

app.get("/newpoint", (req, res) => {
	res.render("create-point.html");
});

app.get("/search", (req, res) => {
	const search = req.query.search;

	if (search == "") {
		return res.render("search-results.html", { total: 0 });
	}

	db.all(
		`SELECT * FROM places WHERE city LIKE '%${search}%'`,
		(err, rows) => {
			if (err) {
				return console.log(err);
			}
			const total = rows.length;
			return res.render("search-results.html", { places: rows, total });
		},
	);
});

app.get("/allpoints", (req, res) => {
	db.all(`SELECT * FROM places`, (err, rows) => {
		if (err) {
			return console.log(err);
		}
		const total = rows.length;
		return res.render("search-results.html", { places: rows, total });
	});
});

app.post("/savepoint", (req, res) => {
	const body = req.body;
	const sqlInsert = `INSERT INTO places (image, name, address, address2, state, city, items) VALUES (?, ?, ?, ?, ?, ?, ?);`;
	const values = [
		body.image,
		body.name,
		body.address,
		body.address2,
		body.state,
		body.city,
		body.items,
	];

	function afterInsertData(err) {
		if (err) {
			return res.send("Erro no cadastro!");
		}

		res.render("create-point.html", { saved: true });
	}

	db.run(sqlInsert, values, afterInsertData);
});

app.listen(3000, () => console.log("http://localhost:3000"));
