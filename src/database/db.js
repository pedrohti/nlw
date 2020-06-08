const sqlite = require("sqlite3").verbose();
const db = new sqlite.Database("./src/database/database.db");

// db.serialize(() => {
// 	db.run(`
// 		CREATE TABLE IF NOT EXISTS places (
// 			id INTEGER PRIMARY KEY AUTOINCREMENT,
// 			image TEXT,
// 			name TEXT,
// 			address TEXT,
// 			address2 TEXT,
// 			state TEXT,
// 			city TEXT,
// 			items TEXT
// 		);
//     `);

// 	const sqlInsert = `INSERT INTO places (image, name, address, address2, state, city, items) VALUES (?, ?, ?, ?, ?, ?, ?);`;
// 	// const values = [
// 	// 	"https://images.unsplash.com/photo-1567393528677-d6adae7d4a0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
// 	// 	"Colectoria",
// 	// 	"Guilherme Gemballa, Jardim América",
// 	// 	"Nº 260",
// 	// 	"Santa Catarina",
// 	// 	"Rio do Sul",
// 	// 	"Resíduos Eletrônicos, Lâmpadas",
// 	// ];

// 	function afterInsertData(err) {
// 		if (err) {
// 			return console.log(err);
// 		}

// 		console.log("Cadastrado com sucesso!");
// 		console.log(this);
// 	}

// 	// db.run(sqlInsert, values, afterInsertData);

// 	db.all(`SELECT * FROM places`, (err, rows) => {
// 		if (err) {
// 			return console.log(err);
// 		}

// 		console.log("Aqui estão os dados");
// 		console.log(rows);
// 	});

// 	// db.run(`DELETE FROM places WHERE id = ?`, [12], (err) => {
// 	// 	if (err) {
// 	// 		return console.log(err);
// 	// 	}

// 	// 	console.log("Registro deletado com sucesso!");
// 	// });
// });

module.exports = db;
