const express = require('express');

const router = express.Router();

const Student =require("../controllers/Students.controller")

router.post('/',Student.createStudents)

module.exports =router;
