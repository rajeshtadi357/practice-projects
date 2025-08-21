import axios from 'axios'

const axiosInstance=axios.create({
    baseURL: "https://file-drop-2o0w.onrender.com/"      /* "http://localhost:3000/" */
})

export default axiosInstance