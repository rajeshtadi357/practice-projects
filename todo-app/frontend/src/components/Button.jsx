import React from 'react'

const Button = ({ name, buttonHandler }) => {
  return (
    <button
      onClick={buttonHandler}
      className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-xl shadow-md hover:bg-blue-700 active:scale-95 transition-transform duration-150"
    >
      {name}
    </button>
  )
}

export default Button
