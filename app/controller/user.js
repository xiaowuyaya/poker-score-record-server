/*
 * @Author: xiaowuyaya
 * @Date: 2022-06-28 12:03:01
 * @LastEditors: xiaowuyaya 282143356@qq.com
 * @LastEditTime: 2022-06-28 23:42:46
 * @FilePath: \poker-score-record-server\app\controller\user.js
 * @Description: 用户相关控制器
 * 
 * Copyright (c) 2022 by xiaowuyaya 282143356@qq.com, All Rights Reserved. 
 */

const BaseController = require('../core/base_controller')
const WXBizDataCrypt = require('../utils/WXBizDataCrypt')

class UserController extends BaseController {

	/**
	 * 用户授权登入
	 * @return {Promise<void>}
	 */
	async authLogin () {

		const { ctx, config, service } = this

		try {
			const { code, encryptedData, iv, signature } = ctx.request.body

			// 获取openId
			const resp = await ctx.curl('https://api.weixin.qq.com/sns/jscode2session', {
				data: {
					appid: config.appid,
					secret: config.appSecret,
					js_code: code,
					grant_typr: 'authorization_code',
				},
				dataType: 'json',
			})
			if (resp.data.errmsg) this.fail(`login fail: ${resp.data.errmsg}`)

			// 解密用户信息
			const pc = new WXBizDataCrypt(config.appid, resp.data.session_key) // 生成解密钥匙
			const encodeData = pc.decryptData(encryptedData, iv) // 获取解密数据

			// 用户信息入库
			const jwtToken = await service.user.authLogin(encodeData.nickName, encodeData.avatarUrl, encodeData.province, encodeData.city, encodeData.gender, resp.data.openid)

			const result = {
				token: jwtToken,
				userInfo: {
					nickName: encodeData.nickName,
					avatarUrl: encodeData.avatarUrl,
					province: encodeData.province,
					city: encodeData.city,
					gender: encodeData.gender
				}
			}

			this.success(result)

		} catch (err) {
			this.fail(JSON.stringify(err))
		}
	}

	/**
	 * 根据用户id查找用户信息
	 */
	async findUserById () {
		const { ctx, app, service } = this
		try {
			const { userId } = ctx.request.body
			const result = await service.user.findUserById(userId)
			this.success(result)
		} catch (err) {
			this.fail(JSON.stringify(err))
		}
	}

}

module.exports = UserController
