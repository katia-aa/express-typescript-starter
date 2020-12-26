import express, { NextFunction, Request, Response } from 'express'

const router = express.Router()

/* GET users listing. */
router.get(
  '/',
  function (_request: Request, response: Response, _next: NextFunction) {
    response.send('Hello World!')
  }
)

export default router
