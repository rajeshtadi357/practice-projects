import { atom } from "recoil";


const authState=atom({
    key:'authState',
    default:localStorage.getItem('token') || null
})

const loginSignup=atom({
    key:'loginSignupAtom',
    default:false
})

export {authState, loginSignup}