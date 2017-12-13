/**
 * 全局TS类型声明，让 vscode 提示更加精确
 */

import { Model, Document } from 'mongoose';

/**
 * koa ctx 自定义方法
 * @file common/utils/context-model.js
 */
declare module 'koa' {
  interface Context {
    model<T extends Document>(name: string): Model<T>;
  }
}
