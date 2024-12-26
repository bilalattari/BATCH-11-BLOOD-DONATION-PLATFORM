import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { APP_ROUTES, getHeaders } from "../constant";
export const AuthContext = createContext()

function AuthContextProvider({ children }) {
    const [user, setUser] = useState(null)
    useEffect(() => {
        const token = Cookies.get('token')
        if (token && !user) {
            getUserInfo()
        }
    }, [user])

    const getUserInfo = async () => {
        const headers = getHeaders()
        axios.get(APP_ROUTES.userInfo, headers).then((res) => {
            setUser(res.data.data)
        })
            .catch((err) => console.log(err))
    }

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthContextProvider