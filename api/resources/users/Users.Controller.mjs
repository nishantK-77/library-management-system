import { ResponseBody } from '@am92/express-utils'
import UsersModel from './Users.Model.mjs'

const UsersController = {
  create,
  search,
  replaceAll,
  updateName,
  deleteById,
  login
}

export default UsersController

async function create (request, response, next) {
  const { body } = request
  const data = await UsersModel.create(body)
  const responseBody = new ResponseBody(200, 'User Created Successfully', data)
  response.body = responseBody
  process.nextTick(next)
}

async function search (request, response, next) {
  const { body } = request
  const data = await UsersModel.search(body)
  const responseBody = new ResponseBody(200, 'Users Fetched Successfully', data)
  response.body = responseBody
  process.nextTick(next)
}

async function replaceAll (request, response, next) {
  const { body = [] } = request
  const data = await UsersModel.replaceAll(body)
  const responseBody = new ResponseBody(200, 'User Replaced Successfully', data)
  response.body = responseBody
  process.nextTick(next)
}

async function updateName (request, response, next) {
  const { body = [] } = request
  const data = await UsersModel.updateName(body)
  const responseBody = new ResponseBody(200, 'User Names Updated Successfully', data)
  response.body = responseBody
  process.nextTick(next)
}

async function deleteById (request, response, next) {
  const { body = [] } = request
  const data = await UsersModel.deleteById(body)
  const responseBody = new ResponseBody(200, 'User Deleted Successfully', data)
  response.body = responseBody
  process.nextTick(next)
}

async function login (request, response, next) {
  const { body = [] } = request;

  if(!body.email || !body.password) {
    const responseBody = new ResponseBody(400, 'Email and password are required', {});
    response.body = responseBody
  } else {

    const data = await UsersModel.search({ query: { email: body.email } });
    if(data.documents && data.documents.length > 0 && data.documents[0].password == body.password){
      const responseBody = new ResponseBody(200, 'User Login Successful', data);
      response.body = responseBody
    } else {
      const responseBody = new ResponseBody(400, 'Bad credentials', {});
      response.body = responseBody
    }
  }
  process.nextTick(next)
}