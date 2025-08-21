import { useState, useEffect } from "react";
import axiosInstance from "../config/config";
import toast from "react-hot-toast";

 function useStartServer(){
  
    const [isServerReady, setIsServerReady]=useState(false)
    const [err,setErr]=useState(null)
  

    const pingServer=async ()=>{
        console.log("pinging the server")
        const toasttId= toast.loading("server is getting ready, usually takes up 20-30s")
        try {
          
            const res=await axiosInstance.get()
            console.log(res)
            if(res.status==200){
                setIsServerReady(true)
                toast.success("Server is ready", {id:toasttId})
            }
        } catch (error) {
            console.log(error)
            
           if(error.request && !error.response){
             setErr("server is down please try again later")
            toast.error("server is down, please try again later",{id:toasttId})
           }
           toast.error("internal server error, please try again", {id:toasttId})

        }
    }

    useEffect(()=>{
        pingServer()
    },[])


    return {isServerReady,err }
   
}

export default useStartServer