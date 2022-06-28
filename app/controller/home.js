'use strict';
const BaseController = require('../core/base_controller');


class HomeController extends BaseController {

  async index() {
    const ctx = this.ctx;
    ctx.body = await ctx.model.User.findAll();
  }
}

module.exports = HomeController;
