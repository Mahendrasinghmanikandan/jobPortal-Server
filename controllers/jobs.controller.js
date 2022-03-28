const db = require("../models/index");
const { isEmpty, get } = require("lodash");
const { sendMail } = require("../helper/upload-helper");
const { jobs, user, applications, Sequelize, Skills } = db;
const readXlsxFile = require("read-excel-file/node");
const { Op } = Sequelize;

const createJob = async (req, res) => {
  jobs
    .create(req.body)
    .then((data) => {
      const formData = req.body.skill.map((res) => {
        return {
          ref_id: data.id,
          value: res,
        };
      });

      Skills.bulkCreate(formData)
        .then(async (data) => {
          const recever_email = await user.findAll({
            where: { role: req.body.role, status: "candidate" },
          });

          const mailContent = {
            content: `<html><body><style>   
</style><table style=" font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;">
  <tr>
  <th style="  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;">Role</th>
  <td style="  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;">${req.body.role}</td>
  </tr>
  <tr>
  <th style="  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;">Experience</th>
  <td style="  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;">${req.body.expFrom} to ${req.body.expTo}</td>
  </tr>
   <tr>
  <th style="  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;">Salary</th>
  <td style="  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;">₹${req.body.salaryFrom} to ₹${req.body.salaryTo} ${
              req.body.salaryType
            }</td>
  </tr>
  <tr>
  <th style="  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;">Company Name</th>
  <td style="  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;">${req.body.company_name}</td>
  </tr>
  <tr>
  <th style="  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;">Job Location</th>
  <td style="  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;">${req.body.jobLocation}</td>
  </tr>
   <tr>
  <th style="  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;">Skills Required</th>
  <td style="  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;">${req.body.skill.map((res) => {
    return res;
  })}</td>
  </tr>
  <tr>
  <th style="  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;">Job Details</th>
  <td style="  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;">${req.body.description}</td>
  </tr>
  <tr>
  <th style="  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;">Job Id</th>
  <td style="  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;">${get(data, "[0].ref_id", "")}</td>
  </tr>
  <br>
  <a href="http://localhost:3000/applyjob" style="cursor:pointer">
  <button style=" background-color: #EA4C89;
  border-radius: 8px;
  border-style: none;
  box-sizing: border-box;
  color: #FFFFFF;
  cursor: pointer;">Explore More</button>
  </a>
  </table></body></html>`,
            sender_email: req.body.company_name,
            recever_email:!isEmpty(recever_email)? recever_email.map((res) => res.email):'dummy@gmail.com',
            heading: req.body.company_name + "posted new Jobs ",
          };
          if (await sendMail(mailContent)) {
            res.status(200).send(data);
          } else {
            res.status(500).send("something went wrong");
          }
        })
        .catch((err) => {
          console.log(err);
          res.status(500).send(err);
        });
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
      include: [{ model: Skills }],
    })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

const updateJob = async (req, res) => {
  const formData = req.body.skill.map((res) => {
    return {
      ref_id: req.body.id,
      value: res,
    };
  });

  Skills.destroy({ where: { ref_id: req.body.id } });

  await jobs
    .update(req.body, { where: { id: req.body.id } })
    .then((data) => {
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

const filterJob = (req, res) => {
  console.log(req.params, "gfyh");
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
      console.log(datas, "gkjhghj");
      const whereClass =
        req.params.location !== "true"
          ? { jobLocation: req.params.location }
          : "";
      const whereClassRole =
        req.params.role !== "true" ? { role: req.params.role } : "";
      const whereClassExperience =
        req.params.exp !== "true" ? { expFrom: req.params.exp } : "";
      const whereClassSalaryType =
        req.params.stype !== "true" ? { salaryType: req.params.stype } : "";
      const whereClassSalaryAmnt =
        req.params.amnt !== "true"
          ? { salaryTo: { [Op.gt]: req.params.amnt } }
          : "";
      const whereClassNotApplicable = !isEmpty(datas) && {
        [Op.not]: {
          id: datas,
        },
      };
      jobs
        .findAll({
          where: {
            ...whereClassNotApplicable,
            ...whereClass,
            ...whereClassRole,
            ...whereClassExperience,
            ...whereClassSalaryType,
            ...whereClassSalaryAmnt,
          },

          order: [["id", "DESC"]],
          include: [
            { model: Skills },
            { model: user, where: { status: "hr" } },
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
const filterQuestions = (req, res) => {
  readXlsxFile("E:/knockout/Job/jobClient/public/test.xlsx")
    .then((rows) => {
      res.status(200).send({ data: rows });
    })
    .catch((err) => {
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
