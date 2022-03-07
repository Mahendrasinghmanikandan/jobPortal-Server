module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define("Student", {
    name: {
      type: DataTypes.STRING,
    },
    age: {
      type: DataTypes.STRING,
    },
    contact: DataTypes.STRING,
  });
  return Student;
};
