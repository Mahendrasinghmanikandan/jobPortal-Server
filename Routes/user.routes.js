const express = require('express');

const router = express.Router();

const Users =require("../controllers/user.controller")

router.post('/create',Users.createUser)
router.get('/',Users.getUser)
router.post('/login',Users.authUser)
router.put('/update',Users.updateProfileUser)
router.get('/find-one/:id',Users.findOneProfileUser)
router.get('/get-candidate/:status',Users.findAllUsers)

module.exports =router;
