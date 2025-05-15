import React, { useEffect, useState } from 'react'
import { Todo, Button } from '../components/comp'
import { useSetRecoilState } from 'recoil'
import { authState } from '../store/state'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../utils/config'

const Home = () => {
  const [todos, setTodos]=useState([])
  const [title,setTitle]=useState('')
  const setAuth = useSetRecoilState(authState)
  const navigate = useNavigate()

  const logoutHandler = () => {
    localStorage.removeItem('token')
    setAuth(null)
    navigate('/auth')
  }


const fetchData =async()=>{
  try {
    const res= await axiosInstance.get('/todo/bulk')
    if(!res.data.todos){
      setTodos([])
      return

    }
    setTodos(res.data.todos)
    
  } catch (error) {
    console.log(error)
  }
}



const createTodo=async()=>{

  try {
    if(title==""){
      return alert("please enter the todo")
    }
     await axiosInstance.post('/todo/create',{todo:title})
     setTitle("")
     fetchData()
  } catch (error) {
    console.log(error.response)
  }
}
const delTodo=async(id)=>{
 try {
   await axiosInstance.delete(`/todo/delete/${id}`)
   alert("todo deleted")
   fetchData()
 } catch (error) {
  console.log(error.response.data)
 }
}





  useEffect(()=>{
   fetchData()
  },[])
  return (
    <div className="min-h-screen bg-gray-750 p-6">
      {/* Header section with logout */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-400">
          Hey, welcome! This is your Dashboard
        </h2>
        <button
          onClick={logoutHandler}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

        {/* Create Todo Section */}
        <div className="max-w-md mx-auto mb-8 flex space-x-3">
            <input type="text" placeholder="Enter your todo..." value={title} onChange={(e)=>setTitle(e.target.value)}
               className="flex-1 px-4 py-2 border border-gray-600 rounded bg-gray-900 text-gray-300 placeholder-gray-500 focus:ring-2 focus:ring-blue-400 outline-none"
            />
            <button  onClick={createTodo}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition">
               Add
            </button>
        </div>




      {/* Todo list */}
      <div className="max-w-md mx-auto space-y-4">
       {todos.length==0?<p>no todos here, please create a todo </p>:
         todos.map((todo,i)=>
          <Todo key={i} todo={todo} delTodo={delTodo}/>
        )
       }
      </div>
    </div>
  )
}

export default Home

