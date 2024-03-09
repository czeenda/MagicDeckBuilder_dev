import {useState, createContext} from 'react';

export const UserContext = createContext(null);

export const UserContextProvider = ({children}) => {
	const [user, setUser] = useState({
		loggedIn: true,
		name: 'Emil',
		surname: 'Vomáčka',
	})

	return (
		<UserContext.Provider value={{user, setUser}}>
			{children}
		</UserContext.Provider>
	)

}