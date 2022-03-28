module.exports = (sequelize, DataTypes) => {
  const Applications = sequelize.define("applications", {
    Jobid: {
      type: DataTypes.STRING,
    },
    user_id: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.STRING,
    },
    resume_mark: {
      type: DataTypes.FLOAT,
    },
     testResults: {
      type: DataTypes.INTEGER,
    },
  });
  return Applications;
};
