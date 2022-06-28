/*
 * @Author: xiaowuyaya
 * @Date: 2022-06-28 12:03:01
 * @LastEditors: xiaowuyaya 282143356@qq.com
 * @LastEditTime: 2022-06-28 17:05:39
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
   * @return jwt
   */
  async authLogin (nick_name, avatar_url, province, city, gender, openid) {

    const { ctx, app } = this

    // 判断用户是否存在
    const userList = await ctx.model.User.findAll({
      where: { openid }
    })


    if (userList.length !== 0) {
      // 更新last_login
      await ctx.model.User.update({ last_login: new Date() }, { where: { openid } })

    } else {
      // 用户信息入库
      await ctx.model.User.create({
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

    // 签发jwt
    const token = app.jwt.sign({
      nick_name,
      openid,
    }, app.config.jwt.secret)

    return token

  }

  /**
   * 根据用户id查找用户信息
   * @param {*} userId 
   * @returns 
   */
  async findUserById (userId) {
    const { ctx, app } = this
    const result = await app.model.User.findByPk(userId)
    return result
  }

}

module.exports = UserService
