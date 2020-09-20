var userService = require("../services/user.service");

module.exports = {
  async getUsers(req, res, next) {
    try {
      const { order, page, size } = req.query;
      const users = await userService.getUsers({ order, page, size });
      res.status(200).json(users);      
    } catch (err) {
      next(err);
    }
  },
  async getUser(req, res, next) {
    try {
      const user = await userService.getUser(req.params.id);
      res.status(200).json(user);      
    } catch (err) {
      next(err);
    }
  },
  async createUser(req, res, next) {
    try {
      if (new RegExp(Regex.localAddress).test(req.connection.remoteAddress)) {
        const { email, password } = req.body;
        const user = await userService.createUser(id, { email, password });
        res.status(200).json(user);
      } else {
        throw new CustomError(`creating users remotely is not supported`, 400);
      }
    } catch (err) {
      next(err);
    }
  },
  async updateUser(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await userService.updateUser(id, { email, password });
      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  },
  async removeUser(req, res, next) {
    try {
      const result = await userService.removeUser(req.params.id);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }
};
