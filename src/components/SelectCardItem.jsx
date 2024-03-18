import React from 'react';


import greenUrl from '../assets/green.svg';


const SelectCardItem = ({name, mana}) => {

	return (
		<>
			<h6 className="mb-0">{name}</h6><span>{mana} {mana.includes(`{G}`) && <img src={greenUrl} className='mana' />}</span>

		</>
	);
}

export default SelectCardItem;