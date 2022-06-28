/*
 * @Author: xiaowuyaya
 * @Date: 2022-06-28 12:03:01
 * @LastEditors: xiaowuyaya 282143356@qq.com
 * @LastEditTime: 2022-06-28 12:10:50
 * @FilePath: \poker-score-record-server\app\core\base_controller.js
 * @Description: 对Controller封装返回结果集
 * 
 * Copyright (c) 2022 by xiaowuyaya 282143356@qq.com, All Rights Reserved. 
 */


const { Controller } = require('egg')

class BaseController extends Controller {

  /**
   * 成功
   * @param data
   */
  success (data) {
    this.ctx.body = {
      code: 0,
      data,
      msg: 'SUCCESS',
    }
  }

  /**
   * 失败
   * @param msg
   * @param data
   */
  fail (msg, data) {
    this.ctx.body = {
      code: 1,
      data: data || null,
      msg: msg || 'FAIL',
    }
  }

  /**
   * 未找到
   * @param msg
   */
  notFound (msg) {
    msg = msg || 'NOT FOUND'
    this.ctx.throw(404, msg)
  }
}

module.exports = BaseController