import {useState, createContext} from 'react';

export const MyContext = createContext(null)


export const MyContextProvider = ({children}) => {
	const [ edition, setEdition] = useState({
		name: 'Bloomburrow',
		code: 'blb',
		imgUrl: 'https://svgs.scryfall.io/sets/blb.svg?1709528400',
	})

	const [ dateEdition, setDateEdition] = useState(["2024-01-01", "2025-01-01"])

	const [ deckID, setDeckID] = useState(false)

	const [ deckName, setDeckName] = useState("")

	const [ deck, setDeck] = useState([])	

	const [ cardPreview, setCardPreview] = useState("")

	const [ renamed, setRenamed] = useState("")

	const [ addedCard, setAddedCard] = useState(false)

	const [ moved, setMoved] = useState(false)
	

	return (
		<MyContext.Provider value={{edition, setEdition, deck, setDeck, deckID, setDeckID, 
		deckName, setDeckName, cardPreview, setCardPreview, renamed, setRenamed, 
		addedCard, setAddedCard, dateEdition, setDateEdition, moved, setMoved}}>
			{children}
		</MyContext.Provider>
	)
}