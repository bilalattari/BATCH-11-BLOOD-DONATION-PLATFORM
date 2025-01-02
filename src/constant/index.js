

const devUrl = `http://localhost:4000/`
const prodUrl = `https://batch-11-node-with-mongodb.onrender.com/`
import Cookies from "js-cookie"
export const BASE_URL = devUrl

export const getHeaders = () => {
    const token = Cookies.get('token')
    return ({
        headers: {
            Authorization: `Bearer ` + token
        }
    })
}

export const APP_ROUTES = {
    login: BASE_URL + "auth/login",
    register: BASE_URL + "auth/register",
    userInfo: BASE_URL + "user/userInfo",
    getDonors: BASE_URL + "blooddonors",
    getOrders: BASE_URL + "orders",
    addPost: BASE_URL + "post",
    getPost: BASE_URL + "post",
}