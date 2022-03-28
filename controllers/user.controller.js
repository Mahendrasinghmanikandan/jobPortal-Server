const db = require("../models/index");
const { uploadHelper } = require("../helper/upload-helper");
const { user, Skills } = db;

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

const updateProfileUser = async (req, res) => {
  const formData =
    req.body.skill.map((res) => {
      return {
        ref_id: req.body.id,
        value: res,
      };
    });
  
  Skills.destroy({where: { ref_id: req.body.id } })
   
  await user
    .update(req.body, { where: { id: req.body.id } })
    .then(() => {
      Skills.bulkCreate(formData)
        .then((data) => {
          res.status(200).send(data);
        })
        .catch((err) => {
          console.log(err);
          res.status(500).send(err);
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
};

const findOneProfileUser = (req, res) => {
  console.log(req.params.check,'hgufug');
  const whereClass = req.params.check !== "new" ? {
    where: { id: req.params.id },
    include: [ { model: Skills, where: { ref_id: req.params.id } } ],
  }:{where: { id: req.params.id },};
  user
    .findOne(whereClass)
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
