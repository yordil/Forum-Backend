const mysql2 = require("mysql2");


const dbConnection = mysql2.createPool({
	user: process.env.DB_USER,
	database: process.env.DB_DATABASE,
	password: process.env.DB_PASSWORD,
	host: "localhost",
	connectionLimit: 10,
});

// dbConnection.execute("select 'test' ", (err, result) => {
// 	if (err) console.log(err.message);
// 	else console.log(result);
// });

module.exports = dbConnection.promise();
 