import {Link} from "react-router-dom"
import { useState, useEffect, useContext} from "react"
import {MyContext} from './../context/MyContext'
import {useAuth} from './../context/AuthProvider'

import SelectCardItem from "./SelectCardItem"

import { v4 as uuidv4 } from 'uuid';


// DeckBuilder načítá karty z API a vybrané posílá do pole Deck
const Search = () => {

	const [query, setQuery] = useState('');

	const [typingTimeout, setTypingTimeout] = useState(null);

	const {edition, setEdition} = useContext(MyContext)
	// vybraná edice

	const {auth, user, logout} = useAuth()
	//user status

	const [ magic, setMagic] = useState(false)
	// výpis edice

	const {deck, setDeck} = useContext(MyContext)

	const {deckID, setDeckID} = useContext(MyContext)

	const { cardPreview, setCardPreview} = useContext(MyContext)

	const { addedCard, setAddedCard} = useContext(MyContext)

	const { searchCardName, setSearchCardName} = useContext(MyContext)	


	const [error, setError] = useState(null); // State to hold any error messages

  	const [loading, setLoading] = useState(false); // State to manage loading status


	const [ topSpace, setTopSpace] = useState(310)
	
	const uuid = uuidv4();
	

    // loading hledaného výrazu

    useEffect(() => {
    const loadCards = async () => {
      if (searchCardName.trim() === '') {
        setMagic([]);
        setError(null); // Reset error if query is empty
        return; // Exit if query is empty
      }

      setLoading(true); // Start loading

      try {
        const response = await fetch(`https://api.scryfall.com/cards/search?q=${searchCardName}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        
        if (data.data.length === 0) {
          setMagic([]);
          setError('No cards found for the given search query.');
        } else {
          setMagic(data.data); // Update state with fetched data
          setError(null); // Clear any previous errors
        }

        console.log("Cards fetched and set:", data.data);

      } catch (error) {
        console.error('Error fetching cards:', error);
        setMagic([]);
        setError('An error occurred while fetching cards.');
      } finally {
        setLoading(false); // Stop loading
      }
    };

    loadCards();
  }, [searchCardName]);
 
	useEffect(() => {
		const width = window.innerWidth
		if(width <= 1600){
			setTopSpace(304)
		}
	})

	const handleInputChange = (e) => {
		const value = e.target.value;
		setQuery(value);
	
		if (typingTimeout) {
		  clearTimeout(typingTimeout); // Clear the previous timeout
		}
	
		// Set a new timeout to update the searchCardName after 300ms
		setTypingTimeout(setTimeout(() => {
		  setSearchCardName(value);
		}, 300));
	  };

		return (
		<section id="deckbuilder">	
			{/* <p>User: ID {user.id}</p> */}
			<h3 className="d-inline-block">Search</h3>

			<form onSubmit={(e) => e.preventDefault()}> 
				<div className="input-group mb-1">
					<input type="text" className="form-control border" placeholder="Search.."
					value={query} onChange={handleInputChange} />
					<button className="btn btn-outline-secondary" type="submit">Search</button>
				</div>
			</form>

			

			<div className="card-section bg-white mt-1" style={{height: `${innerHeight - topSpace}px`}}>

			{magic === false ? <p></p> : 

			<>{magic.map((element, id) => 

			(<div key={id} className="item px-13">

				<div className="p-11 d-flex flex-rows justify-content-between" onClick={() => {
						setDeck(prevDeck => [
							...prevDeck,
							{
							id: uuid, /* ${Math.floor(Math.random() * 10001)} */
							card_id: element.id,
							name: element.name, 
							deck_id: deckID, 
							image_url: element.image_uris.normal,
							price: 10,
							edition_code: edition.code,
							type: element.type_line
							}
						]);
						setAddedCard(prev => !prev);
						}}
					
					onMouseEnter={() => setCardPreview(element.image_uris.normal)} onMouseLeave={() => setCardPreview()}

					>
						<SelectCardItem name={element.name} manaCost={element.mana_cost} />
						
						{/* <img src={element.image_uris.normal} className="magic d-inline-block" /> */}
				</div>

			</div>))
			}
			</>}
			</div>
		</section>
	);
	
}

export default Search;