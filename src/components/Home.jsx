import {Link} from 'react-router-dom'
import {useAuth} from './../context/AuthProvider'
import { useState, useEffect, useContext } from 'react';

import {MyContext} from './../context/MyContext'

import myDeck from '../assets/magic_deck.png';



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

	const click = (name, id) => {
		prompt("!!!:?")
		alert(`${name}, ${id}`)


	}
	

		//console.log(`Smazat: ${element.id}`)
		//setWork(prev => !prev)


	return (
		<section id='home'>
			<h3>Balíčky</h3>
			{/* {user.id} */}
			

			<div className="input-group mb-1">
  				<input type="text" className="form-control border" placeholder="Name of new deck" aria-label="Recipient's username" aria-describedby="button-addon2"
				value={newDeckName} onChange={(e) => setNewDeckName(e.target.value)} />
  				<button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={handleAddDeck}>Vytvořit</button>
			</div>

			

			{decks === false ? <p>Načítání dat...</p> : 
			
			
			<div className='row'>
				<div className="col-12">
					<div className="row mx-0">
				{decks.map(element => 
			
				<div className='col-12 mt-1 p-1 deck-box p-1 bg-white w-100 d-flex flex-rows' key={element.id}>

					<img src={myDeck} className="deck my-auto" onClick={() => handleItemClick(element)}/>
					
					<div className='my-auto ms-1'><h4 onClick={() => {click(element.name, element.id)}}>{element.name}</h4>
						<Link to="/deckbuilder"><span onClick={() => handleItemClick(element)}>Upravit</span></Link> |&nbsp;
						<span onClick={() => deleteDeck(element)}>Smazat</span>
					</div>
				</div>
				
			)}
			</div>
			</div>
			
			</div>}

		</section>
	);
}

export default Home;