/*
 * @Author: xiaowuyaya
 * @Date: 2022-06-28 12:03:01
 * @LastEditors: xiaowuyaya 282143356@qq.com
 * @LastEditTime: 2022-06-28 12:11:26
 * @FilePath: \poker-score-record-server\app\core\base_service.js
 * @Description: 对Service疯转基本的DB方法
 * 
 * Copyright (c) 2022 by xiaowuyaya 282143356@qq.com, All Rights Reserved. 
 */


const Service = require('egg').Service

class BaseService extends Service {
  // 查
  async _findAll (modelName) {
    const { ctx, app } = this
    try {
      return await ctx.model[modelName].findAll()
    } catch (error) {
      return 'server error'
    }
  }

  // 查询数据总数
  async _count (modelName) {
    const { ctx } = this
    try {
      return await ctx.model[modelName].count()
    } catch (error) {
      return 'Server error'
    }
  }

  // 根据ID查询数据
  async _findById (modelName, id) {
    const { ctx } = this
    try {
      const result = await ctx.model[modelName].findByPk(id)
      return result
    } catch (error) {
      return 'Server error'
    }
  }

  // 新增数据
  async _add (modelName, json) {
    const { ctx } = this
    try {
      await ctx.model[modelName].create(json)
      return '新增成功'
    } catch (error) {
      return 'Server error'
    }
  }

  // 编辑数据
  async _edit (modelName, json) {
    const { ctx } = this
    try {
      const result = await ctx.model[modelName].findByPk(json.id)
      if (!result) return false
      await result.update({ ...json })
      return true
    } catch (error) {
      return 'Server error'
    }
  }

  // 删除数据
  async _delete (modelName, key) {
    const { ctx } = this
    try {
      const result = await ctx.model[modelName].findByPk(key)
      if (!result) return false
      await result.destroy()
      return true
    } catch (error) {
      return 'Server error'
    }
  }
}

module.exports = BaseService
