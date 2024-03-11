import {useContext, useEffect} from 'react';
import {MyContext} from './../context/MyContext'

import {useAuth} from '../context/AuthProvider'

import {supabase} from './../supabase/client'


// Komponenta zobrazuje všechny karty a filtruje je podle vybraného uživatele a decku
const WorkOnSidebar = () => {
	const {auth, user, logout} = useAuth()

	const {deck, setDeck} = useContext(MyContext)

	const { deckID, setDeckID} = useContext(MyContext)

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
			const {data, error} = await supabase
				.from('Cards')
				.insert(deck)

				console.log("ok")

				if (error) {
				console.log(error)
			} else {
				console.log("posláno")
				//setDecks(data)
				console.log(data)

			}
		}
		catch (error) {
			console.log(error)
		}
		
		  
	  }

	  useEffect(() => {

        console.log("filtr");


      }, []);

	if (auth){
		return(
			<>
				<h2>Tvůj deck</h2>
				<p>User: {user.id}</p>
				<p>Balíček: {deckID}</p>


				
				
					{deckID === false ? <p>Vyberte váš balíček</p> : <>
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

					
				
			</>
		)
	}

	return (
		<p>Uživatel nepřihlášen</p>
	);
}

export default WorkOnSidebar;