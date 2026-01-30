import React, { createContext, useContext, useState } from 'react'

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
import ProtectedRoute from './components/ProtectedRoute'

export let userContext = createContext()

function App() {
  let [user, setUser] = useState({});

  return (
    <userContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        <Routes>

          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/navbar" element={<Navbar />} />
            <Route path="/movie" element={<Movie />} />
            <Route path="/book" element={<Book />} />
            <Route path="/addbook" element={<AddBook />} />
            <Route path="/addmovie" element={<AddMovie />} />
            <Route path="/bookupdate/:id" element={<BookUpdate />} />
            <Route path="/movieupdate/:id" element={<MovieUpdate />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/footer" element={<Footer />} />
          </Route>

          {/* 404 */}
          <Route path="*" element={<PageNotFound />} />

        </Routes>
      </BrowserRouter>
    </userContext.Provider>
  );
}

export default App

