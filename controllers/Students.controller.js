const db = require("../models/index");
const { Student } = db;

const createStudents = (req, res) => {
  const formData = {
    name: "mani",
    age: 22,
    contact: 940980973,
  };
  Student.findAll({ where: { name: "mani" } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.error(err);
    });
};

module.exports = {
  createStudents,
};
