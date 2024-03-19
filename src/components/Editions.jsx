import {useContext} from 'react';
import {MyContext} from './../context/MyContext'

import { useState, useEffect } from "react"
import {Link} from 'react-router-dom'

const Editions = () => {

	const {edition, setEdition} = useContext(MyContext)

	const {deck, setDeck} = useContext(MyContext)

	const [magic, setMagic] = useState(false)

	const [ dateEdition, setDateEdition] = useState("2024-01-01")
    
    useEffect(() => {
		const loadCards = async () => {
			const response = await fetch(`https://api.scryfall.com/sets/`)
			const data = await response.json()

            //setMagic(data.cards)
            //console.log(data.data)
            const mySets = data.data.filter((element) => new Date(element.released_at) >= new Date(dateEdition));

            setMagic(mySets)

		}
		loadCards()
	}, [])

	//let height = window.innerHeight;

	return (
		<section id='editions'>
			<h3>Edice</h3>
			<p>Vydané od {dateEdition}</p>
			
			<div className="container-lg" style={{height: `${innerHeight - 300}px`}}>
				<div className="row">

					{magic === false ? <p>Načítání dat...</p> :
            		<div className="row">
                		{magic.map((element) => (
							<Link to="/deckbuilder">
						<div className="col-12 edition d-flex flex-rows justify-content-start align-items-center" key={element.id} onClick={() => setEdition({name: `${element.name}`, code: `${element.code}`, imgUrl: `${element.icon_svg_uri}`})}>
									
								
									
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