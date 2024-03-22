import {useContext} from 'react';
import {MyContext} from './../context/MyContext'

const About = () => {

	const {edition, setEdition} = useContext(MyContext)

	return (
		<>
			<h2>About</h2>

			<p>Plán umístit sem nějaké informace o SPA.</p>

		</>
	);
}

export default About;