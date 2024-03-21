import {useContext, useEffect, useState} from 'react';
import {Link} from 'react-router-dom'

import {MyContext} from '../../context/MyContext'

import {useAuth} from '../../context/AuthProvider'

import {supabase} from '../../supabase/client'

import Item from './Item'

const SortableList = () => {
    
  	const {auth, user, logout} = useAuth()

	const {deck, setDeck} = useContext(MyContext)

	const { deckID, setDeckID} = useContext(MyContext)

	const { deckName, setDeckName} = useContext(MyContext)

  	const [ newDeckName, setNewDeckName] = useState(deckName)

  	const { renamed, setRenamed} = useContext(MyContext)


  useEffect(() => {
		const loadData = async () => {
			try {
				const {data, error} = await supabase
					.from('Cards2')
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

	useEffect(() => {
		setNewDeckName(deckName)
	}, [deckID])

	useEffect(() => {
		console.log(deck)
		

	},[deck])

  //const lands = deck.filter((element) => element.type.includes("Land"))

	const saveCards = async () => {
			try {
			// Delete cards with the specified deck_id
			const deleteResult = await supabase
				.from('Cards2')
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
				.from('Cards2')
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
  
    const moveItem = (dragIndex, hoverIndex) => {
      const draggedItem = deck[dragIndex];
      setDeck(prevItems => {
        const newItems = [...prevItems];
        newItems.splice(dragIndex, 1);
        newItems.splice(hoverIndex, 0, draggedItem);
        return newItems;
      });
	  console.log(deck)
    };

    const handleRemoveClick = (id) => {
      const updatedDeck = deck.filter((_, index) => index !== id);
      setDeck(updatedDeck);
      console.log(id)
    };

	
	const handleRename = async () => {
		const { data, error } = await supabase
		.from('Decks')
		.update({ name: newDeckName})
		.eq('id', deckID)
		.select()

		setRenamed(data)

		
		if (error) {
			console.error(error);
		} else {
			console.log(data);
		}

	};

    
  
    if(auth){
    return (
        <div id="workon">
        
          {deckName && 
          
          <div className='w-100 d-flex flex-rows'>

            {/* <h4 className='d-inline-block my-auto'>{newDeckName}</h4> */}
            <div className="input-group">
  				    <input type="text" className="form-control border" placeholder="Name of new deck" aria-label="Recipient's username" aria-describedby="button-addon2"
				      value={newDeckName} onChange={(e) => setNewDeckName(e.target.value)} />
  				    <button className="btn btn-outline-secondary" type="button" /* id="button-addon2" */ onClick={handleRename}>Přejmenovat</button>
			    </div>

            <button onClick={saveCards} className={`d-inline-block mb-0 btn ${deck ? "btn-primary" : "btn-danger"} ms-1`}>Uložit karty</button>
            
            
	        </div>}

          {deckID === false ? <Link to="/">Vyberte váš balíček</Link> : 
          <div>
            <div className='cards mt-1'>

            {deck.map((item, index) => (
              <Item key={index} id={index} name={item.name} url={item.image_url} index={index} type={item} moveItem={moveItem} handleRemoveClick={handleRemoveClick}/>
            ))}
            
            </div>

            {/* <div className='cards creatures'>

            {deck.map((item, index) => (
              <Item key={index} id={index} name={item.name} url={item.image_url} index={index} type={item} moveItem={moveItem} handleRemoveClick={handleRemoveClick}/>
            ))}
            
            </div> */}
            
            </div>}

        

        </div>
        
    )}
  };

  export default SortableList