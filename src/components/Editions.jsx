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

	return (
		<section className='editions'>
			<h2>Edice</h2>
			<p>Vydané od {dateEdition}</p>
			
			<div className="container-lg">
				<div className="row">

					{magic === false ? <p>Načítání dat...</p> :
            		<div className="row">
                		{magic.map((element) => (
						<div className="col-3 text-center mt-2" key={element.id} onClick={() => setEdition({name: `${element.name}`, code: `${element.code}`, imgUrl: `${element.icon_svg_uri}`})}>
									
								<Link to="/deckbuilder">
									<div>
										<img src={element.icon_svg_uri} className='icon' />
										<h5 className="mt-1">{element.name}</h5>
									</div>
								</Link>

						
						</div>))}
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