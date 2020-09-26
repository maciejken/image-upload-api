const { Image } = require('../model');
const buildQuery = require('../utils/build-query');

module.exports = {
  getImages({ order, page, size }) {
    const query = buildQuery({ order, page, size });
    return Image.findAll(query);
  },
  getImage(filename) {
    return Image.findByPk(filename);
  },
  createImage(value) {
    return Image.create(value);
  },
  removeImage(filename) {
    return Image.destroy({ where: { filename }});
  },
  async updateImage(filename, value) {
    const image = await Image.findByPk(filename);
    return image && image.update(value);
  },
};