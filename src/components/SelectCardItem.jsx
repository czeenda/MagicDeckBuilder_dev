import React from 'react';

import whiteUrl from '../assets/mana/plains.svg';
import blueUrl from '../assets/mana/island.svg';
import blackUrl from '../assets/mana/swamp.svg';
import redUrl from '../assets/mana/mountain.svg';
import greenUrl from '../assets/mana/forest.svg';

//import colorlessUrl from '../assets/mana/colorless/1.svg'


const SelectCardItem = ({name, manaCost}) => {

	const manaImages = {
    '{R}': redUrl,
    '{W}': whiteUrl,
    '{U}': blueUrl,
    '{B}': blackUrl,
    '{G}': greenUrl,
    // Přidejte další barevné mana symboly podle potřeby
  };	



  // Funkce pro zpracování symbolů many a generování obrázků
  const generateManaImages = () => {
	const manaSymbols = manaCost.match(/({[A-Z]})|({\d+})/g); // Updated regular expression
	if (!manaSymbols) return null; // If no mana symbols found, return null
  
	return manaSymbols.map((symbol, index) => {
	  if (symbol.match(/{\d+}/)) { // If symbol is colorless
		const number = parseInt(symbol.slice(1, -1));
		return <img key={`colorless-${number}`} src={`../src/assets/mana/colorless/mana_${number}.svg`} className='mana' /* alt={`{${number}}`} */ />;
	  } else { // If symbol is colored
		return <img key={index} src={manaImages[symbol]} className='mana' /* alt={symbol} */ />;
	  }
	});
  };

	return (
		<>
			<h6 className="mb-0 pt-11">{name}</h6>
				<span>
				{generateManaImages()}
				</span>

		</>
	);
}

export default SelectCardItem;