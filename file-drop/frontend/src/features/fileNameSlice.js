import { createSlice } from "@reduxjs/toolkit";


const initialState={
    name:null
}
const fileNameSlice=createSlice({
  name:'filename',
  initialState,
  reducers:{
    setFileName:(state,action)=>{
        state.name=action.payload.fileName
    },
    clearFileName:(state)=>{
        state.name=null
    }
  }
})


export const {setFileName, clearFileName}=fileNameSlice.actions
export default fileNameSlice.reducer