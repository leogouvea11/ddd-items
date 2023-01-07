import { injectable, inject } from 'inversify'
import Koa from 'koa'
import cors from '@koa/cors'
import bodyParser from 'koa-bodyparser'
import compress from 'koa-compress'

import { TYPES } from '../../types'
import { ErrorHandler } from './middlewares/error-handler'
import { HTTPRouter } from './router'

export interface IServer {
  start(): void
}

@injectable()
export class Server {
  @inject(TYPES.HTTPRouter) private _router: HTTPRouter

  start(): void {
    const router = this._router.get()

    router.get('/ping', (ctx) => {
      ctx.body = 'OK'
    })

    const app = new Koa()

    app.use(cors())
    app.use(bodyParser())
    app.use(compress())

    app.use(ErrorHandler)

    app.use(router.routes())

    app.on('error', (err) => {
      console.log(err)
    })

    app.listen(3000)
  }
}
