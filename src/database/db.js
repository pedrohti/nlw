const sqlite = require("sqlite3").verbose();
const db = new sqlite.Database("./src/database/database.db");

db.serialize(() => {
	db.run(`
		CREATE TABLE IF NOT EXISTS places (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			image TEXT,
			name TEXT,
			address TEXT,
			address2 TEXT,
			state TEXT,
			city TEXT,
			items TEXT
		);
    `);

	const sqlInsert = `INSERT INTO places (image, name, address, address2, state, city, items) VALUES (?, ?, ?, ?, ?, ?, ?);`;

	const values = [
		"https://images.unsplash.com/photo-1567393528677-d6adae7d4a0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
		"Colectoria",
		"Guilherme Gemballa, Jardim América",
		"Nº 260",
		"Santa Catarina",
		"Rio do Sul",
		"Resíduos Eletrônicos, Lâmpadas",
	];

	const values2 = [
		"https://images.unsplash.com/photo-1528323273322-d81458248d40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1401&q=80",
		"Papersider",
		"Guilherme Gemballa, Jardim América",
		"Nº 260",
		"Santa Catarina",
		"Rio do Sul",
		"Papéis e Papelão",
	];

	function afterInsertData(err) {
		if (err) {
			return console.log(err);
		}

		console.log("Cadastrado com sucesso!");
		console.log(this);
	}

    // Traz todos os registros do banco e caso não tenha nenhum, adiciona os dois das aulas da NLW
	db.all(`SELECT * FROM places`, (err, rows) => {
		if (err) {
			return console.log(err);
		}

		console.log("Aqui estão os dados:");
		console.log(rows);

		if (rows.length == 0) {
			db.run(sqlInsert, values, afterInsertData);
			db.run(sqlInsert, values2, afterInsertData);
		}
	});

	// db.run(`DELETE FROM places WHERE id = ?`, [1], (err) => {
	// 	if (err) {
	// 		return console.log(err);
	// 	}

	// 	console.log("Registro deletado com sucesso!");
	// });
});

module.exports = db;
