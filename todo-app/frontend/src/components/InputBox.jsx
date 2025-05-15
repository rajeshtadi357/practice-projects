import React from 'react'

const InputBox = ({ label, type, placeholder, value, inputHandler }) => {
  return (
    <div className="flex flex-col gap-2 mb-4">
      <label className="text-gray-700 font-medium">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={inputHandler}
        className="px-4 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      />
    </div>
  )
}

export default InputBox
