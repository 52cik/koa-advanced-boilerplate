module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps: [
    {
      name: 'app-frontend', // 应用名
      script: 'bin/frontend', // 入口
      cwd: __dirname, // 工作目录
      instances: 1, // 进程数控制，-1使用cpu核心数量
      exec_mode: 'cluster', // 启动模式
      env: {
        NODE_ENV: 'production'
      }
    },
    {
      name: 'app-backend', // 应用名
      script: 'bin/backend', // 入口
      cwd: __dirname, // 工作目录
      instances: 1, // 进程数控制，-1使用cpu核心数量
      exec_mode: 'cluster', // 启动模式
      env: {
        NODE_ENV: 'production'
      }
    }
  ]
};
