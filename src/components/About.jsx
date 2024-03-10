import {useContext} from 'react';
import {MyContext} from './../context/MyContext'

const About = () => {

	const {edition, setEdition} = useContext(MyContext)

	return (
		<>
			<h2>About</h2>

			<ul>
				<li>Lorem, ipsum dolor sit amet consectetur adipisicing.</li>
				<li>Explicabo quis dolorum suscipit. Deserunt, corporis delectus.</li>
				<li>Eius libero quaerat, itaque exercitationem architecto modi.</li>
				<li>Eos eius atque vero laudantium, eum dolores!</li>
				<li>Fuga harum, saepe quos ratione dolorum omnis.</li>
			</ul>
			<p>{edition}</p>

		</>
	);
}

export default About;