import Express from 'express'
import { UsersRouter } from '../resources/Users/index.mjs'

const config = {
  routesConfig: {
    create: { enabled: true },
    search: { enabled: true },
    replaceAll: { enabled: true },
    updateName: { enabled: true },
    deleteById: { enabled: true },
    login: { enabled: true }
  }
}

const Router = new Express.Router()
const usersRouter = new UsersRouter(Router, config)

export default usersRouter
