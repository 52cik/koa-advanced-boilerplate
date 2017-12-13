const { join } = require('path');
const mongoose = require('mongoose');
const walkdir = require('../walkdir');
const cfg = require('../../config');

// 连库
function connect(dbHost) {
  mongoose.Promise = global.Promise; // 兼容老库

  mongoose.connect(dbHost, {
    useMongoClient: true,
    promiseLibrary: global.Promise,
  });

  // Mongodb 连接日志 运行日志信息
  mongoose.connection
    .on('connected', () => {
      console.log(`Mongoose connected to ${dbHost}`);
    })
    .on('error', (err) => {
      console.error(`Mongoose connection error: ${err.message}`);
    })
    .on('disconnected', () => {
      console.log('Mongoose disconnected');
    });

  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      console.log('Mongoose disconnected through app termination');
      process.exit(0);
    });
  });
}

// 自动加载模型
function autoLoad(path) {
  if (!cfg.db.mongoose.enable) {
    return false;
  }

  connect(cfg.db.mongoose.connect); // 连库

  walkdir(join(cfg.appPath, 'models'), /Model\.js$/)
    .forEach(m => require(m)); // eslint-disable-line

  walkdir(join(path, 'models'), /Model\.js$/)
    .forEach(m => require(m)); // eslint-disable-line

  return true;
}

module.exports = autoLoad;
