import _ from 'lodash'
import moment from 'moment'
// import gokuSdk from '@amc/goku-sdk'
import { Model } from '@am92/mongo-odm'
import UserSchema from './Users.Schema.mjs'
// import Sftp from '../../helpers/Sftp.mjs'

const UsersODM = new Model('Users', UserSchema)
const { replaceAll } = UsersODM

const UsersModel = {
  create,
  search,
  replaceAll,
  updateName,
  deleteById,
  findByParams
}

export default UsersModel

async function search (attrs = {}) {
  const { query = {}, projections = {}, options = {} } = attrs

  const { schemeName = '' } = query
  if (schemeName) {
    query.schemeName = new RegExp(schemeName, 'i')
  }

  const result = await UsersODM.search(query, projections, options)
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
  const response = await UsersODM.createOne(attrs);
  return response;
}

async function updateName (attrs = {}) {
  const { query = {}, attributes = { name: ''} } = attrs;
  const response = await UsersODM.updateById(query, attributes);
  return response;
}

async function deleteById (attrs = {}) {
  const { query = {} } = attrs;
  const response = await UsersODM.remove(query);
  return response;
}

async function findByParams (attrs = {}) {
  const { query = {} } = attrs;
  const response = await UsersODM.findById(query);
  return response;
}