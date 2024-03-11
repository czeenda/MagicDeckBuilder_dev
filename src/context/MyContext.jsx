import {useState, createContext} from 'react';

export const MyContext = createContext(null)


export const MyContextProvider = ({children}) => {
	const [ edition, setEdition] = useState({
		name: 'Bloomburrow',
		code: 'blb',
		imgUrl: 'https://svgs.scryfall.io/sets/blb.svg?1709528400',
	})

	const [ deckID, setDeckID] = useState(false)

	const [ deck, setDeck] = useState([])
	

	return (
		<MyContext.Provider value={{edition, setEdition, deck, setDeck, deckID, setDeckID}}>
			{children}
		</MyContext.Provider>
	)
}