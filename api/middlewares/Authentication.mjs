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
      request.user = result;
      process.nextTick(next)
    }
  })
}

async function isAdmin (request, response, next) {
  if (!request.user || request.user.type != 1) {
    const error = { 
      statusCode: 403,
      message: 'You are not authorised to perform this action',
      data: { },
      error: 'Unauthorised',
      errorCode: '403'
    }
    return next(error);
  }
  next();
}


const AuthMiddleware = {
  isAuthenticated,
  isAdmin
}

export default AuthMiddleware