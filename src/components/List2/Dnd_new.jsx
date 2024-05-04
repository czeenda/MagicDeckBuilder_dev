import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { MyContext } from '../../context/MyContext';
//import { useAuth } from '../../context/AuthProvider';
import { supabase } from '../../supabase/client';

const DroppableList = ({ droppableId, items, setItems, handleRemoveClick }) => (
  
      <Droppable droppableId={droppableId}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`list ${snapshot.isDraggingOver ? 'draggingOver' : ''}`}
            style={{ flex: 1, margin: 4}}
          >
            {items.map((item, index) => (
              <div className='cardd' /* style={{backgroundImage: `url('${item.image_url}')`}} */>
                
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided, snapshot) => (
                  <div
                    className={`item ${snapshot.isDragging ? 'dragging' : ''}`}
                    style={{
                      ...provided.draggableProps.style,
                      marginBottom: 4}}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}

                  >
                    <div className='draggable-area' style={{backgroundImage: `url('${item.image_url}')`}}>
                    <div className='x position-absolute p-1 flex-column justify-content-center align-item-center' onClick={() => {handleRemoveClick(index)/* ; setCardPreview() */}}><div className='mx-auto'>x</div></div>
                    </div>
                    <img src={item.image_url} className='cardd-image position-absolute'/>
                  </div>
                )}
              </Draggable>
              </div>
              
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    
);

function Dnd() {
  const { deck, setDeck, deckID, setDeckID, deckName, setRenamed, setShowButton } = useContext(MyContext);
  //const { auth } = useAuth();
  const [newDeckName, setNewDeckName] = useState(deckName);
  const isFirstRun = useRef(true);

 // Rozdělení decku na čtyři části po 15 kartách
 const [firstItems, setFirstItems] = useState(deck.slice(0, 15));
 const [secondItems, setSecondItems] = useState(deck.slice(15, 30));
 const [thirdItems, setThirdItems] = useState(deck.slice(30, 45));
 const [fourthItems, setFourthItems] = useState(deck.slice(45, 60));

  
// načíst data při každé změně
/*   useEffect(() => {
    const loadData = async () => {
      try {
        const { data, error } = await supabase
          .from('Cards2')
          .select('*')
          .eq('deck_id', deckID);

        if (error) {
          console.log(error);
        } else {
          console.log("Loaded data");
          setDeck(data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    loadData();
  }, []); */

  useEffect(() => {
		// Skip the first run (mount)
		if (isFirstRun.current) {
		  isFirstRun.current = false;
		  return;
		}
	  
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
			  console.log("Inserted new cards for deck_id:", deckID, deckName);
			  // setDecks(insertResult.data) // Uncomment and modify as needed
			  console.log(insertResult.data);
			}
		  } catch (error) {
			console.log(error);
			//setSaved(prev => !prev);
		  }
		};
	  
		saveCards();
		console.log("uloženo");
		console.log(deck);
		setDeckID(deckID)
	  
	  },[deck]);
  


    useEffect(() => {
      // Při změně decku, rozděl jej znovu do čtyř částí po 15 kartách
      setFirstItems(deck.slice(0, 15));
      setSecondItems(deck.slice(15, 30));
      setThirdItems(deck.slice(30, 45));
      setFourthItems(deck.slice(45, 60));
    }, [deck]);

  const onDragEnd = useCallback((result) => {
    const { source, destination } = result;
    if (!destination) return;
  
    const getItemList = (droppableId) => {
      switch (droppableId) {
        case 'first':
          return [firstItems, setFirstItems];
        case 'second':
          return [secondItems, setSecondItems];
        case 'third':
          return [thirdItems, setThirdItems];
        case 'fourth':
          return [fourthItems, setFourthItems];
        default:
          return [];
      }
    };
  
    const moveItem = (sourceItems, destinationItems) => {
      const [removed] = sourceItems.splice(source.index, 1);
      destinationItems.splice(destination.index, 0, removed);
    };
  
    if (source.droppableId === destination.droppableId) {
      const [items, setItems] = getItemList(source.droppableId);
      const newItems = Array.from(items);
      moveItem(newItems, newItems);
      setItems(newItems);
    } else {
      const [sourceItems, setSourceItems] = getItemList(source.droppableId);
      const [destinationItems, setDestinationItems] = getItemList(destination.droppableId);
      const movedItem = sourceItems[source.index];
      moveItem(sourceItems, destinationItems);
      setSourceItems(sourceItems);
      setDestinationItems(destinationItems);
  
      // If dragging between different droppables, update the 'deck' state
      const combinedItems = [
        ...firstItems,
        ...secondItems,
        ...thirdItems,
        ...fourthItems
      ];
      setDeck(combinedItems);
    }
  }, [firstItems, secondItems, thirdItems, fourthItems, setDeck]);



  const handleRename = async (event) => {
		event.preventDefault()

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
			//setShowButton(prev => !prev)
		}
		document.activeElement.blur();

	};

  useEffect(() => {
		setNewDeckName(deckName)
	}, [deckID])

  const handleRemoveClick = (id) => {
    const updatedDeck = deck.filter((_, index) => index !== id);
    setDeck(updatedDeck);
    setAddedCard(prev => !prev);
    console.log(id);
  };
  
  return (

    <section id="workon">
    {deckID && 
    
    <div className='w-100 d-flex flex-rows'>

            {/* <h4 className='d-inline-block my-auto'>{newDeckName}</h4> */}
			<form onSubmit={handleRename}>
            	<div className="input-group">
  				    <input type="text" className="form-control border" placeholder="Name of new deck" aria-label="Recipient's username" aria-describedby="button-addon2"
				      value={newDeckName} onChange={(e) => setNewDeckName(e.target.value)} onClick={() => setShowButton(prev => !prev)}/>
			    </div>
				<button className="btn btn-outline-secondary d-none" type="submit" /* id="button-addon2" */ >Přejmenovat</button>

			</form>

			<h5 className='my-auto mx-1'>{deck.length}/60</h5>

        	{/* <button onClick={saveAndLoadData} className={`d-inline-block mb-0 btn ${!moved ? "d-none" : "btn-danger"} ms-1`}>Uložit karty</button> */}
            
            
	        </div>

    }

    
      

      <DragDropContext onDragEnd={onDragEnd}>
        <div style={{ display: 'flex' }}>
          <DroppableList droppableId="first" items={firstItems} setItems={setFirstItems} handleRemoveClick={handleRemoveClick} />
          <DroppableList droppableId="second" items={secondItems} setItems={setSecondItems} handleRemoveClick={handleRemoveClick}  />
          <DroppableList droppableId="third" items={thirdItems} setItems={setThirdItems} handleRemoveClick={handleRemoveClick} />
          <DroppableList droppableId="fourth" items={fourthItems} setItems={setFourthItems} handleRemoveClick={handleRemoveClick} />
        </div>
      </DragDropContext>

    
      <div>{/* Render any additional components */}</div>
    
    </section>
  );
}

export default Dnd;
