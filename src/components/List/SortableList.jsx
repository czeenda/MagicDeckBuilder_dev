import {useContext, useEffect, useState} from 'react';
import {MyContext} from '../../context/MyContext'

import {useAuth} from '../../context/AuthProvider'

import {supabase} from '../../supabase/client'

import Item from './Item'

const SortableList = () => {
    
  const {auth, user, logout} = useAuth()

	const {deck, setDeck} = useContext(MyContext)

	const { deckID, setDeckID} = useContext(MyContext)

	const { deckName, setDeckName} = useContext(MyContext)

  useEffect(() => {
		const loadData = async () => {
			try {
				const {data, error} = await supabase
					.from('Cards')
					.select('*')
					.eq('deck_id', deckID)
					

					console.log("ok")

					if (error) {
					console.log(error)
				} else {
					console.log("funguje")
					setDeck(data)
					console.log(data)

				}
			}
			catch (error) {
				console.log(error)
			}
		}

		loadData();
	}, [deckID])

  const saveCards = async () => {
		try {
		  // Delete cards with the specified deck_id
		  const deleteResult = await supabase
			.from('Cards')
			.delete()
			.eq('deck_id', deckID);
	  
		  // Check for errors in the delete operation
		  if (deleteResult.error) {
			console.log(deleteResult.error);
			return; // Exit the function if there's an error in the delete operation
		  }
	  
		  console.log("Deleted existing cards for deck_id:", deckID);
	  
		  // Insert new cards into the 'Cards' table
		  const insertResult = await supabase
			.from('Cards')
			.insert(deck);
	  
		  // Check for errors in the insert operation
		  if (insertResult.error) {
			console.log(insertResult.error);
		  } else {
			console.log("Inserted new cards for deck_id:", deckID);
			// setDecks(insertResult.data) // Uncomment and modify as needed
			console.log(insertResult.data);
		  }
		} catch (error) {
		  console.log(error);
		}
	  };

  
 /*  const [deck, setDeck] = useState([
      { id: 1, text: 'Item 1', url: "url", code: 'blb' },
      { id: 2, text: 'Item 2', url: "url", code: 'blb' },
      { id: 3, text: 'Item 3', url: "url", code: 'blb' },
      { id: 4, text: 'Item 4', url: "url", code: 'blb' },
      { id: 5, text: 'Item 5', url: "url", code: 'blb' }, 
    ]); */
  
    const moveItem = (dragIndex, hoverIndex) => {
      const draggedItem = deck[dragIndex];
      setDeck(prevItems => {
        const newItems = [...prevItems];
        newItems.splice(dragIndex, 1);
        newItems.splice(hoverIndex, 0, draggedItem);
        return newItems;
      });
    };

    const handleRemoveClick = (id) => {
      const updatedDeck = deck.filter((_, index) => index !== id);
      setDeck(updatedDeck);
      console.log(id)
    };
  
    if(auth){
    return (
      <>
        <h2>Tvůj deck</h2>
        
        <div>
        {deckID === false ? <p>Vyberte váš balíček</p> : <>

          {deck.map((item, index) => (
            <Item key={index} id={index} name={item.name} url={item.image_url} index={index} moveItem={moveItem} handleRemoveClick={handleRemoveClick}/>
          ))}</>}

        <div>
          <button onClick={saveCards}>Save your cards</button>
        </div>

        </div>
      </>
    )}
  };

  export default SortableList