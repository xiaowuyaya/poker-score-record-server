const { Controller } = require('egg')

/**
 * 统一处理返回结果
 */
class BaseController extends Controller {

  /**
   * 成功
   * @param data
   */
  success(data) {
    this.ctx.body = {
      code: 0,
      data,
      msg: 'SUCCESS',
    };
  }

  /**
   * 失败
   * @param msg
   * @param data
   */
  fail(msg, data) {
    this.ctx.body = {
      code: 1,
      data,
      msg: msg || 'FAIL',
    };
  }

  /**
   * 未找到
   * @param msg
   */
  notFound(msg) {
    msg = msg || 'NOT FOUND';
    this.ctx.throw(404, msg);
  }
}

module.exports = BaseController