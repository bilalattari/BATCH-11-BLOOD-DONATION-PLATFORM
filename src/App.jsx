import { useContext } from 'react'
import './App.css'
import { AuthContext } from './context/AuthContext'
import { Navigate, Route, Routes } from 'react-router'
import Login from './login'
import Home from './home'
import Orders from './orders'
import Posts from './Posts'
function App() {
  const { user } = useContext(AuthContext)
  console.log("user in context==>", user)
  return (
    <Routes>
      <Route path='/login' element={user ? <Navigate to={'/'} /> : <Login />} />
      <Route path='/' element={!user ? <Navigate to={'/login'} /> : <Posts />} />
      <Route path='/post' element={<Posts />} />
    </Routes>
  )
}

export default App
