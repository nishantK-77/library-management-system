import BooksRouter from './Books.mjs'
import UsersRouter from './Users.mjs'

const Routes = [
  { path: '/books', router: BooksRouter },
  { path: '/users', router: UsersRouter },
]

export default Routes
