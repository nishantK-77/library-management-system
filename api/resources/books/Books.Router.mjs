import { configureRouter } from '@am92/express-utils'
import BooksController from './Books.Controller.mjs'

const {
  create,
  search,
  replaceAll,
  updateName,
  deleteById
} = BooksController

const masterConfig = {
  routerName: 'Books',

  routesConfig: {
    search: {
      method: 'post',
      path: '/search',
      pipeline: [search]
    },
    create: {
      method: 'post',
      path: '/create',
      pipeline: [create]
    },
    replaceAll: {
      method: 'post',
      path: '/replace-all',
      pipeline: [replaceAll]
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
