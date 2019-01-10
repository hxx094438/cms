import bodyParser from 'koa-bodyparser'
import logger from 'koa-logger'
import onerror from 'koa-onerror'
import session from 'koa-session'


export const addBodyParser = app => {
  app.use(bodyParser())
}

export const addLogger = app => {
  app.use(logger())
}

export const addError = app => {



  onerror(app, {
    json (err) {
      Object.keys(err).reduce((body, key) => {
        body[key] = err[key]
        return body
      }, this.body = {})
      this.body.error = err.name
    }
  })
}

export const addSession = app => {
  app.keys = ['imooc-trailer']

  const CONFIG = {
    key: 'koa:sess', /** (string) cookie key (default is koa:sess) */
    /** (number || 'session') maxAge in ms (default is 1 days) */
    /** 'session' will result in a cookie that expires when session/browser is closed */
    /** Warning: If a session cookie is stolen, this cookie will never expire */
    maxAge: 86400000,
    overwrite: true, /** (boolean) can overwrite or not (default true) */
    httpOnly: false, /** (boolean) httpOnly or not (default true) */
    signed: true, /** (boolean) signed or not (default true) */
    rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. default is false **/
    renew: false, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/

  }
  app.use(session(CONFIG, app))
}