require("dotenv").config();
const express = require("express");
const app = express();
const dbConnection = require("./db/dbConfig");
const port = 5000;
const userRoute = require("./routes/userRoute");
const authMiddleware = require("./middleware/authMiddleware");
const cors = require("cors");
const questionRoute = require("./routes/questionRoute");
const answerRoute = require("./routes/answerRoute");
// user routes middleware
app.use(
	cors({
		origin: "https://evanforum1.netlify.app",
	})
);
app.use(express.json());
app.use("/api/users", userRoute);


//question and routes middleware?
app.use("/api/questions", authMiddleware, questionRoute);
//answer routes and middleware?

app.use("/api/answer", authMiddleware, answerRoute);

async function testDb() {
	try {
		const result = await dbConnection.execute("select 'test' ");
		console.log(result);
		app.listen(port);
		console.log(`Server is running on port ${port}`);
	} catch (err) {
		console.log(err.message);
	}
}

testDb();
