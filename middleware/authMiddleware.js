//import statuscode
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");

async function authMiddleware(req, res, next) {
	const authHeader = req.headers.authorization;
	if (!authHeader || !authHeader.startsWith("Bearer")) {
		return res
			.status(StatusCodes.UNAUTHORIZED)
			.json({ msg: "Access denied, no token provided" });
	}
    const token  = authHeader.split(" ")[1];


	try {
		const { username, userid } = jwt.verify(token, process.env.JWT_SECRET);
		req.user = { username, userid };
		next();
	} catch (err) {
		return res
			.status(StatusCodes.UNAUTHORIZED)
			.json({ msg: "Authentication failed" });
	}
}

module.exports = authMiddleware;
