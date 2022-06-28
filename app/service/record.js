/*
 * @Author: xiaowuyaya
 * @Date: 2022-06-28 22:08:57
 * @LastEditors: xiaowuyaya 282143356@qq.com
 * @LastEditTime: 2022-06-28 23:52:54
 * @FilePath: \poker-score-record-server\app\service\record.js
 * @Description: 战绩相关业务
 * 
 * Copyright (c) 2022 by xiaowuyaya 282143356@qq.com, All Rights Reserved. 
 */


const BaseService = require('../core/base_service')

class RecordService extends BaseService {

  /**
   * 获取简要战绩数据
   * @param {*} openid 
   */
  async getRecordData (openid) {
    const { app } = this

    const sql1 = `select count(*) as total from t_record r, t_user u where r.user_id = u.user_id and u.openid = '${openid}'`
    const sql2 = `select count(*) as win from t_record r, t_user u where r.user_id = u.user_id and r.isWin = 1 and u.openid = '${openid}'`

    const sql1Res = await app.model.query(sql1, { type: 'SELECT' })
    const sql2Res = await app.model.query(sql2, { type: 'SELECT' })

    return {
      totalNum: sql1Res[0].total,
      winNum: sql2Res[0].win,
      winRate: ((sql2Res[0].win / sql1Res[0].total) * 100).toFixed(2)
    }
  }

  /**
   * 获取对局数据详情
   * @param {*} openid 
   */
  async getRecordDataDetail (openid) {
    const { app } = this
    const sql = `select  r.room_no, r.isWin, r.score, r.players, r.create_time from t_record r, t_user u where r.user_id = u.user_id and u.openid = '${openid}'`
    const sqlRes = app.model.query(sql, { type: 'SELECT' })

    return sqlRes
  }
}

module.exports = RecordService