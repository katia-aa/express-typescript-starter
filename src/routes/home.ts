import express, { NextFunction, Response, Request } from 'express'

const router = express.Router()

/* GET home page. */
router.get(
  '/',
  function (_request: Request, response: Response, _next: NextFunction) {
    const args = { title: 'Express' }
    response.render('index', args)
  }
)

export default router
