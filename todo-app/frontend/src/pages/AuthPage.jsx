import React from 'react'
import { Login, Signup } from '../components/comp'
import { useRecoilValue } from 'recoil'
import { loginSignup } from '../store/state'

const AuthPage = () => {
  const loginSignupToggle = useRecoilValue(loginSignup)

  return (
    <div className="flex items-center justify-center p-4 bg-gray-750">
      {loginSignupToggle ? <Login /> : <Signup />}
    </div>
  )
}

export default AuthPage
