import { defineChildren } from 'alemonjs'
export default defineChildren(() => ({
  onCreated() {
    console.info('管理器启动')
  }
}))
