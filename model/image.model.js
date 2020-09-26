module.exports = function ImageModel(db, Sequelize) {
  var Image = db.define('image', {
    filename: {
      type: Sequelize.STRING,
      primaryKey: true,
      allowNull: false,
    },
    userId: { // authorId?
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    caption: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    capturedAt: {
      type: Sequelize.DATE,
      allowNull: true,
    },
  });
  return Image;
};
