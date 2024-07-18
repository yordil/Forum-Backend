const dbConnection = require("../db/dbConfig");
const { StatusCodes } = require("http-status-codes");
const { v4: uuid } = require("uuid");

async function postAnswer(req, res) {
	try {
		const { answer } = req.body;
		const questionid = req.params.id;
		const userid = req.user.userid;
		const username = req.user.username
		console.log(username)
		const query =
			"INSERT INTO answers ( userid , questionid , answer , username) VALUES ( ? , ? , ? , ?)";
		await dbConnection.query(query, [userid, questionid, answer , username]);

		return res
			.status(StatusCodes.OK)
			.json({ msg: " Answer Posted successfully" });
	} catch (err) {
		console.log(err);
		return res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.json({ msg: "Internal Server Error" });
	}
}

module.exports = { postAnswer };

