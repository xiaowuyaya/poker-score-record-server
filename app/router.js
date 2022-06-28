/*
 * @Author: xiaowuyaya
 * @Date: 2022-06-28 09:41:53
 * @LastEditors: xiaowuyaya 282143356@qq.com
 * @LastEditTime: 2022-06-28 23:43:59
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

  // 无需验签的路由
  router.post('/v1/user/authLogin.do', controller.user.authLogin)

  // 需要验签的路由
  router.get('/v1/user/findUserById.do', jwt, controller.user.findUserById)

  router.get('/v1/record/getRecordData.do', jwt, controller.record.getRecordData)
  router.get('/v1/record/getRecordDataDetail.do', jwt, controller.record.getRecordDataDetail)
}
