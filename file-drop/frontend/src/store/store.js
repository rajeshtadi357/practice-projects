import { configureStore } from "@reduxjs/toolkit";
import inputImgReducer from '../features/inputSlice.js'
import fileNameReducer from  '../features/fileNameSlice.js'
import compressImgReducer from '../features/compressSlice.js'

const store=configureStore({
    reducer:{
      inputImg:inputImgReducer,
      fileName:fileNameReducer,
      compressImg:compressImgReducer
    }
})

export default store