const express = require("express");

const router = express.Router();

const Jobs = require("../controllers/jobs.controller");

router.get("/:id", Jobs.getJob);
router.post("/create", Jobs.createJob);
router.post("/update", Jobs.updateJob);
router.get("/candidate/jobs/:id/:location/:role/:exp/:stype/:amnt", Jobs.filterJob);
router.get("/resume-test/getquestions", Jobs.filterQuestions);

module.exports = router;
