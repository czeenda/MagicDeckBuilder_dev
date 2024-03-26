import React from 'react';

import whiteUrl from '../assets/mana/plains.svg';
import blueUrl from '../assets/mana/island.svg';
import blackUrl from '../assets/mana/swamp.svg';
import redUrl from '../assets/mana/mountain.svg';
import greenUrl from '../assets/mana/forest.svg';

import url1 from '../assets/mana/mana_1.svg';
import url2 from '../assets/mana/mana_2.svg';
import url3 from '../assets/mana/mana_3.svg';
import url4 from '../assets/mana/mana_4.svg';
import url5 from '../assets/mana/mana_5.svg';
import url6 from '../assets/mana/mana_6.svg';
import url7 from '../assets/mana/mana_7.svg';
import url8 from '../assets/mana/mana_8.svg';
import url9 from '../assets/mana/mana_9.svg';
import url10 from '../assets/mana/mana_10.svg';
import url11 from '../assets/mana/mana_11.svg';
import url12 from '../assets/mana/mana_12.svg';
import url13 from '../assets/mana/mana_13.svg';
import url14 from '../assets/mana/mana_14.svg';
import url15 from '../assets/mana/mana_15.svg';
import url16 from '../assets/mana/mana_16.svg';
import url17 from '../assets/mana/mana_17.svg';
import url18 from '../assets/mana/mana_18.svg';
import url19 from '../assets/mana/mana_19.svg';
import url20 from '../assets/mana/mana_20.svg';


const SelectCardItem = ({ name, manaCost }) => {
  const manaImages = {
    '{R}': redUrl,
    '{W}': whiteUrl,
    '{U}': blueUrl,
    '{B}': blackUrl,
    '{G}': greenUrl,
    '{1}': url1,
    '{2}': url2,
    '{3}': url3, 
    '{4}': url4, 
    '{5}': url5,
    '{6}': url6,
    '{7}': url7,
    '{8}': url8,
    '{9}': url9,
    '{10}': url10,
    '{11}': url11,
    '{12}': url12,
    '{13}': url13,
    '{14}': url14,
    '{15}': url15,
    '{16}': url16,
    '{17}': url17,
    '{18}': url18,
    '{19}': url19,
    '{20}': url20,
    // Add more as needed
  };

  const generateManaImages = () => {
    if (!manaCost) return <span></span>; // If manaCost is empty or undefined, return empty span

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
