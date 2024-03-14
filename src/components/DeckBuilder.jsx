import {Link} from "react-router-dom"
import { useState, useEffect, useContext} from "react"
import {MyContext} from './../context/MyContext'
import {useAuth} from './../context/AuthProvider'


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
			<h2>DeckBuilder</h2>
			<div class="mb-1"><Link to="/">Zpět na výběr balíku</Link></div>
			<p>Vybraná edice: <strong>{edition.name}</strong></p>
			<div class="mb-2"><Link to="/editions">Zpět na výběr edice</Link></div>

			{magic === false ? <p>Načítání dat</p> : 

			<>{magic.map((element, id) => 

			(<div className="d-inline-block" key={id}>

				<div className="m-11" onClick={() => setDeck([...deck, {
					card_id: `${element.id}`,
					name: `${element.name}`, 
					deck_id: `${deckID}`, 
					image_url: `${element.image_uris.normal}`,
					price: 10,
					edition_code: `${edition.code}`}])}>
						<img src={element.image_uris.normal} className="magic d-inline-block" />
				</div>

			</div>))
			}
			</>}
		</section>
	);
}

export default DeckBuilder;