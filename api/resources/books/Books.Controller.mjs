import { ResponseBody } from '@am92/express-utils'
import BooksModel from './Books.Model.mjs'

const BooksController = {
  create,
  search,
  replaceAll,
  updateName,
  deleteById
}

export default BooksController

async function create (request, response, next) {
  const { body } = request
  const data = await BooksModel.create(body)
  const responseBody = new ResponseBody(200, 'Books Created Successfully', data)
  response.body = responseBody
  process.nextTick(next)
}

async function search (request, response, next) {
  const { body } = request
  const data = await BooksModel.search(body)
  const responseBody = new ResponseBody(200, 'Books Searched Successfully', data)
  response.body = responseBody
  process.nextTick(next)
}

async function replaceAll (request, response, next) {
  const { body = [] } = request
  const data = await BooksModel.replaceAll(body)
  const responseBody = new ResponseBody(200, 'Books Replaced Successfully', data)
  response.body = responseBody
  process.nextTick(next)
}

async function updateName (request, response, next) {
  const { body = [] } = request
  const data = await BooksModel.updateName(body)
  const responseBody = new ResponseBody(200, 'Books Names Updated Successfully', data)
  response.body = responseBody
  process.nextTick(next)
}

async function deleteById (request, response, next) {
  const { body = [] } = request
  const data = await BooksModel.deleteById(body)
  const responseBody = new ResponseBody(200, 'Book Deleted Successfully', data)
  response.body = responseBody
  process.nextTick(next)
}