const express = require("express");
const router = express.Router();
const { allQuestion, postQuestion, singleQuestion } = require("../Controller/questionController");




router.get("/all-questions",  allQuestion)
	
router.post("/post-question" , postQuestion)

router.get("/:id" , singleQuestion)



module.exports = router;
