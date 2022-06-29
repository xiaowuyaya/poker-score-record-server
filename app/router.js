/*
 * @Author: xiaowuyaya
 * @Date: 2022-06-28 09:41:53
 * @LastEditors: xiaowuyaya 282143356@qq.com
 * @LastEditTime: 2022-06-30 03:36:35
 * @FilePath: \poker-score-record-server\app\router.js
 * @Description: 
 * 
 * Copyright (c) 2022 by xiaowuyaya 282143356@qq.com, All Rights Reserved. 
 */
'use strict'

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, jwt } = app

  const VERSION = 'v1'

  // 无需验签的路由
  router.post(`/${VERSION}/user/authLogin.do`, controller.user.authLogin)

  // 需要验签的路由
  router.get(`/${VERSION}/user/findUserById.do`, jwt, controller.user.findUserById)

  router.get(`/${VERSION}/record/getRecordData.do`, jwt, controller.record.getRecordData)
  router.get(`/${VERSION}/record/getRecordDataDetail.do`, jwt, controller.record.getRecordDataDetail)

  router.get(`/${VERSION}/game/getRoomShareQRCode.do`, jwt, controller.game.getRoomShareQRCode)
  router.get(`/${VERSION}/game/checkRoom.do`, jwt, controller.game.checkRoom)
  router.get(`/${VERSION}/game/closeRoom.do`, jwt, controller.game.closeRoom)
}
