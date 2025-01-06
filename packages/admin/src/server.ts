import koa from 'koa'
import koaStatic from 'koa-static'
import router from './router'
export const server = () => {
  // 挂静态资源。 public
  const app = new koa()
  app.use(koaStatic(process.cwd() + '/public'))
  app.use(router.routes())
  app.use(router.allowedMethods())
  const port = 17137
  app.listen(port, () => {
    console.info('服务启动')
    console.info(`http://localhost:${port}`)
  })
}
