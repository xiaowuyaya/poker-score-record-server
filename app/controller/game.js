/*
 * @Author: xiaowuyaya
 * @Date: 2022-06-30 00:25:13
 * @LastEditors: xiaowuyaya 282143356@qq.com
 * @LastEditTime: 2022-06-30 03:35:43
 * @FilePath: \poker-score-record-server\app\controller\game.js
 * @Description: 游戏相关控制器
 * 
 * Copyright (c) 2022 by xiaowuyaya 282143356@qq.com, All Rights Reserved. 
 */
const BaseController = require('../core/base_controller')

class GameController extends BaseController {

  /**
   * 获取分享房间的二维码
   */
  async getRoomShareQRCode () {
    const { ctx, config } = this
    const { roomNo } = ctx.request.body

    // 获取TOKEN
    const tokenResp = await ctx.curl(`https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${config.appid}&secret=${config.appSecret}`, { dataType: "json" })
    const token = tokenResp.data.access_token

    // 获取QRCode
    const QRCodeResp = await ctx.curl(`https://api.weixin.qq.com/wxa/getwxacode?access_token=${token}`, {
      method: 'POST',
      contentType: 'json', // 通过 contentType 告诉 HttpClient 以 JSON 格式发送
      data: {
        path: "/pages/room/room?roomNo=" + roomNo
      },
      dataType: 'arraybuffer', // 明确告诉 HttpClient 以 JSON 格式处理返回的响应 body
    })

    const QRCode = 'data:image/png;base64,' + Buffer.from(QRCodeResp.data, 'binary').toString('base64') // 编码Base64

    this.success(QRCode)
  }

  /**
   * 创建房间
   */
  async createRoom () {
    const { service } = this

    try {
      while (true) {
        const randomNum = Math.random().toFixed(6).slice(-6)
        const isExist = await service.cache.get(`ROOM_${randomNum}`)

        if (!isExist) {
          await this.service.cache.set(`ROOM_${randomNum}`, 1)
          return this.success(r_num, "房间创建成功")
        }
      }
    } catch (err) {
      return this.fail(String(err))
    }
  }

  /**
   * 检查房间是否存在
   */
  async checkRoom () {
    const { ctx, service } = this

    try {
      const { roomNo } = ctx.request.body
      const isExist = await service.cache.get(`ROOM_${roomNo}`)

      return this.success(isExist)
    } catch (err) {
      return this.fail(String(err))
    }
  }

  /**
   * 关闭房间
   */
  async closeRoom () {
    try {
      const { ctx, service } = this
      const { roomNo } = ctx.request.body

      const result = await service.cache.del(`ROOM_${roomNo}`)
      return this.success(result)
    } catch (err) {
      return this.fail(String(err))
    }
  }


}

module.exports = GameController