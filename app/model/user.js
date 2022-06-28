/*
 * @Author: xiaowuyaya
 * @Date: 2022-06-28 12:03:01
 * @LastEditors: xiaowuyaya 282143356@qq.com
 * @LastEditTime: 2022-06-28 12:11:58
 * @FilePath: \poker-score-record-server\app\model\user.js
 * @Description: 用户表实体类
 * 
 * Copyright (c) 2022 by xiaowuyaya 282143356@qq.com, All Rights Reserved. 
 */

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize

  const User = app.model.define('user', {
    user_id: { type: INTEGER, primaryKey: true },
    nick_name: { type: STRING },
    avatar_url: { type: STRING },
    province: { type: STRING },
    city: { type: STRING },
    gender: { type: INTEGER },
    openid: { type: STRING },
    create_time: { type: DATE },
    last_login: { type: DATE },
  }, {
    tableName: 't_user',
    timestamps: false,
  })

  return User
}
