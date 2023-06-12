import { configureRouter } from '@am92/express-utils'
import UsersController from './Users.Controller.mjs'
import AuthMiddleware from '../../middlewares/Authentication.mjs'

const {
  create,
  search,
  replaceAll,
  updateName,
  deleteById,
  login
} = UsersController

const { isAuthenticated, isAdmin } = AuthMiddleware;

const masterConfig = {
  routerName: 'Users',

  routesConfig: {
    search: {
      method: 'post',
      path: '/search',
      pipeline: [isAuthenticated, search]
    },
    create: {
      method: 'post',
      path: '/create',
      pipeline: [create]
    },
    updateName: {
      method: 'post',
      path: '/update-name',
      pipeline: [updateName]
    },
    deleteById: {
      method: 'post',
      path: '/delete-by-id',
      pipeline: [deleteById]
    },
    login: {
      method: 'post',
      path: '/login',
      pipeline: [login]
    }
  }
}

class UsersRouter {
  constructor (Router, customConfig) {
    const resourceRouter = configureRouter(Router, masterConfig, customConfig)
    return resourceRouter
  }
}

export default UsersRouter
