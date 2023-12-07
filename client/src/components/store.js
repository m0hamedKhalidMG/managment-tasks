import {combineReducers,configureStore} from '@reduxjs/toolkit'
import  taskreducer from '../redux/taskreducer'
const rootreducer=combineReducers({
task:taskreducer,

})
export default configureStore({reducer:rootreducer})