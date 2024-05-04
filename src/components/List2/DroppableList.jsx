import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';


const DroppableList = ({ droppableId, items, setItems, handleRemoveClick, setCardPreview }) => (
  
    <Droppable droppableId={droppableId}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className={`list ${snapshot.isDraggingOver ? 'draggingOver' : ''}`}
          style={{ flex: 1, margin: 4}}
        >
          {items.map((item, index) => (
            <div className='cardd' /* style={{backgroundImage: `url('${item.image_url}')`}} */
            onMouseEnter={() => setCardPreview("karta")} onMouseLeave={() => setCardPreview()}
            >
              
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