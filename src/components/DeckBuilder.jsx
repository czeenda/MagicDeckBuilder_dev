import {Link} from "react-router-dom"
import { useState, useEffect, useContext} from "react"
import {MyContext} from './../context/MyContext'
import {useAuth} from './../context/AuthProvider'

import SelectCardItem from "./SelectCardItem"


// DeckBuilder načítá karty z API a vybrané posílá do pole Deck
const DeckBuilder = () => {

	const {edition, setEdition} = useContext(MyContext)
	// vybraná edice

	const {auth, user, logout} = useAuth()
	//user status

	const [ magic, setMagic] = useState(false)
	// výpis edice

	const {deck, setDeck} = useContext(MyContext)

	const {deckID, setDeckID} = useContext(MyContext)

	const { cardPreview, setCardPreview} = useContext(MyContext)



    // loading vybrané edice
    useEffect(() => {

		const loadCards = async () => {
			const response = await fetch(`https://api.scryfall.com/cards/search?include_extras=true&include_variations=true&order=set&q=e%3A${edition.code}&unique=prints`)
			const data = await response.json()


			setMagic(data.data)			

		}
		loadCards()
	}, [])


	return (
		<section className="deckbuilder">	
			{/* <p>User: ID {user.id}</p> */}
			<h3>DeckBuilder</h3>
			<div className="mb-1"><Link to="/">Zpět na výběr balíku</Link></div>
			<div className="mb-1"><Link to="/editions">Zpět na výběr edice</Link></div>
			<p>Vybraná edice: <strong>{edition.name}</strong></p>

			<div className="card-section" style={{height: `${innerHeight - 380}px`}}>

			{magic === false ? <p>Načítání dat</p> : 

			<>{magic.map((element, id) => 

			(<div key={id}>

				<div className="p-11 d-flex flex-rows justify-content-between" onClick={() => setDeck([...deck, {
					card_id: `${element.id}`,
					name: `${element.name}`, 
					deck_id: `${deckID}`, 
					image_url: `${element.image_uris.normal}`,
					price: 10,
					edition_code: `${edition.code}`,
					type: `${element.type_line}`}])}
					
					onMouseEnter={() => setCardPreview(element.image_uris.normal)} onMouseLeave={() => setCardPreview()}

					>
						<SelectCardItem name={element.name} mana={element.mana_cost}/>
						
						{/* <img src={element.image_uris.normal} className="magic d-inline-block" /> */}
				</div>

			</div>))
			}
			</>}
			</div>
		</section>
	);
}

export default DeckBuilder;