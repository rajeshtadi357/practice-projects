import { createSlice } from "@reduxjs/toolkit";


const initialState={
    blobUrl:null,
    size:0
}
const compressSlice=createSlice({
    name:'compressImg',
    initialState,
    reducers:{
        setCompressInfo:(state,action)=>{
            state.blobUrl=action.payload.blob,
            state.size=action.payload.size

        },
        clearCompressInfo:(state)=>{
            state.blobUrl=null,
            state.size=0
        }
    }
})


export const {setCompressInfo,clearCompressInfo}=compressSlice.actions
export default compressSlice.reducer