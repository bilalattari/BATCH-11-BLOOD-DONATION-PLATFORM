import { useContext, useState } from 'react'
import axios from 'axios'
import { APP_ROUTES } from '../constant'
import { AuthContext } from '../context/AuthContext'
import Cookies from 'js-cookie'
function Login() {
    const { setUser } = useContext(AuthContext)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const login = () => {

        axios.post(APP_ROUTES.login, {
            email,
            password
        }).then((res) => {
            console.log("res==>", res.data)
            Cookies.set("token", res?.data?.data?.token)
            setUser(res?.data?.data?.user)
        })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <div className='flex flex-col gap-10 container mx-auto text-center mt-20'>
            <h1>Login</h1>
            <input className='border p-2' onChange={(e) => setEmail(e.target.value)} placeholder='email' />
            <input className='border p-2' onChange={(e) => setPassword(e.target.value)} placeholder='password' />
            <button className='border p-2 bg-red-200' onClick={login}>Login</button>
        </div>
    )
}

export default Login
