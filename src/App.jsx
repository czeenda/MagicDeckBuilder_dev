import {Routes, Route, Link} from 'react-router-dom'


import AuthRoute from './components/AuthRoute'

import { MyContextProvider } from './context/MyContext'

import Home from './components/Home'
import Editions from './components/Editions'
import DeckBuilder from './components/DeckBuilder'
import Search from './components/Search'
import About from './components/About'
import Header from './components/Header'

import Contacts from './components/Contacts'

import Login from './components/Login'
import Register from './components/Register'
//import SortableListApp from './components/List/SortableListApp'
import Preview from './components/List2/Preview'
//import TaskList2 from './components/List2/TaskList_new'
//import ListDnd from './ListDnd'
//import ListDnd2 from './ListDnd2'
//import TaskList from './components/List2/TaskList_new'

import Dnd from './components/List2/Dnd_new.jsx'

function App() {


  return (
    
      <div className="container-fluid pb-1 my-2" id="app">
        <MyContextProvider>
            <Header />
          <div className="row mt-1">
            <div className="col-3">
            <Routes>
              <Route element={<AuthRoute />}>

                <Route path="/" element={<Home />} />
                <Route path="/editions" element={<Editions />} />
                <Route path="/search" element={<Search />} />
                <Route path="/deckbuilder" element={<DeckBuilder />} />
                <Route path="/about" element={<About />} />

              </Route>

                <Route path="/contacts" element={<Contacts />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
            </Routes>


            </div>
            <div className="col-9">
              <div className="row">
                <div className="col-3"><Preview/></div>
                <div className="col-9 ps-0"><Dnd/></div>
              </div>
            
            </div>
        </div>
      </MyContextProvider>
      
    </div>
    
     
  )
}

export default App
