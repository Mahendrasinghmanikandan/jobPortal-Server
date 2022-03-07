module.exports = (sequelize, DataTypes) => {
  const Job = sequelize.define("jobs", {
    role: {
      type: DataTypes.STRING,
    },
    skills: {
      type: DataTypes.STRING,
    },
    experience: {
      type: DataTypes.STRING,
    },
    salary: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
     company_name: {
      type: DataTypes.STRING,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  });
  return Job;
};
