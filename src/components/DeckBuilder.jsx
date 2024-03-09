import { useState, useEffect } from "react"
//import {Link} from 'react-router-dom'

//import EditionsItem from "./EditionsItem"


const DeckBuilder = () => {

	const [magic, setMagic] = useState(false)
    
    useEffect(() => {
		const loadCards = async () => {
			const response = await fetch(`https://api.scryfall.com/sets/`)
			const data = await response.json()

            //setMagic(data.cards)
            //console.log(data.data)
            const mySets = data.data.filter((element) => new Date(element.released_at) >= new Date("2024-01-01"));

            setMagic(mySets)

		}
		loadCards()
	}, [])

	return (
		<>
			<h2>DeckBuilder</h2>


			
			

		</>
	);
}

export default DeckBuilder;