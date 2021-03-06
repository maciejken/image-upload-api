const { Tables } = require('../enum');

module.exports = function ExperienceModel(db, Sequelize) {
  const Experience = db.define(Tables.Experience, {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    type: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    startDate: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    endDate: {
      type: Sequelize.STRING,
      allowNull: true,
    }, 
  });

  return Experience;
};