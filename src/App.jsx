import React from 'react';
import './App.css';
import { useRoutes } from 'react-router-dom';
import { Link } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import PostPage from "./pages/PostPage"
import EditPost from "./pages/EditPost"
import SignUp from './pages/Signup'
import ResetPassword from './pages/ResetPassword';
import UpdatePassword from './pages/UpdatePassword';
import { useAuth } from "./context/AuthContext"
import { useNavigate } from "react-router-dom"
import { supabase } from "./client"



function App() {
  const { user, loading } = useAuth()
  let element = useRoutes([
    {
      path: "/",
      element: <Home />
    },
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/view/:id",
      element: <PostPage />
    },
    {
      path: "/edit/:id",
      element: <EditPost />
    },
    {
      path: "/signup",
      element: <SignUp />
    },
    {
      path: "/reset-password",
      element: <ResetPassword />
    },
    {
      path: "/update-password",
      element: <UpdatePassword />
    }
  ]);
  const navigate = useNavigate()
  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate("/login")
  }

  return (
    <div>
      <div className="header">
          <div className="site-name">
            <h2>Project Gundam</h2>
          </div>
          <div className="navbar">
            {user? (<p>Welcome, {user.email}!</p>): null}
            <Link to="/"><button>Home</button></Link>
            {user? (<button onClick={handleLogout}>Logout</button>):(<Link to="/login"><button>Login</button></Link>)}
          </div>
      </div>
      {element}
    </div>
  )
}

export default App
