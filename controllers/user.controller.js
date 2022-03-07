const db = require("../models/index");
const {uploadHelper} = require("../helper/upload-helper");
const { user } = db;

const createUser = (req, res) => {
  user
    .create(req.body)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

const getUser = (req, res) => {
  user
    .findAll()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

const authUser = (req, res) => {
  const { email, password } = req.body;
  user
    .findOne({ where: { email: email, password: password } })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

const updateProfileUser = async(req, res) => {
  user
    .update(req.body, { where: { id: req.body.id } })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
};

const findOneProfileUser = (req, res) => {    
  user
    .findOne({ where: { id: req.params.id } })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
};

const findAllUsers = (req, res) => {    
  user
    .findAll({ where: { status: req.params.status } })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
};

module.exports = {
  createUser,
  getUser,
  authUser,
  updateProfileUser,
  findOneProfileUser,
  findAllUsers,
};
