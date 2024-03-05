import { useState } from 'react'
import './App.css'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import AuthProvider from './auth/AuthProvider'
import Login from './components/Login'
import PrivateRoute from './route'
import Dashboard from './components/Dashboard'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route element={<PrivateRoute/>}>
            <Route path="/" element={<Dashboard/>}></Route>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
