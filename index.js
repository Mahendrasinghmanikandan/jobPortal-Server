const express = require("express");
const fs = require("fs");
const db = require("./models/index");
const cors = require("cors");
require("dotenv").config();
const app = express();
const pdf = require("pdf-parse");
const fileupload = require("express-fileupload");
const bodyParser = require("body-parser");

const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

const Student = require("./Routes/Student.routers");
const Users = require("./Routes/user.routes");
const Jobs = require("./Routes/Jobs.routes");
const Applications = require("./Routes/applications.routes");

app.use("/students", Student);
app.use("/users", Users);
app.use("/jobs", Jobs);
app.use("/application", Applications);
app.use(fileupload());
app.use(express.static("files"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/users/upload/resume", (req, res) => {
  const newpath = "E:/knockout/Job/jobClient/public/uploads/";
  const file = req.files.file;
  const filename = file.name;

  if (fs.existsSync(`${newpath}${filename}`)) {
    return res.status(500).send({ message: "change file name" });
  } else {
    file.mv(`${newpath}${filename}`, (err) => {
      if (err) {
        return res.status(500).send({ message: "File upload failed" });
      }

      if (file.mimetype === "application/pdf") {
        let dataBuffer = fs.readFileSync(`${newpath}${filename}`);

        pdf(dataBuffer)
          .then(function (data) {
            return res.status(200).send({
              data: {
                file_name: filename,
                file_path: `${newpath}${filename}`,
                content_length: data.text.length,
                page_count: data.numpages,
              },
            });
          })
          .catch(function (error) {
            return res
              .status(500)
              .send({ message: error || "File upload failed" });
          });
      } else {
        return res.status(200).send({
          data: {
            file_name: filename,
            file_path: `${newpath}${filename}`,
          },
        });
      }
    });
  }
});

db.sequelize
  .sync({ alter: false })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server started ${PORT}`);
    });
  })
  .catch((err) => {
    console.error(err);
  });
