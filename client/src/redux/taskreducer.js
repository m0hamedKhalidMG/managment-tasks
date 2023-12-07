
import {createSlice} from '@reduxjs/toolkit'
export const taskreducer =createSlice(
{
name:'task',
initialState:{
    queue:[],
}
,
reducers:{
loaddata:(state,action)=>{
return {
    ...state,
    queue:action.payload.task,

}

}, clearState: (state) => {
    state.queue = [];
    state.trace = 0;
  },




}


}


)
export const{loaddata,clearState}=taskreducer.actions;
export default taskreducer.reducer;
  