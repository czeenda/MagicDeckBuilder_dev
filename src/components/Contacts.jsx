import { useState, useEffect } from 'react';

import {supabase} from './../supabase/client'


const Contacts = () => {
	const [contacts, setContacts] = useState([])

	useEffect(() => {
		const loadData = async () => {
			try {
				const {data, error} = await supabase
					.from('Decks')
					.select('*')
					//.order('name');

					console.log("ok")

					if (error) {
					console.log(error)
				} else {
					console.log("funguje")
					setContacts(data)

				}
			}
			catch (error) {
				console.log(error)
			}
		}

		loadData();
	}, [])

	const handleAddDeck = async () => {
		const { data, error } = await supabase
		  .from('Decks')
		  .insert({
			id: "id",
			name: "jmeno",
			deck_id: "500"
		  })
		  
	  }


	return (
		<>
			<h2>Contacts</h2>

			<button onClick={handleAddDeck}>Nový balíček</button>

			{contacts === false ? <p>Načítání dat...</p> : <ul>{contacts.map(contact => <li key={contact.id}>
				{contact.name} {contact.id}
			</li>)}</ul>}

			
			
			
		

			

		</>
	);
}

export default Contacts;