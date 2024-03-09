import {useContext} from 'react'
import { EditionContext } from './../context/EditionProvider'

import { useState, useEffect } from "react"
import {Link} from 'react-router-dom'

//import EditionsItem from "./EditionsItem"


const Editions = () => {

	//const {edition, setEdition} = useContext(EditionContext)

	const [magic, setMagic] = useState(false)
    
    useEffect(() => {
		const loadCards = async () => {
			const response = await fetch(`https://api.scryfall.com/sets/`)
			const data = await response.json()

            //setMagic(data.cards)
            //console.log(data.data)
            const mySets = data.data.filter((element) => new Date(element.released_at) >= new Date("2024-01-01"));

            setMagic(mySets)

		}
		loadCards()
	}, [])

	return (
		<>
			<h2>Editions</h2>
			


			<div className="container-lg">
				<div className="row">

					{magic === false ? <p>Načítání dat...</p> :
            		<div className="row">
                		{magic.map((element) => (
						<div className="col-2 text-center mt-2" key={element.id}>
									
							<Link to="/deckbuilder">

							<img src={element.icon_svg_uri} />
							<h5 class="mt-1">{element.name}</h5>
							
							</Link>
							
						{/* {element.search_uri} */}
						
						
						
						</div>))}
            		</div>}


		


				
				</div>
			</div>

			

		</>
	);
}

export default Editions;