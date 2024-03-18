import {useContext, useEffect} from 'react';
import {MyContext} from '../context/MyContext'

import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import {useAuth} from '../context/AuthProvider'

import {supabase} from '../supabase/client'

import SortableListApp from './List/SortableListApp';


// Komponenta zobrazuje všechny karty a filtruje je podle vybraného uživatele a decku
const WorkOnSidebar = () => {
	const {auth, user, logout} = useAuth()

	const {deck, setDeck} = useContext(MyContext)

	const { deckID, setDeckID} = useContext(MyContext)

	const { deckName, setDeckName} = useContext(MyContext)


	useEffect(() => {
		const loadData = async () => {
			try {
				const {data, error} = await supabase
					.from('Cards')
					.select('*')
					.eq('deck_id', deckID)
					

					console.log("ok")

					if (error) {
					console.log(error)
				} else {
					console.log("funguje")
					setDeck(data)
					console.log(data)

				}
			}
			catch (error) {
				console.log(error)
			}
		}

		loadData();
	}, [deckID])



	const handleRemoveClick = (id) => {
		const updatedDeck = deck.filter((_, index) => index !== id);
		setDeck(updatedDeck);
	  };

	  const saveCards = async () => {
		try {
		  // Delete cards with the specified deck_id
		  const deleteResult = await supabase
			.from('Cards')
			.delete()
			.eq('deck_id', deckID);
	  
		  // Check for errors in the delete operation
		  if (deleteResult.error) {
			console.log(deleteResult.error);
			return; // Exit the function if there's an error in the delete operation
		  }
	  
		  console.log("Deleted existing cards for deck_id:", deckID);
	  
		  // Insert new cards into the 'Cards' table
		  const insertResult = await supabase
			.from('Cards')
			.insert(deck);
	  
		  // Check for errors in the insert operation
		  if (insertResult.error) {
			console.log(insertResult.error);
		  } else {
			console.log("Inserted new cards for deck_id:", deckID);
			// setDecks(insertResult.data) // Uncomment and modify as needed
			console.log(insertResult.data);
		  }
		} catch (error) {
		  console.log(error);
		}
	  };
	  


	if (auth){
		return(
			<>
				<h2>Tvůj deck</h2>


					{deckID === false ? <p>Vyberte váš balíček</p> : <>
					{/* <p>User: {user.id}</p> */}
					<p>Balíček: {deckName}</p>
					{/* <p>ID: {deckID}</p> */}
					<ul>
						{deck.map((element, id) => (

					
						<li key={id}>{id +1}. 
							ID:{element.card_id} <br/>
							Name:{element.name} <br/>
							Deck ID: {element.deck_id} <br/>
							Image:{element.image_url} <br/>
							Price:{element.price} <br/>
							Code:{element.edition_code} <br/>
							<span onClick={() => handleRemoveClick(id)}>X</span>
						</li>
					
						
						))}</ul>
						
						<button onClick={saveCards}>Save your cards</button>

						</>}


						<SortableListApp/>

					
				
			</>
		)
	}

	return (
		<p>Uživatel nepřihlášen</p>
	);
}

export default WorkOnSidebar;