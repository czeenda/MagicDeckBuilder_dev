import { useState, useEffect } from 'react';

import {supabase} from './../supabase/client'


const Contacts = () => {
	const [contacts, setContacts] = useState([])

	useEffect(() => {
		const loadData = async () => {
			try {
				const {data, error} = await supabase
					.from('contacts')
					.select()
					.order('surname');

					if (error) {
					console.log(error)
				} else {
					console.log(data)
					setContacts(data)
				}
			}
			catch (error) {
				console.log(error)
			}
		}

		loadData();
	}, [])


	return (
		<>
			<h2>Contacts</h2>

			<ul>
				{contacts.map(contact => <li key={contact.id}>
					{contact.name} {contact.surname} - {contact.jobtitle}
				</li>)}
			</ul>

		</>
	);
}

export default Contacts;