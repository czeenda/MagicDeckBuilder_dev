import React, { useState } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'

function ListDnd() {

  const yourArray = [
    { id: '1', content: 'Item 1' },
    { id: '2', content: 'Item 2' },
    { id: '3', content: 'Item 3' },
    { id: '4', content: 'Item 4' },
    { id: '5', content: 'Item 5' },
    { id: '6', content: 'Item 6' },
    { id: '7', content: 'Item 7' },
    { id: '8', content: 'Item 8' },
    // Add more items as needed
  ];
  const[items,setItems] = useState(yourArray)


  const onDragEnd = (result)=>{ 
    console.log("dragging over",result);
    if(!result.destination){return;}
    const updatedList = reorder(items, result.source.index, result.destination.index);
    setItems(updatedList);
  }

  const reorder = (list, startIndex, endIndex)=>{
    const result = [...list];
    const [removed] = result.splice(startIndex,1);
    result.splice(endIndex,0,removed);
    return result;
  }

  return (
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
              {items.map((item,index)=>(
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
                        {item.content}
                      </div>
                    )
                  }
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )
        }
      </Droppable>
    </DragDropContext>
    </section>
  )
}

export default ListDnd