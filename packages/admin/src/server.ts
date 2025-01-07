import koa from 'koa'
import koaStatic from 'koa-static'
import router from './router'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
const __dirname = dirname(fileURLToPath(import.meta.url))
const __public = join(__dirname, '../', 'public')
export const server = () => {
  // 挂静态资源。 public
  const app = new koa()
  app.use(koaStatic(__public))
  app.use(router.routes())
  app.use(router.allowedMethods())
  const port = 17137
  app.listen(port, () => {
    console.info('服务启动')
    console.info(`http://localhost:${port}`)
  })
}
