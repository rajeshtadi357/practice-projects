import z from 'zod'

const userSignup=z.object({
    name:z.string(),
    email:z.string().email(),
    password:z.string().min(6)

})

const userLogin=z.object({
    email:z.string().email(),
    password:z.string().min(6)
})


export {userSignup,userLogin}