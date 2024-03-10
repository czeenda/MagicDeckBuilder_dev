import { useState, useEffect, useContext} from "react"
import {MyContext} from './../context/MyContext'



const DeckBuilder = () => {

	const {edition, setEdition} = useContext(MyContext)

	const [ magic, setMagic] = useState(false)
    
    useEffect(() => {

		const loadCards = async () => {
			const response = await fetch(`https://api.scryfall.com/cards/search?include_extras=true&include_variations=true&order=set&q=e%3A${edition.code}&unique=prints`)
			const data = await response.json()


			setMagic(data.data)			

		}
		loadCards()
	}, [])

	return (
		<>
			<h2>DeckBuilder</h2>
			{magic === false ? <p>Načítání dat</p> : <span>{magic.map((element) => (<img src={element.image_uris.normal} className="card d-inline-block" />))}</span>}
		</>
	);
}

export default DeckBuilder;