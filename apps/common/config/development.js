module.exports = {
  db: {
    mongoose: {
      enable: true, // 是否启用数据库
      connect: 'mongodb://127.0.0.1:27017/test-dev',
    },
  },
};
