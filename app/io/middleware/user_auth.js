/*
 * @Author: xiaowuyaya
 * @Date: 2022-06-29 03:06:09
 * @LastEditors: xiaowuyaya 282143356@qq.com
 * @LastEditTime: 2022-06-29 03:30:38
 * @FilePath: \poker-score-record-server\app\io\middleware\user_auth.js
 * @Description: 
 * 
 * Copyright (c) 2022 by xiaowuyaya 282143356@qq.com, All Rights Reserved. 
 */
const PREFIX = 'ROOM'

module.exports = () => {
  return async (ctx, next) => {
    const { app, socket, logger } = ctx
    const id = socket.id
    const nsp = app.io.of('/')
    const query = socket.handshake.query

    // 用户信息
    const { room, userId } = query
    const rooms = [room]
    socket.id = userId

    // 检查房间是否存在
    const isRoomExist = await app.redis.get(`ROOM_${room}`)
    if (isRoomExist) {
      // 加入房间
      socket.join(room, () => {
        nsp.to(room).emit('room', {
          code: 0,
          msg: '用户加入房间',
          data: socket.id
        })

        // 更新用户列表
        const userListData = {
          code: 0,
          data: socket.adapter.rooms[room]
        }
        socket.emit('user_list', userListData)
        nsp.to(room).emit('user_list', userListData)
      })

    } else {
      nsp.to(room).emit('room', {
        code: 0,
        data: '',
        msg: `房间:${room}不存在`
      })
    }

    // 检查是否存在当前房间的账单
    let bill = await app.redis.get(`BILL_${room}`)

    if (!bill) {
      // 创建该房间的账单
      let users = socket.adapter.rooms[room].sockets
      for (i in users) users[i] = 0
      users = { ...users, tea: 0 }
      await app.redis.set(`BILL_${room}`, JSON.stringify(users))
    } else {
      bill = JSON.stringify(bill)
      // 当前账单是否存在自己的数据
      if (!bill[userId]) bill[userId] = 0
      await app.redis.set(`BILL_${room}`, JSON.stringify(bill))
    }

    // 读取最新的账单分发给所有人
    let NEW_BILL = await app.redis.get(`BILL_${room}`)
    const newBillData = {
      code: 0,
      data: JSON.parse(NEW_BILL)
    }
    socket.emit('bill', newBillData)
    nsp.to(room).emit('bill', newBillData)

    socket.on('disconnect', () => {
      nsp.to(room).emit("user_leave", { code: 200, data: socket.adapter.rooms[room] })
      nsp.to(room).emit("info", { code: 200, msg: "用户断开连接", data: socket.id })
    })

    await next()

  }
}