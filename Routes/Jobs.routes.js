const express = require("express");

const router = express.Router();

const Jobs = require("../controllers/jobs.controller");

router.get("/:id", Jobs.getJob);
router.post("/create", Jobs.createJob);
router.post("/update", Jobs.updateJob);
router.get("/candidate/jobs/:id", Jobs.filterJob);

module.exports = router;
