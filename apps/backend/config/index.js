const { join } = require('path');
const common = require('../../common/config'); // 公共配置

const config = {
  /** 应用根目录 */
  appPath: join(__dirname, '..'),
  /** 端口 */
  port: process.env.PORT || 8100,
};

Object.assign(config, common.loadENV(__dirname));

module.exports = Object.assign({}, common, config);
