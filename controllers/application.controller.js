const db = require("../models/index");
const {sendMail} = require("../helper/upload-helper");
const { jobs, user, applications, Sequelize } = db;
const { Op } = Sequelize;

const getApplyedJobs = (req, res) => {
  applications
    .findAll()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

const applyeJobs = (req, res) => {
  console.log(req.body);
  applications
    .create(req.body)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

const appliedJobsCandidate = (req, res) => {
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
          where: {
            id: {
              [Op.in]: datas,
            },
          },
          order: [["id", "DESC"]],
          include: [
            { model: user, where: { status: "hr" } },
            { model: applications, where: { user_id: req.params.id } },
          ],
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

const getAllJobs = (req, res) => {
  const { id, hsc, sslc, ug, resume_mark } = req.params;

  applications
    .findAll({
      where: {
        jobId: id,
        resume_mark: resume_mark
          ? {
              [Op.gt]: ~~resume_mark,
            }
          : { [Op.gt]: 0 },
      },
      order: [["resume_mark", "DESC"]],
      include: [
        {
          model: user,
          where: {
            status: "candidate",
            hsc: hsc
              ? {
                  [Op.gt]: ~~hsc,
                }
              : { [Op.gt]: 0 },
            sslc: sslc
              ? {
                  [Op.gt]: ~~sslc,
                }
              : { [Op.gt]: 0 },
            ug: ug
              ? {
                  [Op.gt]: ~~ug,
                }
              : { [Op.gt]: 0 },
          },
        },
      ],
    })
    .then((jobs) => {
      res.status(200).send(jobs);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

const updateStatusJobs = async (req, res) => {
  applications
    .update(req.body, { where: { id: req.body.id } })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
};

module.exports = {
  getApplyedJobs,
  applyeJobs,
  appliedJobsCandidate,
  getAllJobs,
  updateStatusJobs,
};
