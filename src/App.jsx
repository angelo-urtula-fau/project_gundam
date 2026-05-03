import React from 'react';
import './App.css';
import { useRoutes } from 'react-router-dom';
import { Link } from 'react-router-dom'
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
      {element}
    </>
  )
}

export default App
