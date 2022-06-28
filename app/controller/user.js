/**
 * user controller
 * @Author: xiaowuyaya
 * @Date: 2022-06-28
 * @Project: poker-score-record-server
 */
const BaseController = require('../core/base_controller');
const WXBizDataCrypt = require('../utils/WXBizDataCrypt');

class UserController extends BaseController {

  /**
   * 用户授权店登入
   * @return {Promise<void>}
   */
  async authLogin() {
    const { code, encryptedData, iv, signature } = this.ctx.request.body;

	  // 获取openId
	  const resp = await this.ctx.curl('https://api.weixin.qq.com/sns/jscode2session', {
		  data: {
			  appid: this.config.appid,
			  secret: this.config.appSecret,
			  js_code: code,
			  grant_typr: 'authorization_code',
		  },
		  dataType: 'json',
	  });
	  if (resp.data.errmsg) this.fail(`login fail: ${resp.data.errmsg}`);

	  // 解密用户信息
	  const pc = new WXBizDataCrypt(this.config.appid, resp.data.session_key); // 生成解密钥匙
	  const encodeData = pc.decryptData(encryptedData, iv); // 获取解密数据

    // 判断用户是否存在

  }

}

module.exports = UserController;
