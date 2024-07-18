const dbConnection = require("../db/dbConfig");
const bcrypt = require("bcrypt");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");


async function login(req, res) {
	const { email, password } = req.body;
	if (!email || !password) {
		return res.status(StatusCodes.BAD_REQUEST).json("All input is required");
	}

	try {
		const [user] = await dbConnection.query(
			"SELECT username , userid, password FROM users WHERE email = ?",
			[email]
		);
		if (user.length  == 0){
			return res.status(StatusCodes.BAD_REQUEST).json({ error : "User does not exist"});
		}
		 // compare password
		 //returns boolean value
		 const isMatch = await bcrypt.compare(password, user[0].password);

		 if (!isMatch){
			return res.status(StatusCodes.BAD_REQUEST).json({ error : "Invalid credentials"});
		 }

		 // giving token
		 const username = user[0].username;
		 const userid = user[0].userid;
		 const token = jwt.sign({ username, userid }, process.env.JWT_SECRET, {
				expiresIn: "1d",
			});

		 return res.status(StatusCodes.OK).json({ msg : "Login successful" , token , username});
		
		 	 
		

	} catch (err) {
		console.log(err.message);
		return res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.json("Something is wrong with the server");
	}
}

async function register(req, res) {
	const { username, firstname, lastname, email, password } = req.body;
	if (!username || !firstname || !lastname || !email || !password) {
		return res.status(StatusCodes.BAD_REQUEST).json("All input is required");
	}

	try {
		const [user] = await dbConnection.execute(
			"SELECT username , userid FROM users WHERE username = ? or email = ? ",
			[username, email]
		);
		if (user.length > 0) {
			return res
				.status(StatusCodes.BAD_REQUEST)
				.json({ msg: "User already exists" });
		}
		if (password.length < 8) {
			return res
				.status(StatusCodes.BAD_REQUEST)
				.json({ msg: "Password should be at least 6 characters" });
		}
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const query =
			"INSERT INTO users (username, firstname, lastname, email, password) VALUES (?, ?, ?, ?, ?)";
		await dbConnection.execute(query, [
			username,
			firstname,
			lastname,
			email,
			hashedPassword,
		]);
		return res.status(StatusCodes.CREATED).json("User registerd successfully");
	} catch (err) {
		console.log(err.message);
		return res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.json({ msg: "Something is wrong wit" });
	}
}

async function checkUser(req, res) {
	const { username, userid } = req.user;
	const token = req.headers.authorization.split(" ")[1];
	res.status(StatusCodes.OK).json({ msg : "valid user" , username , userid , token});
	
}

module.exports = { login, register, checkUser};
 