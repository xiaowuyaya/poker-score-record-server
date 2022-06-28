/*
 * @Author: xiaowuyaya
 * @Date: 2022-06-28 12:03:01
 * @LastEditors: xiaowuyaya 282143356@qq.com
 * @LastEditTime: 2022-06-28 12:32:29
 * @FilePath: \poker-score-record-server\app\service\user.js
 * @Description: 用户相关业务
 * 
 * Copyright (c) 2022 by xiaowuyaya 282143356@qq.com, All Rights Reserved. 
 */


const BaseService = require('../core/base_service')
const WXBizDataCrypt = require('../utils/WXBizDataCrypt')

class UserService extends BaseService {

  /**
   * 用户登入
   * @param {*} nick_name 
   * @param {*} avatar_url 
   * @param {*} province 
   * @param {*} city 
   * @param {*} gender 
   * @param {*} openid 
   */
  async authLogin (nick_name, avatar_url, province, city, gender, openid) {
    // 判断用户是否存在
    const userList = await this.ctx.model["user"].findAll({
      where: { openid }
    })

    if (userList.length !== 0) {
      // 用户已存在续签jwt & 更新last_login
      // TODO: 

    } else {
      // 用户信息入库
      const r = await this.ctx.model["user"].create({
        nick_name,
        avatar_url,
        province,
        city,
        gender,
        openid,
        create_time: new Date,
        last_login: new Date()
      })
    }
  }

}

module.exports = UserService
