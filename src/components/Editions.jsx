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
			const filtered = mySets.filter((element) => !element.card_count == 0)
            setMagic(filtered)

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
		{ label: '2020', dates: ["2020-01-01", "2021-01-01"] },
		{ label: '2019', dates: ["2019-01-01", "2020-01-01"] },
		{ label: '2018', dates: ["2018-01-01", "2019-01-01"] },
		{ label: '2017', dates: ["2017-01-01", "2018-01-01"] },
		{ label: '2016', dates: ["2016-01-01", "2017-01-01"] },
		{ label: '2015', dates: ["2015-01-01", "2016-01-01"] },
		{ label: '2014', dates: ["2014-01-01", "2015-01-01"] },
		{ label: '2013', dates: ["2013-01-01", "2014-01-01"] },
		{ label: '2012', dates: ["2012-01-01", "2013-01-01"] },
		{ label: '2011', dates: ["2011-01-01", "2012-01-01"] },
		{ label: '2010', dates: ["2010-01-01", "2011-01-01"] },
		{ label: '2009', dates: ["2009-01-01", "2010-01-01"] },
		{ label: '2008', dates: ["2008-01-01", "2009-01-01"] },
		{ label: '2007', dates: ["2007-01-01", "2008-01-01"] },
		{ label: '2006', dates: ["2006-01-01", "2007-01-01"] },
		{ label: '2005', dates: ["2005-01-01", "2006-01-01"] },
		{ label: '2004', dates: ["2004-01-01", "2005-01-01"] },
		{ label: '2003', dates: ["2003-01-01", "2004-01-01"] },
		{ label: '2002', dates: ["2002-01-01", "2003-01-01"] },
		{ label: '2001', dates: ["2001-01-01", "2002-01-01"] },
		{ label: '2000', dates: ["2000-01-01", "2001-01-01"] },
		{ label: '1999', dates: ["1999-01-01", "2000-01-01"] },
		{ label: '1998', dates: ["1998-01-01", "1999-01-01"] },
		{ label: '1997', dates: ["1997-01-01", "1998-01-01"] },
		{ label: '1996', dates: ["1996-01-01", "1997-01-01"] },
		{ label: '1995', dates: ["1995-01-01", "1996-01-01"] },
		{ label: '1994', dates: ["1994-01-01", "1995-01-01"] },
		{ label: '1993', dates: ["1993-01-01", "1994-01-01"] },
	];

	//let height = window.innerHeight;

	return (
		<section id='editions'>
			<h3>Edice</h3>
			<form>
			<label><p className='mb-11'>Choose year:</p></label>
				<select value={JSON.stringify(dateEdition)} onChange={handleChange} className="form-select border mb-1">
					{options.map(option => (
						<option key={option.label} value={JSON.stringify(option.dates)}>
						{option.label}
						</option>
					))}
    			</select>
			</form>
			
			<div className="container-lg bg-white" style={{height: `${innerHeight - topSpace}px`}}>
				<div className="row">

					{magic === false ? <div className='loading'></div> :
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