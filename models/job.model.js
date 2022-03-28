module.exports = (sequelize, DataTypes) => {
  const Job = sequelize.define("jobs", {
    role: {
      type: DataTypes.STRING,
    },
    skills: {
      type: DataTypes.STRING,
    },
    expFrom: {
      type: DataTypes.STRING,
    },
     expTo: {
      type: DataTypes.STRING,
    },
    salaryFrom: {
      type: DataTypes.FLOAT,
    },
    salaryTo: {
      type: DataTypes.FLOAT,
    },
    description: {
      type: DataTypes.STRING,
    },
     company_name: {
      type: DataTypes.STRING,
    },
      salaryType: {
      type: DataTypes.STRING,
    },
       testType: {
      type: DataTypes.STRING,
    },
       jobLocation: {
      type: DataTypes.STRING,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  });
  return Job;
};
