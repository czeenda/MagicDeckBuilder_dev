import { useState, useEffect, useContext} from "react"
import {MyContext} from './../context/MyContext'



const DeckBuilder = () => {

	const {edition, setEdition} = useContext(MyContext)

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
			<p>Edition: {edition}</p>


			
			

		</>
	);
}

export default DeckBuilder;