import {useState, createContext} from 'react';

export const MyContext = createContext(null)


export const MyContextProvider = ({children}) => {
	const [count, setCount] = useState(9)

	return (
		<MyContext.Provider value={{count, setCount}}>
			{children}
		</MyContext.Provider>
	)
}