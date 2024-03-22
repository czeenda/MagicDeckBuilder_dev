import {useContext} from 'react';
import {MyContext} from './../context/MyContext'

import { useState, useEffect } from "react"
import {Link} from 'react-router-dom'

const Editions = () => {

	const { dateEdition, setDateEdition} = useContext(MyContext)

	const {edition, setEdition} = useContext(MyContext)

	const {deck, setDeck} = useContext(MyContext)

	const [magic, setMagic] = useState(false)

	const [ topSpace, setTopSpace] = useState(336)
    
    useEffect(() => {
		const loadCards = async () => {
			const response = await fetch(`https://api.scryfall.com/sets/`)
			const data = await response.json()

            //setMagic(data.cards)
            //console.log(data.data)
            const mySets = data.data.filter((element) => new Date(element.released_at) >= new Date(dateEdition[0]) && new Date(element.released_at) < new Date(dateEdition[1]))

            setMagic(mySets)

		}
		loadCards()
	}, [dateEdition])

	useEffect(() => {
		const width = window.innerWidth
		if(width <= 1600){
			setTopSpace(269)
		}
	})

	const handleChange = (event) => {
		const selectedValue = event.target.value;
		setDateEdition(JSON.parse(selectedValue)); // Parse the selected value back to an array
	  };
	
	const options = [
		{ label: '2024', dates: ["2024-01-01", "2025-01-01"] },
		{ label: '2023', dates: ["2023-01-01", "2024-01-01"] },
		{ label: '2022', dates: ["2022-01-01", "2023-01-01"] },
		{ label: '2021', dates: ["2021-01-01", "2022-01-01"] },
	];

	//let height = window.innerHeight;

	return (
		<section id='editions'>
			<h3>Edice</h3>
			<form>
			<label><p className='mb-11'>Choose year:</p></label>
				<select value={JSON.stringify(dateEdition)} onChange={handleChange} class="form-select border mb-1">
					{options.map(option => (
						<option key={option.label} value={JSON.stringify(option.dates)}>
						{option.label}
						</option>
					))}
    			</select>
			</form>
			
			<div className="container-lg bg-white" style={{height: `${innerHeight - topSpace}px`}}>
				<div className="row">

					{magic === false ? <p>Načítání dat...</p> :
            		<div className="row">
                		{magic.map((element, id) => (
							<Link to="/deckbuilder" key={id}>
						<div className="col-12 edition d-flex flex-rows justify-content-start align-items-center" onClick={() => setEdition({name: `${element.name}`, code: `${element.code}`, imgUrl: `${element.icon_svg_uri}`})}>
									
								
									
										<img src={element.icon_svg_uri} className='icon' />
										<h6 className="mb-0 ms-1">{element.name}</h6>
									
								

						
						</div></Link>))}
            		</div>}
				
				</div>
				<div className="row">
					<div className="col-12">
						
					</div>
				</div>
			</div>

			{deck.cardName}

		</section>
	);
}

export default Editions;