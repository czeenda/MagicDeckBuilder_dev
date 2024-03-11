import {useContext} from 'react';
import {MyContext} from './../context/MyContext'

const About = () => {

	const {edition, setEdition} = useContext(MyContext)

	return (
		<>
			<h2>TODO</h2>

			<ul>
				<li>Scale ala netflix</li>
				<li>Drag and drop</li>
				<li>Validace formuláře login a register</li>
				
			</ul>
			<p>{edition.name}</p>

		</>
	);
}

export default About;