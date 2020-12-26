import express, { NextFunction, Response, Request } from 'express'
import createError, { HttpError } from 'http-errors'
import path from 'path'
import cookieParser from 'cookie-parser'
import logger from 'morgan'

import indexRouter from './routes/home'
import usersRouter from './routes/users'

const VIEWS_PATH = path.join(__dirname, 'views')
const PUBLIC_PATH = path.join(__dirname, 'public')

// create express application
const app = express()

// view engine setup
app.set('views', VIEWS_PATH)
app.set('view engine', 'pug')
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(PUBLIC_PATH))

// use routes
app.use('/', indexRouter)
app.use('/users', usersRouter)

// catch 404 and forward to error handler
app.use(function (_request: Request, _response: Response, next: NextFunction) {
  const error = createError(404)
  next(error)
})

// error handler
app.use(function (
  error: HttpError,
  request: Request,
  response: Response,
  _next: NextFunction
) {
  const isDevEnv = request.app.get('env') === 'development'
  const { locals, status, render } = response

  // set locals, only providing error in development
  locals.message = error.message
  locals.error = isDevEnv ? error : {}

  // render the error page
  status(error.status || 500)
  render('error')
})

export default app
