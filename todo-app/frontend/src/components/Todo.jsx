import React from 'react'
import { Header, Button } from './comp'

const Todo = ({ todo , delTodo}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow flex items-center justify-between">
      <Header title={todo.todo} />

      <div className="flex space-x-2">
        <Button name={"done"} />
        <Button name={"Delete"} buttonHandler={()=>{delTodo(todo._id)}}/>
      </div>
    </div>
  )
}

export default Todo