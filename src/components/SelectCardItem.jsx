import React from 'react';

import whiteUrl from '../assets/mana/plains.svg';
import blueUrl from '../assets/mana/island.svg';
import blackUrl from '../assets/mana/swamp.svg';
import redUrl from '../assets/mana/mountain.svg';
import greenUrl from '../assets/mana/forest.svg';

import colorlessUrl from '../assets/mana/colorless/1.svg'


const SelectCardItem = ({name, mana}) => {

	let colorless

	if(mana.includes(`{1}`)){
		colorless = <img src={colorlessUrl} className='mana' />
	}

	let white

	if(mana.includes(`{W}`)){
		white = <img src={whiteUrl} className='mana' />
	}
	if(mana.includes(`{W}{W}`)){
		white = <><img src={whiteUrl} className='mana' /><img src={whiteUrl} className='mana' /></>
	}
	if(mana.includes(`{W}{W}{W}`)){
		white = <><img src={whiteUrl} className='mana' /><img src={whiteUrl} className='mana' /><img src={whiteUrl} className='mana' /></>
	}

	let blue

	if(mana.includes(`{U}`)){
		blue = <img src={blueUrl} className='mana' />
	}
	if(mana.includes(`{U}{U}`)){
		blue = <><img src={blueUrl} className='mana' /><img src={blueUrl} className='mana' /></>
	}
	if(mana.includes(`{U}{U}{U}`)){
		blue = <><img src={blueUrl} className='mana' /><img src={blueUrl} className='mana' /><img src={blueUrl} className='mana' /></>
	}

	let black

	if(mana.includes(`{B}`)){
		black = <img src={blackUrl} className='mana' />
	}
	if(mana.includes(`{B}{B}`)){
		black = <><img src={blackUrl} className='mana' /><img src={blackUrl} className='mana' /></>
	}
	if(mana.includes(`{B}{B}{B}`)){
		black = <><img src={blackUrl} className='mana' /><img src={blackUrl} className='mana' /><img src={blackUrl} className='mana' /></>
	}

	let red

	if(mana.includes(`{R}`)){
		red = <img src={redUrl} className='mana' />
	}
	if(mana.includes(`{R}{R}`)){
		red = <><img src={redUrl} className='mana' /><img src={redUrl} className='mana' /></>
	}
	if(mana.includes(`{R}{R}{R}`)){
		red = <><img src={redUrl} className='mana' /><img src={redUrl} className='mana' /><img src={redUrl} className='mana' /></>
	}

	let green

	if(mana.includes(`{G}`)){
		green = <img src={greenUrl} className='mana' />
	}
	if(mana.includes(`{G}{G}`)){
		green = <><img src={greenUrl} className='mana' /><img src={greenUrl} className='mana' /></>
	}
	if(mana.includes(`{G}{G}{G}`)){
		green = <><img src={greenUrl} className='mana' /><img src={greenUrl} className='mana' /><img src={greenUrl} className='mana' /></>
	}

	return (
		<>
			<h6 className="mb-0">{name}</h6>
				<span>
				{colorless}{blue}{red}{white}{black}{green}
					

				</span>

		</>
	);
}

export default SelectCardItem;