import {useState, createContext} from 'react';

export const MyContext = createContext(null)


export const MyContextProvider = ({children}) => {
	const [ edition, setEdition] = useState("Tempest")

	return (
		<MyContext.Provider value={{edition, setEdition}}>
			{children}
		</MyContext.Provider>
	)
}