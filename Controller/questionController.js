const dbConnection = require("../db/dbConfig");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const { StatusCodes } = require("http-status-codes");

async function allQuestion(req, res) {
	const query =
		"SELECT questions.id , questions.userid,  users.username, questionid, title FROM questions JOIN users ON questions.userid = users.userid";
	const [result] = await dbConnection.query(query);

	return res.status(StatusCodes.OK).send(result);
}

async function postQuestion(req, res) {
	const { title, question } = req.body;

	const userid = req.user.userid;
	const username = req.user.username

	const unique = uuidv4();
	await dbConnection.query(
		"INSERT INTO questions (questionid , userid , title , description , username) VALUES ( ? , ? , ? , ? , ?)",
		[unique, userid, title, question , username]
	);

	return res
		.status(StatusCodes.OK)
		.json({ msg: "Question posted successfully" });
}

async function singleQuestion(req, res) {
	try {
		const id = req.params.id;
		const questionQuery =
			"SELECT title, description FROM questions WHERE questionid = ?";
		const answerQuery =
			"SELECT answer, username FROM answers WHERE questionid = ?";

		const [questionRes] = await dbConnection.query(questionQuery, [id]);
		const [ansResult] = await dbConnection.query(answerQuery, [id]);

		const result = {
			question: questionRes,
			answers: ansResult,
		};

		return res.status(StatusCodes.OK).send(result);
	} catch (err) {
		console.error(err);
		return res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.json({ msg: "Internal server Error" });
	}
}

module.exports = { allQuestion, postQuestion, singleQuestion };
