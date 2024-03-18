import {Routes, Route, Link} from 'react-router-dom'

import { useAuth } from "../context/AuthProvider";

import {useContext} from 'react';
import {MyContext} from '../context/MyContext'

const Header = () => {

	const {auth, user, logout} = useAuth()

	const empty = () => {
		logout()
		setDeckID(false)
		setDeckName(false)
		}
	return (
		<>
			<div className="row corners">
				<div className="col-12 corners p-0 bg-gray">
					<div className='m-1 c-white d-flex flex-rows'>
						<h1 className='my-auto'>Magic Deck Builder</h1>
						<div className='my-auto ms-auto me-1'>
						{auth && <button onClick={empty} className='btn btn-primary'>Odhlasit se</button>}
						</div>
						
						</div>
						
							<nav className='m-0 ps-1 py-12 bg-white'>
								
							<Link to="/">Home</Link><span> | </span>   
							<Link to="/editions">Editions</Link><span> | </span>  
							<Link to="/deckbuilder">Deck Builder</Link><span> | </span>  
							<Link to="/about">About</Link><span> | </span>  
							<Link to="/contacts">Contacts</Link><span> | </span>  
							<Link to="/login">Login</Link><span> | </span>  
							<Link to="/register">Register</Link>  
							
							</nav>
							
						

				</div>
        	</div>

		</>
	);
}

export default Header;