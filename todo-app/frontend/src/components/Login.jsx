import React, { useState } from 'react'
import { Header, InputBox, Button } from './comp'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { authState, loginSignup } from '../store/state'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../utils/config'

const Login = () => {
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: ''
  })
  const [loginSignupToggle, setLoginSignupToggle] = useRecoilState(loginSignup)
  const setAuthState = useSetRecoilState(authState)
  const navigate = useNavigate()








  const loginHandler = async () => {
  
     try {
      const res=await axiosInstance.post('/user/login', loginInfo)
      localStorage.setItem('token', res.data.token)
      setAuthState(res.data.token)
      alert("login succesfull")
      navigate('/')
     } catch (error) {
      console.log(error.response.data)
     }



    
    
    
    
  }

  return (
    <div className=" flex flex-col items-center justify-center  bg-gray-50 p-4  rounded-3xl">
      <Header title={'Login'} />

      <div className="w-full max-w-sm bg-white p-6 rounded-xl shadow-md">
        <InputBox
          label={'Email'}
          type={'email'}
          placeholder={'johndoe@gmail.com'}
          value={loginInfo.email}
          inputHandler={(e) =>
            setLoginInfo({ ...loginInfo, email: e.target.value })
          }
        />
        <InputBox
          label={'Password'}
          type={'password'}
          placeholder={'12345'}
          value={loginInfo.password}
          inputHandler={(e) =>
            setLoginInfo({ ...loginInfo, password: e.target.value })
          }
        />

        <Button name={'Login'} buttonHandler={loginHandler} />

        <p className="mt-4 text-sm text-gray-600 text-center">
          Don&apos;t have an account?{' '}
          <a
            className="text-blue-600 font-medium cursor-pointer hover:underline"
            onClick={() => setLoginSignupToggle(!loginSignupToggle)}
          >
            Signup here
          </a>
        </p>
      </div>
    </div>
  )
}

export default Login
