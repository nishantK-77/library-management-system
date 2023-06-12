import { ResponseBody } from '@am92/express-utils';
import jwt from 'jsonwebtoken';

async function isAuthenticated (request, response, next) {
  const token = request.headers['token'];
  
  if (!token) {
    const error = { 
      statusCode: 401,
      message: 'Token not provided',
      data: { },
      error: 'token_not_provided',
      errorCode: '401'
    }
    return next(error);

  }
  jwt.verify(token, 'secretkey', function(err, result){
    if(err ){
      const error = { 
        statusCode: 401,
        message: 'Token expired',
        data: { },
        error: 'token_expired',
        errorCode: '401'
      }
      return next(error);

    } else {
      process.nextTick(next)

    }
  })
}

async function isAdmin (request, response, next) {
  const { body } = request
  const data = await BooksModel.search(body)
  const responseBody = new ResponseBody(200, 'Books Searched Successfully', data)
  response.body = responseBody
  process.nextTick(next)
}


const AuthMiddleware = {
  isAuthenticated,
  isAdmin
}

export default AuthMiddleware