import {Link} from 'react-router-dom'
import {useContext, useEffect ,useRef} from 'react';

import { useAuth } from "../context/AuthProvider";

import {MyContext} from '../context/MyContext'

const Header = () => {

	const {auth, user, logout} = useAuth()
	
	const { deckID, setDeckID} = useContext(MyContext)

	const { deckName, setDeckName} = useContext(MyContext)

	//const menuRef = useRef(null);
	
	const empty = () => {
		logout()
		setDeckID(false)
		setDeckName(false)
	}

	/* useEffect(() => {
		if (menuRef.current) {
		  const menuHeight = menuRef.current.offsetHeight;
		  console.log("Výška menu:", menuHeight + "px");
		}
	  }); */

	return (
		<>
			<div className="row corners" id="menu" /* ref={menuRef} */>
				<div className="col-12 corners p-0 bg-gray">
					<div className='m-1 c-white d-flex flex-rows'>
						<h1 className='my-auto'>Magic Deck Builder</h1>
						<div className='my-auto ms-auto me-1'>
						{auth && <div><span className='me-1'>{user.email}</span><button onClick={empty} className='btn btn-primary'>Odhlasit se</button></div>}
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