/*
 * @Author: xiaowuyaya
 * @Date: 2022-06-28 21:29:32
 * @LastEditors: xiaowuyaya 282143356@qq.com
 * @LastEditTime: 2022-06-28 21:40:10
 * @FilePath: \poker-score-record-server\app\model\record.js
 * @Description: 对局记录
 * 
 * Copyright (c) 2022 by xiaowuyaya 282143356@qq.com, All Rights Reserved. 
 */

module.exports = app => {
  const { STRING, INTEGER, DATE, DOUBLE } = app.Sequelize

  const Record = app.model.define('record', {
    record_id: { type: INTEGER, primaryKey: true },
    user_id: { type: INTEGER },
    room_no: { type: INTEGER },
    isWin: { type: INTEGER },
    score: { type: DOUBLE },
    players: { type: STRING },
    create_time: { type: DATE },
  }, {
    tableName: 't_record',
    timestamps: false,
  })

  return Record
}
