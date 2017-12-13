/**
 * 全局通用配置
 * 请在子应用中覆盖配置
 */
const fs = require('fs');
const { join } = require('path');
const pkg = require('../../../package');

const { env } = process;

const config = {
  /** 应用名称 */
  name: pkg.name,
  /** 版本 */
  version: pkg.version,
  /** 应用根目录 */
  appPath: join(__dirname, '..'),
  /** 绑定IPv4 */
  hostname: '0.0.0.0',
  /** 端口 */
  port: env.PORT || 8000,

  /** 调试模式 */
  debug: env.NODE_ENV === 'development',

  /** 数据库 */
  db: {
    mongoose: {
      enable: true, // 是否启用数据库
      connect: 'mongodb://127.0.0.1:27017/test',
    },
  },
};

/**
 * 加载环境配置
 *
 * @param {string} path 强制写 __dirname
 */
config.loadENV = (path) => {
  if (env.NODE_ENV !== 'production') {
    const file = join(path, env.NODE_ENV);
    if (fs.existsSync(file)) {
      return require(file); // eslint-disable-line
    }
  }
  return {};
};

Object.assign(config, config.loadENV(__dirname));

module.exports = config;
