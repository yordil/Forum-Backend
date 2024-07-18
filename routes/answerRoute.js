const express = require("express");
const router = express.Router();
const {postAnswer} = require("../Controller/answerController")

router.post("/:id" , postAnswer);




module.exports =  router;