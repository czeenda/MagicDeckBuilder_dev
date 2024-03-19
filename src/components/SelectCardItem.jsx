import React from 'react';


import greenUrl from '../assets/mana/forest.svg';


const SelectCardItem = ({name, mana}) => {

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
					{green}
					

				</span>

		</>
	);
}

export default SelectCardItem;