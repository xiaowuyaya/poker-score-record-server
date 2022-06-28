/*
 * @Author: xiaowuyaya
 * @Date: 2022-06-28 21:40:42
 * @LastEditors: xiaowuyaya 282143356@qq.com
 * @LastEditTime: 2022-06-28 23:45:14
 * @FilePath: \poker-score-record-server\app\controller\record.js
 * @Description: 战绩记录相关控制器
 * 
 * Copyright (c) 2022 by xiaowuyaya 282143356@qq.com, All Rights Reserved. 
 */
const BaseController = require('../core/base_controller')

class RecordController extends BaseController {

  /**
   * 获取对局数据
   */
  async getRecordData () {
    const { ctx, service } = this
    try {
      const openid = ctx.state.user.openid
      const result = await service.record.getRecordData(openid)
      this.success(result)
    } catch (err) {
      this.fail(JSON.stringify(err))
    }
  }

  /**
   * 获取对局数据详情
   */
  async getRecordDataDetail () {
    const { ctx, service } = this
    try {
      const openid = ctx.state.user.openid
      const result = await service.record.getRecordDataDetail(openid)
      this.success(result)
    } catch (err) {
      this.fail(JSON.stringify(err))
    }
  }

}

module.exports = RecordController