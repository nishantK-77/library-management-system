import { configureRouter } from '@am92/express-utils'
import BooksController from './Books.Controller.mjs'
import AuthMiddleware from '../../middlewares/Authentication.mjs'

const {
  create,
  search,
  replaceAll,
  updateName,
  deleteById
} = BooksController

const { isAuthenticated, isAdmin } = AuthMiddleware;

const masterConfig = {
  routerName: 'Books',

  routesConfig: {
    search: {
      method: 'post',
      path: '/search',
      pipeline: [isAuthenticated, search]
    },
    create: {
      method: 'post',
      path: '/create',
      pipeline: [isAuthenticated, isAdmin, create]
    },
    replaceAll: {
      method: 'post',
      path: '/replace-all',
      pipeline: [isAuthenticated, isAdmin, replaceAll]
    },
    updateName: {
      method: 'post',
      path: '/update-name',
      pipeline: [isAuthenticated, isAdmin, updateName]
    },
    deleteById: {
      method: 'post',
      path: '/delete-by-id',
      pipeline: [isAuthenticated, isAdmin, deleteById]
    }
  }
}

class BooksRouter {
  constructor (Router, customConfig) {
    const resourceRouter = configureRouter(Router, masterConfig, customConfig)
    return resourceRouter
  }
}

export default BooksRouter
