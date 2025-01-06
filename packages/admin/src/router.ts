import koaRouter from 'koa-router'
import { useState } from 'alemonjs'

// 路由
const router = new koaRouter({
  prefix: '/api'
})

// 路由
router.get('/', async ctx => {
  ctx.body = 'Hello World'
})

// apps开关
router.post('/apps/swich', async ctx => {
  const body = ctx.request.body as {
    name: string
    state: '1' | '0'
  }
  if (!body.name || body.name == '') {
    ctx.body = {
      code: 400,
      message: 'name 不能为空'
    }
    return
  }
  if (body.state !== '1' && body.state !== '0') {
    ctx.body = {
      code: 400,
      message: 'state 只能为 0 或 1'
    }
    return
  }
  const [state, setState] = useState(body.name)
  if (state && body.state != '1') {
    setState(false)
  }
  if (!state && body.state == '1') {
    setState(true)
  }
  ctx.body = {
    code: 200,
    message: 'success'
  }
})

export default router
