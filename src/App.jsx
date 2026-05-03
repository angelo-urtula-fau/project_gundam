import React from 'react';
import './App.css';
import { useRoutes } from 'react-router-dom';
import { Link } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import { useAuth } from "./context/AuthContext"
import {useNavigate} from "react-router-dom"
import {supabase} from "./client"



function App() {
  const { user, loading } = useAuth()
  let element = useRoutes([
    {
      path: "/",
      element: <Home />
    },
    {
      path: "/login",
      element: <Login/>
    }
  ]);
  const navigate =useNavigate()
  const handleLogout = async() => {
    await supabase.auth.signOut()
    navigate("/login")
  }

  return (
    <>

      {user? <h1>hello {user.email}</h1>:<h1>NO LOGIN</h1>}
      {user? <button onClick={handleLogout}>Log out</button>:<p></p>}
      {element}
    </>
  )
}

export default App
