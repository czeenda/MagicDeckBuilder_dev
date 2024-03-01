import {Routes, Route, Link} from 'react-router-dom'


import AuthRoute from './components/AuthRoute'

import Home from './components/Home'
import About from './components/About'
import Contacts from './components/Contacts'
import Login from './components/Login'
import Register from './components/Register'

function App() {


  return (
    <>
      <h1>Supabase + Auth + Router</h1>

      <nav>
        <Link to="/">Home</Link> |
        <Link to="/about">About</Link> |
        <Link to="/contacts">Contacts</Link> |
        <Link to="/login">Login</Link> |
        <Link to="/register">Register</Link> |
      </nav>

      <Routes>
        <Route element={<AuthRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Route>
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>

    </>
  )
}

export default App
