import { createSlice } from "@reduxjs/toolkit";


const initialState={
    name:null,
    blobUrl:null,
    size:0
}

const inputSlice=createSlice({
  name:'input',
  initialState,
  reducers:{
    setInput:(state,action)=>{
       state.name=action.payload.name
       state.blobUrl=action.payload.blob,
       state.size=action.payload.size
    },
    clearInput:(state)=>{
      state.name=null,
      state.blobUrl=null,
      state.size=0
    }
   
  }
})

export const {setInput, clearInput}=inputSlice.actions
export default inputSlice.reducer