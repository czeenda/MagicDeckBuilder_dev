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

	const { renamed, setRenamed} = useContext(MyContext)

	const { moved, setMoved} = useContext(MyContext)

	

	//work const
	const [ work, setWork] = useState(null)


	useEffect(() => {
		const loadData = async () => {
			try {
				const {data, error} = await supabase
					.from('Decks')
					.select('*')
					.eq('user_id', user.id)
					

					//console.log("načteny balíčky")

					if (error) {
					console.log(error)
				} else {
					setDecks(data)
					console.log("Načteno pole balíčků")
					console.log(data)

				}
			}
			catch (error) {
				console.log(error)
			}
		}

		loadData();
	},[work, renamed])

	const handleAddDeck = async () => {
		if (newDeckName.trim() === "") { // Check if newDeckName is empty or contains only spaces
		  alert("Deck name cannot be empty."); // You can replace this with any other treatment, like showing a message in the UI
		  return; // Exit the function early if the name is empty
		}
	  
		try {
		  const { data, error } = await supabase
			.from('Decks')
			.insert({ name: newDeckName });
	  
		  if (error) {
			console.error("Error adding new deck:", error.message);
		  } else {
			console.log("New deck added:", data);
			setNewDeckName(""); // Clear the input field
			setWork(prev => !prev); // Toggle the state to trigger any necessary re-render or effects
		  }
		} catch (error) {
		  console.error("Unexpected error:", error);
		}
	  };

	  const handleItemClick = (element) => {
		setDeckID(element.id)
		setDeckName(element.name)
		setMoved(false)
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
				.from('Cards2')
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
		<section id='home' className='h-100'>
			<h3>Balíčky</h3>
			{/* {user.id} */}
			

			<div className="input-group mb-1">
  				<input type="text" className="form-control border" placeholder="Jméno nového balíčku"
				value={newDeckName} onChange={(e) => setNewDeckName(e.target.value)} />
  				<button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={handleAddDeck}>Vytvořit</button>
			</div>

			

			{decks === false ? <p>Načítání dat...</p> : 
			
			
			<div className='row'>
				<div className="col-12">
					<div className="row mx-0">
				{decks.map(element => 
			
				<div className='mt-1 p-1 deck-box p-1 bg-white w-100 d-flex flex-rows' key={element.id}>

					<img src={myDeck} className="deck my-auto" onClick={() => handleItemClick(element)}/>
					
					<div className='my-auto ms-1'><h4>{element.name}</h4>
						<Link to="/deckbuilder"><span onClick={() => handleItemClick(element)}>Upravit</span></Link> |&nbsp;
						<span className='delete' onClick={() => deleteDeck(element)}>Smazat</span>
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