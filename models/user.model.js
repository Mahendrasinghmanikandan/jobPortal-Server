module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define("user", {
    name: {
      type: DataTypes.STRING,
    },
    role: {
      type: DataTypes.STRING,
    },
    aboutme: DataTypes.STRING,
    ug: DataTypes.STRING,
    hsc: DataTypes.STRING,
    sslc: DataTypes.STRING,
    address: DataTypes.STRING,
    password: DataTypes.STRING,
    confirm: DataTypes.STRING,
    email: DataTypes.STRING,
    status: DataTypes.STRING,    
    skill: DataTypes.JSON,
    phone: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    resume: DataTypes.STRING,
    profilePic: DataTypes.STRING,
    resume_marks: DataTypes.FLOAT,
    gender: DataTypes.STRING,
    experience: DataTypes.STRING,
  });
  
  return Users;
};
