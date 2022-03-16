const db = require("../models/index");
const {isEmpty} = require("lodash");
const { jobs, user, applications, Sequelize } = db;
const readXlsxFile = require('read-excel-file/node')
const { Op } = Sequelize;

const createJob = (req, res) => {
  jobs
    .create(req.body)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

const getJob = (req, res) => {
  jobs
    .findAll({
      order: [["id", "DESC"]],
      where: { userId: req.params.id },
    })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

const updateJob = (req, res) => {
  jobs
    .update(req.body, { where: { id: req.body.id } })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
};

const filterJob = (req, res) => {
  applications
    .findAll()
    .then((data) => {
      return data
        .filter((res) => res.user_id === req.params.id)
        .map((res) => {
          return res.Jobid;
        });
    })
    .then((datas) => {
      jobs
        .findAll({
          where: !isEmpty(datas) &&{
            [Op.not]: {
              id: datas ,
            },
          },
          
          order: [["id", "DESC"]],
          include: [{ model: user, where: { status: "hr" } }],
        })
        .then((data) => {
          res.status(200).send(data);
        })
        .catch((err) => {
          console.log(err);
          res.status(500).send(err);
        });
    });
};
const filterQuestions = (req, res) => {
  
  readXlsxFile('E:/knockout/Job/jobClient/public/test.xlsx').then((rows) => {
    res.status(200).send({ data: rows.filter(row => { return row[7] === req.params.role }) });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).send(err);
        });
};
module.exports = {
  createJob,
  getJob,
  updateJob,
  filterJob,
  filterQuestions,
};
