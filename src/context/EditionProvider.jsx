import { createContext, useContext, useState, useEffect } from "react";


const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);


export const EditionContext = createContext(null);

export const EditionContextProvider = ({children}) => {
	const [edition, setEdition] = useState("Tempest")

	return (
		<EditionContext.Provider value={{edition, setEdition}}>
			{children}
		</EditionContext.Provider>
	)

}