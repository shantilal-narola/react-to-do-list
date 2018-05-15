import  {combineReducers} from  'redux'

// Reducers
import authReducer from './reducers/authReducer'
import todosReducer from './reducers/todosReducer'

const rootReducers = combineReducers({
  auth: authReducer,
  todos: todosReducer,
});


export default rootReducers;
