module.exports = (sequelize, DataTypes) => {
  const Skills = sequelize.define("Skills", {
    ref_id: {
      type: DataTypes.INTEGER,
    },
    value: {
      type: DataTypes.STRING,
    },
  });
  return Skills;
};
