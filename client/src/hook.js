/* eslint-disable react-hooks/rules-of-hooks */
import { getServerData } from "../src/helper"; 
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import *as Action from "../src/redux/taskreducer"
export const  fetchdata = () => {
  const dispatch=  useDispatch();
const [getdata,setGetData]= useState({isloading:false,apidata:[],servererror:null})
useEffect(()=>{
    setGetData(prev => ({...prev, isloading : true}));

(async()=>{
try{
    const task= await getServerData(`http://localhost:4000/api/task?id=${encodeURIComponent(2)}`, (data) => data)
if(task.length>0){
    console.log(task)
    setGetData(prev => ({ ...prev , isloading : false}));
    setGetData(prev => ({...prev, apiData :task}));
dispatch(Action.loaddata({task}))
}
else {

    throw new Error ("no task")
}}catch(error){

    setGetData(prev => ({...prev, isloading : false}));
    setGetData(prev => ({...prev, serverError : error}));

}

})()

    
 
}

,[dispatch])
return [getdata,setGetData]
}



    