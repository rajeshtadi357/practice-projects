import React, { useState } from 'react'
import { Header, InputBox, Button } from './comp'
import { useRecoilState } from 'recoil'
import { loginSignup } from '../store/state'
import axiosInstance from '../utils/config'


const Signup = () => {
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    password: ''
  })

  const [loginSignupToggle, setLoginSignupToggle] = useRecoilState(loginSignup)
  const [loginsignup,setloginSignup]=useRecoilState(loginSignup)







  const signupHandler = async() => {
    try {
       const res=await axiosInstance.post('/user/signup',userInfo)
       console.log(res)
       alert("signup successfull")
       setUserInfo({name:"", email:"", password:""})
       setloginSignup(!loginsignup)
    } catch (error) {
      console.log(error.response.data)
    }
    
  }

  return (
    <div className="flex flex-col items-center justify-center  bg-gray-50 px-4">
      <Header title={'Signup'} />

      <div className="w-full max-w-sm bg-white p-6 rounded-xl shadow-md">
        <InputBox
          label={'Name'}
          type={'text'}
          placeholder={'John Doe'}
          value={userInfo.name}
          inputHandler={(e) =>
            setUserInfo({ ...userInfo, name: e.target.value })
          }
        />
        <InputBox
          label={'Email'}
          type={'email'}
          placeholder={'johndoe@gmail.com'}
          value={userInfo.email}
          inputHandler={(e) =>
            setUserInfo({ ...userInfo, email: e.target.value })
          }
        />
        <InputBox
          label={'Password'}
          type={'password'}
          placeholder={'12345'}
          value={userInfo.password}
          inputHandler={(e) =>
            setUserInfo({ ...userInfo, password: e.target.value })
          }
        />

        <Button name={'Signup'} buttonHandler={signupHandler} />

        <p className="mt-4 text-sm text-gray-600 text-center">
          Already have an account?{' '}
          <a
            className="text-blue-600 font-medium cursor-pointer hover:underline"
            onClick={() => setLoginSignupToggle(!loginSignupToggle)}
          >
            Login here
          </a>
        </p>
      </div>
    </div>
  )
}

export default Signup
