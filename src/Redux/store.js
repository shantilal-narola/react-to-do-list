import {applyMiddleware, createStore} from 'redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import promise from 'redux-promise-middleware'

import rootReducers from './rootReducers'

let logger = []


if (process.env.NODE_ENV === 'development') {
  logger.push(createLogger())
}

const middleware = applyMiddleware(promise(), thunk, ...logger)


const store = createStore(
  rootReducers,
  middleware,
)

export default store
