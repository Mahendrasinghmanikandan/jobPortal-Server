const express = require('express');

const router = express.Router();

const Applications = require('../controllers/application.controller')


router.get('/', Applications.getApplyedJobs)
router.post('/create', Applications.applyeJobs)
router.put('/update', Applications.updateStatusJobs)
router.get('/candidate/:id', Applications.appliedJobsCandidate)
router.get('/getall/:id/:hsc/:sslc/:ug/:resume_mark', Applications.getAllJobs)

module.exports = router;