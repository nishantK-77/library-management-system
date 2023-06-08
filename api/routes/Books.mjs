import Express from 'express'
import { BooksRouter } from '../resources/Books/index.mjs'

const config = {
  routesConfig: {
    create: { enabled: true },
    search: { enabled: true },
    replaceAll: { enabled: true },
    updateName: { enabled: true },
    deleteById: { enabled: true }
  }
}

const Router = new Express.Router()
const booksRouter = new BooksRouter(Router, config)

export default booksRouter
