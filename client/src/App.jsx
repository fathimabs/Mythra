import React from 'react'

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Movie from './components/Movie'
import Book from './components/Book'
import Signup from './components/Signup'
import Profile from './components/Profile'
import PageNotFound from './components/PageNotFound'
import ForgotPassword from './components/ForgotPassword'
import AboutUs from './components/AboutUs'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Login from './components/Login'
import AddMovie from './components/AddMovie'
import AddBook from './components/AddBook'
import BookUpdate from './components/BookUpdate'
import MovieUpdate from './components/MovieUpdate'


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />}></Route>
          <Route path='/signup' element={<Signup />}></Route>
          <Route path='/navbar' element={<Navbar />}></Route>
          <Route path='/home' element={<Home />}></Route>
          <Route path='/movie' element={<Movie />}></Route>
          <Route path='/book' element={<Book />}></Route>
          <Route path='/addbook' element={<AddBook />}></Route>
          <Route path='/addmovie' element={<AddMovie />}></Route>
          <Route path='/bookupdate' element={<BookUpdate />}></Route>
          <Route path='/movieupdate/:id' element={<MovieUpdate />}></Route>
          <Route path='/forgot-password' element={<ForgotPassword />}></Route>
          <Route path='/profile' element={<Profile />}></Route>
          <Route path='/aboutus' element={<AboutUs />}></Route>
          <Route path='/footer' element={<Footer />}></Route>
          <Route path='/*' element={<PageNotFound />}></Route>


        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App

