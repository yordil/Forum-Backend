const mysql2 = require("mysql2");


const dbConnection = mysql2.createPool({
	user: process.env.DB_USER,
	database: process.env.DB_DATABASE,
	password: process.env.DB_PASSWORD,
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	connectionLimit: 10,
});

// dbConnection.execute("select 'test' ", (err, result) => {
// 	if (err) console.log(err.message);
// 	else console.log(result);
// });

module.exports = dbConnection.promise();
 