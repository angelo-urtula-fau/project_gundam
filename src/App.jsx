import React from 'react';
import './App.css';
import { useRoutes } from 'react-router';
import { Link } from 'react-router'
import Home from './pages/Home'

function App() {
  let element = useRoutes([
    {
      path: "/",
      element: <Home />
    }
  ]);

  return (
    <>
      <h1>Test</h1>
    </>
  )
}

export default App
