import {useContext, useEffect, useState, useRef} from 'react';
import {Link} from 'react-router-dom'

import {MyContext} from '../../context/MyContext'

import {useAuth} from '../../context/AuthProvider'

import {supabase} from '../../supabase/client'

import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'

function TaskList() {

  const {auth, user, logout} = useAuth()

	const { deck, setDeck} = useContext(MyContext)

	const { deckID, setDeckID} = useContext(MyContext)

	const { deckName, setDeckName} = useContext(MyContext)

  	const { renamed, setRenamed} = useContext(MyContext)

	const { addedCard, setAddedCard} = useContext(MyContext)

	const { moved, setMoved} = useContext(MyContext)


	//const [ saved, setSaved] = useState(false)

	const [ newDeckName, setNewDeckName] = useState(deckName)

	

	const isFirstRun = useRef(true)
	
	//const isFirstRunComp = useRef(true)

  useEffect(() => {

		// Skip the first run (mount)
		/* if (isFirstRunComp.current) {
			isFirstRunComp.current = false;
			return;
		  } */

		const loadData = async () => {
			try {
				const {data, error} = await supabase
					.from('Cards2')
					.select('*')
					.eq('deck_id', deckID)
					

					//console.log("ok")

					if (error) {
					console.log(error)
				} else {
					console.log("načteno")
					setDeck(data)
					console.log(data)

				}
			}
			catch (error) {
				console.log(error)
			}
		}

		loadData();
		
	}, [])

 /*  const yourArray = [
    { id: '1', content: 'Item first' },
    { id: '2', content: 'Item 2' },
    { id: '3', content: 'Item 3' },
    { id: '4', content: 'Item 4' },
    { id: '5', content: 'Item 5' },
    { id: '6', content: 'Item 6' },
    { id: '7', content: 'Item 7' },
    { id: '8', content: 'Item 8' },
    // Add more items as needed
  ]; */
  //const[items,setItems] = useState(yourArray)

  useEffect(() => {
    console.log(deck)
  },[deck])

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

  const onDragEnd = (result)=>{
    console.log("dragging over",result);
    if(!result.destination){return;}
    const updatedList = reorder(deck, result.source.index, result.destination.index);
    setDeck(updatedList);
  }

  const reorder = (list, startIndex, endIndex)=>{
    const result = [...list];
    const [removed] = result.splice(startIndex,1);
    result.splice(endIndex,0,removed);
    return result;
    
  }

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
  setAddedCard(prev => !prev)
    console.log(id)
  };

  if(auth){
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
            
            
	        </div>}
          
          <section id="draggable">
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId='draggable'>
        {
          (provided,snapshot)=>(
            <div 
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`list ${snapshot.isDraggingOver ? 'draggingOver':''}`}
            >
              {deck.map((item,index)=>(
                <div className='card'
                
                style={{
                  marginLeft: index + 1 <= 15 ? "0" : (index + 1 > 45 ? "39rem" : (index + 1 > 30 ? "26rem" : "13rem")),
                  //top: index >= 15 && "-30rem"
                  }}
                
                >
                  <img src={item.image_url} />
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {
                    (provided,snapshot)=>(
                      <div 
                      className={`item ${snapshot.isDragging ? 'dragging':''}`}

                      style={provided.draggableProps.style}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      >
                      <div 
                      style={{
                        //border: "solid 1px red", 
                        width: "100%", 
                        height: "2rem",
                        backgroundImage: `url(${item.image_url})`,
                        backgroundSize: "100%",
                        borderTopLeftRadius: ".6rem",
                        borderTopRightRadius: ".6rem",
                      }}
                      >
                      </div>
                      <div className='x' onClick={() => {handleRemoveClick(index); setCardPreview()}}>{index + 1}</div>
                      </div>
                    )
                  }
                </Draggable>
                
                </div>
              ))}
              
              {provided.placeholder}
              
            </div>
          )
        }
      </Droppable>
    </DragDropContext>
    </section>
    
    </section>
  )}
}

export default TaskList