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

	//work const
	const [ work, setWork] = useState(null)


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
	},[work])

	const handleAddDeck = async () => {
		
		const {data, error} = await supabase
				.from('Decks')
				.insert({
					name: newDeckName,
				  })

				console.log("přídán nový balíček")
				setNewDeckName("")
				setWork(prev => !prev)
				
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

	  
	  const deleteDeck = async (element) => {
		try {
			// Delete the deck from 'Decks' table
			const { data: deletedDeck, error: deckError } = await supabase
				.from('Decks')
				.delete()
				.eq('id', element.id);
	
			if (deckError) {
				throw deckError;
			}
	
			// Delete cards associated with the deck from 'Cards' table
			const { data: deletedCards, error: cardsError } = await supabase
				.from('Cards')
				.delete()
				.eq('deck_id', element.id);
	
			if (cardsError) {
				throw cardsError;
			}
			setWork(prev => !prev)
			setDeckID()
			// Return the deleted deck and deleted cards
			return { deletedDeck, deletedCards };
		} catch (error) {
			console.error('Error deleting deck and associated cards:', error.message);
			throw error;
		}
	};

		//console.log(`Smazat: ${element.id}`)
		//setWork(prev => !prev)


	return (
		<>
			<h2>Balíčky</h2>
			{/* {user.id} */}
			<p>Zde budou vidět balíčky přihlášeného uživatle.</p>

			<div>
				<button onClick={empty}>Odhlasit se</button>
			</div>

			<div>
				
					<input type="text" value={newDeckName} onChange={(e) => setNewDeckName(e.target.value)}/>
					<button onClick={handleAddDeck}>Přidat</button>
				
			</div> 

			

			{decks === false ? <p>Načítání dat...</p> : <div>{decks.map(element => 
			
				
				<div key={element.id}>
				Jméno balíčku: {element.name} <span onClick={() => handleItemClick(element)}>Zobrazit</span> | 
				<Link to="/deckbuilder"><span onClick={() => handleItemClick(element)}> Upravit</span></Link> |
				<span onClick={() => deleteDeck(element)}> Smazat</span>
				</div>
				
			)}
			
			</div>}

		</>
	);
}

export default Home;