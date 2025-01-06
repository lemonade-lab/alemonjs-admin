import { server } from './server'
export default defineChildren(() => ({
  onCreated() {
    console.info('管理器启动')
    server()
  }
}))
