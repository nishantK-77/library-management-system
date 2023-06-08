import _ from 'lodash'
import moment from 'moment'
// import gokuSdk from '@amc/goku-sdk'
import { Model } from '@am92/mongo-odm'
import BooksSchema from './Books.Schema.mjs'
// import Sftp from '../../helpers/Sftp.mjs'

const BooksODM = new Model('Books', BooksSchema)
const { replaceAll } = BooksODM

const BooksModel = {
  create,
  search,
  replaceAll,
  // updateSchemeMaster,
//   updateNav,
//   updateCagr,
//   updateGroup,
//   updateTheme,
  updateName,
  deleteById
}

export default BooksModel

async function search (attrs = {}) {
  const { query = {}, projections = {}, options = {} } = attrs

  const { schemeName = '' } = query
  if (schemeName) {
    query.schemeName = new RegExp(schemeName, 'i')
  }

  const result = await BooksODM.search(query, projections, options)
  const { documents = [] } = result

  if (!documents.length) { return result }

  const schemeCodes = new Set()
  const planCodes = new Set()
  const optionCodes = new Set()

  documents.forEach((document) => {
    const { schemeCode, planCode, optionCode } = document
    schemeCodes.add(schemeCode)
    planCodes.add(planCode)
    optionCodes.add(optionCode)
  })

  return result
}

async function create (attrs = {}) {
  const response = await BooksODM.createOne(attrs);
  return response;
}

async function updateName (attrs = {}) {
  const { query = {}, attributes = { name: ''} } = attrs;
  const response = await BooksODM.updateById(query, attributes);
  return response;
}

async function deleteById (attrs = {}) {
  console.log("line 244 >>>>>>", attrs);
  const { query = {} } = attrs;
  const response = await BooksODM.remove(query);
  return response;
}