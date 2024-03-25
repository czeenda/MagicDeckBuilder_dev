import React from 'react';

import whiteUrl from '../assets/mana/plains.svg';
import blueUrl from '../assets/mana/island.svg';
import blackUrl from '../assets/mana/swamp.svg';
import redUrl from '../assets/mana/mountain.svg';
import greenUrl from '../assets/mana/forest.svg';

const SelectCardItem = ({ name, manaCost }) => {
  const manaImages = {
    '{R}': redUrl,
    '{W}': whiteUrl,
    '{U}': blueUrl,
    '{B}': blackUrl,
    '{G}': greenUrl,
    '{1}': '../src/assets/mana/colorless/mana_1.svg', // Example for {1}
    '{2}': '../src/assets/mana/colorless/mana_2.svg', // Example for {2}
    '{3}': '../src/assets/mana/colorless/mana_3.svg', // Example for {3}
    '{4}': '../src/assets/mana/colorless/mana_4.svg', // Example for {4}
    '{5}': '../src/assets/mana/colorless/mana_5.svg', // Example for {5}
    '{6}': '../src/assets/mana/colorless/mana_6.svg', // Example for {6}
    '{7}': '../src/assets/mana/colorless/mana_7.svg', // Example for {7}
    '{8}': '../src/assets/mana/colorless/mana_8.svg', // Example for {8}
    '{9}': '../src/assets/mana/colorless/mana_9.svg', // Example for {9}
    '{10}': '../src/assets/mana/colorless/mana_10.svg', // Example for {10}
    '{11}': '../src/assets/mana/colorless/mana_11.svg', // Example for {11}
    '{12}': '../src/assets/mana/colorless/mana_12.svg', // Example for {12}
    '{13}': '../src/assets/mana/colorless/mana_13.svg', // Example for {13}
    '{14}': '../src/assets/mana/colorless/mana_14.svg', // Example for {14}
    '{15}': '../src/assets/mana/colorless/mana_15.svg', // Example for {15}
    '{16}': '../src/assets/mana/colorless/mana_16.svg', // Example for {16}
    '{17}': '../src/assets/mana/colorless/mana_17.svg', // Example for {17}
    '{18}': '../src/assets/mana/colorless/mana_18.svg', // Example for {18}
    '{19}': '../src/assets/mana/colorless/mana_19.svg', // Example for {19}
    '{20}': '../src/assets/mana/colorless/mana_20.svg', // Example for {20}
    // Add more as needed
  };

  const generateManaImages = () => {
    const manaSymbols = manaCost.match(/{[^{}]+}/g); // Regular expression to match symbols within {}
    if (!manaSymbols) return null; // If no mana symbols found, return null

    return manaSymbols.map((symbol, index) => {
      if (manaImages[symbol]) { // If symbol matches any defined mana image
        return <img key={index} src={manaImages[symbol]} className='mana' alt={symbol} />;
      } else { // If symbol doesn't match any defined image, render symbol as text
        return <span key={index} className='mana'>{symbol}</span>;
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
};

export default SelectCardItem;
