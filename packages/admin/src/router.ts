import koaRouter from 'koa-router'
import { getConfig, useState } from 'alemonjs'
// import { fileURLToPath } from 'url'
// import { dirname, join } from 'path'
import { readdirSync } from 'fs'
import { join } from 'path'
import { createRequire } from 'module'
// const __dirname = dirname(fileURLToPath(import.meta.url))
// const __data = join(__dirname, '../', 'data')

const require = createRequire(import.meta.url)

// 路由
const router = new koaRouter({
  prefix: '/api'
})

// 路由
router.get('/', async ctx => {
  ctx.body = 'Hello World'
})

// 获取功能开关
router.get('/funtion/switch', async ctx => {
  ctx.status = 200
  ctx.body = 'ok'
})

// 修改功能开关
router.post('/funtion/switch', async ctx => {
  const body = ctx.request.body as {
    name: string
    state: '1' | '0'
  }
  if (!body.name || body.name == '') {
    ctx.status = 400
    ctx.body = 'name 不能为空'
    return
  }
  if (body.state !== '1' && body.state !== '0') {
    ctx.status = 400
    ctx.body = 'state 只能为 0 或 1'
    return
  }
  const [state, setState] = useState(body.name)
  if (state && body.state != '1') {
    setState(false)
  }
  if (!state && body.state == '1') {
    setState(true)
  }
  ctx.status = 200
  ctx.body = 'ok'
})

// 获取数据
router.get('/config', async ctx => {
  const cfg = getConfig()
  ctx.status = 200
  ctx.body = {
    value: cfg.value,
    package: cfg.package
  }
})

router.get('/node/modules', async ctx => {
  // 得到 node_modules 的列表。去掉.开头的文件夹,去掉@types的文件夹
  const nodeModules = join(process.cwd(), 'node_modules')
  const files = readdirSync(nodeModules).filter(
    file => !/^(@types|\.)/.test(file)
  )
  // .开头的文件夹
  // @types 的文件夹
  ctx.status = 200
  ctx.body = files
})

router.post('/node/modules/package', async ctx => {
  const body = ctx.request.body as {
    names: string[]
  }
  if (!body.names || body.names.length == 0) {
    ctx.status = 400
    ctx.body = 'names 不能为空'
    return
  }
  const packages = body.names.map(name => {
    try {
      return require(join(process.cwd(), 'node_modules', name, 'package.json'))
    } catch (error) {
      return {
        name,
        error: error.message
      }
    }
  })
  ctx.status = 200
  ctx.body = packages
})

export default router
