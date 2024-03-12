import {Link} from 'react-router-dom'
import {useAuth} from './../context/AuthProvider'
import { useState, useEffect, useContext } from 'react';

import {MyContext} from './../context/MyContext'



import {supabase} from './../supabase/client'



const Home = () => {
	const {auth, user, logout} = useAuth()

	const [ decks, setDecks] = useState([])

	const [ newDeckName, setNewDeckName] = useState("")

	const { deckID, setDeckID} = useContext(MyContext)

	const { deckName, setDeckName} = useContext(MyContext)


	useEffect(() => {
		const loadData = async () => {
			try {
				const {data, error} = await supabase
					.from('Decks')
					.select('*')
					.eq('user_id', user.id)
					

					console.log("ok")

					if (error) {
					console.log(error)
				} else {
					console.log("funguje")
					setDecks(data)
					console.log(data)

				}
			}
			catch (error) {
				console.log(error)
			}
		}

		loadData();
	},)

	const handleAddDeck = async () => {
		
		const {data, error} = await supabase
				.from('Decks')
				.insert({
					name: newDeckName,
				  })

				console.log("ok")
				
	  }

	  const handleItemClick = (element) => {
		setDeckID(element.id)
		setDeckName(element.name)
	  }

	  const empty = () => {
		logout()
		setDeckID(false)
		setDeckName(false)
	  }

	return (
		<>
			<h2>Balíčky</h2>
			{user.id}
			<p>Zde budou vidět balíčky přihlášeného uživatle.</p>

			<div>
				<button onClick={empty}>Odhlasit se</button>
			</div>

			<div>
				
					<input type="text" value={newDeckName} onChange={(e) => setNewDeckName(e.target.value)}/>
					<button onClick={handleAddDeck}>Přidat</button>
				
			</div> 

			

			{decks === false ? <p>Načítání dat...</p> : <div>{decks.map(element => 
			
			<Link to="/editions"> 
				<div key={element.id} onClick={() => handleItemClick(element)}>
				Jméno balíčku: {element.name} 
				</div>
			</Link>)}
			
			</div>}

		</>
	);
}

export default Home;