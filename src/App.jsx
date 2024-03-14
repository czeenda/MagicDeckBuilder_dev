import {Routes, Route, Link} from 'react-router-dom'


import AuthRoute from './components/AuthRoute'

import { MyContextProvider } from './context/MyContext'

import Home from './components/Home'
import Editions from './components/Editions'
import DeckBuilder from './components/DeckBuilder'
import About from './components/About'
import WorkOnSidebar from './components/WorkOnSidebar'

import Contacts from './components/Contacts'

import Login from './components/Login'
import Register from './components/Register'
import SortableListApp from './components/List/SortableListApp'
import Preview from './components/List/Preview'

function App() {


  return (
    <section className='h-100 p-1'>
      <div className="container-xl p-1">
        <div className="row">
          <div className="col-12">
            <nav className='m-0'>
              <h1>Magic Deck Builder</h1>
              <Link to="/">Home</Link> |   
              <Link to="/editions">Editions</Link> | 
              <Link to="/deckbuilder">Deck Builder</Link> |
              <Link to="/about">About</Link> |
              <Link to="/contacts">Contacts</Link> |
              <Link to="/login">Login</Link> |
              <Link to="/register">Register</Link> |
            </nav>
          </div>
        </div>
            <MyContextProvider>
          <div className="row mt-1">
            <div className="col-6">
            <Routes>
              <Route element={<AuthRoute />}>

                <Route path="/" element={<Home />} />
                <Route path="/editions" element={<Editions />} />
                <Route path="/deckbuilder" element={<DeckBuilder />} />
                <Route path="/about" element={<About />} />

              </Route>

                <Route path="/contacts" element={<Contacts />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
            </Routes>


            </div>
            <div className="col-6">
              <div className="row">
                <div className="col-6"><SortableListApp/></div>
                <div className="col-6"><Preview/></div>
              </div>
            
            </div>
        </div>
      </MyContextProvider>
    </div>
     

    </section>
  )
}

export default App
