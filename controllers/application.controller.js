const db = require("../models/index");
const { sendMail } = require("../helper/upload-helper");
const { jobs, user, applications, Sequelize, Skills } = db;
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

const applyeJobs = async (req, res) => {
  if (req.body.testResults) {
    const mailContent = {
      content: `
      <table style=" font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;">
      <tr>
       <th style="  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;">Job Id</th>
      <td style="  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;">${req.body.Jobid}</td>
      </tr>
      <tr>
       <th style="  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;">Candidate Id</th>
      <td style="  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;">${req.body.candidate_id}</td>
      </tr>
      </table>
       <br>
  <a href="http://localhost:3000/createjob" style="cursor:pointer">
  <button style=" background-color: #EA4C89;
  border-radius: 8px;
  border-style: none;
  box-sizing: border-box;
  color: #FFFFFF;
  cursor: pointer;">Explore More</button>
  </a>
      `,
      sender_email: req.body.sender_email,
      recever_email: req.body.recever_email,
      heading: req.body.heading,
    };
    if (await sendMail(mailContent)) {
      applications
        .create(req.body)
        .then((data) => {
          res.status(200).send(data);
        })
        .catch((err) => {
          res.status(500).send(err);
        });
    } else {
      res.status(500).send("something went wrong");
    }
  } else {
    applications
      .create(req.body)
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  }
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
            { model: Skills },
            {
              model: applications,
              where: { user_id: req.params.id, testResults: 1 },
            },
          ],
        })
        .then((data) => {
          res.status(200).send(data);
        })
        .catch((err) => {
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
        testResults: 1,
      },
      order: [["resume_mark", "DESC"]],
      include: [
        {
          model: user,
          include: [{ model: Skills }],
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
  const mailContent = {
    content: `
      <table style=" font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;">
      <tr>
       <th style="  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;">Job Id</th>
      <td style="  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;">${req.body.job_id}</td>
      </tr>    
      <br>
      <h1 style="color:${req.body.textColor}">${req.body.content}</h1>
      </table>
       <br>
  <a href="http://localhost:3000/appliedjob" style="cursor:pointer">
  <button style=" background-color: #EA4C89;
  border-radius: 8px;
  border-style: none;
  box-sizing: border-box;
  color: #FFFFFF;
  cursor: pointer;">Explore More</button>
  </a>
      `,
    sender_email: req.body.sender_email,
    recever_email: req.body.recever_email,
    heading: req.body.heading,
  };
  if (await sendMail(mailContent)) {
    applications
      .update(req.body, { where: { id: req.body.id } })
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  } else {
    res.status(500).send("something went wrong");
  }
};

module.exports = {
  getApplyedJobs,
  applyeJobs,
  appliedJobsCandidate,
  getAllJobs,
  updateStatusJobs,
};
