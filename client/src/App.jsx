import React from 'react'

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/login'
import Movie from './components/Movie'
import Book from './components/Book'
import Signup from './components/Signup'
import Profile from './components/Profile'
import PageNotFound from './components/PageNotFound'
import ForgotPassword from './components/ForgotPassword'



function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />}></Route>
          <Route path='/home' element={<Home />}></Route>
          <Route path='/movie' element={<Movie />}></Route>
          <Route path='/book' element={<Book />}></Route>
          <Route path='/signup' element={<Signup />}></Route>
          <Route path='/forgot-password' element={<ForgotPassword />}></Route>
          <Route path='/profile' element={<Profile />}></Route>
          <Route path='/*' element={<PageNotFound />}></Route>

        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App

