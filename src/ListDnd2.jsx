import React, { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

function ListDnd2() {
  const items = [
    { id: '1', content: 'Item 1' },
    { id: '2', content: 'Item 2' },
    { id: '3', content: 'Item 3' },
    { id: '4', content: 'Item 4' },
    { id: '5', content: 'Item 5' },
    { id: '6', content: 'Item 6' },
    { id: '7', content: 'Item 7' },
    { id: '8', content: 'Item 8' },
    { id: '9', content: 'Item 9' },
    { id: '10', content: 'Item 10' },
    { id: '11', content: 'Item 11' },
    { id: '12', content: 'Item 12' },
    { id: '13', content: 'Item 13' },
    { id: '14', content: 'Item 14' },
    { id: '15', content: 'Item 15' },
    { id: '16', content: 'Item 16' },
    { id: '17', content: 'Item 17' },
    { id: '18', content: 'Item 18' },
    { id: '19', content: 'Item 19' },
    { id: '20', content: 'Item 20' },
    { id: '21', content: 'Item 21' },
    { id: '22', content: 'Item 22' },
    { id: '23', content: 'Item 23' },
    { id: '24', content: 'Item 24' },
    { id: '25', content: 'Item 25' },
    { id: '26', content: 'Item 26' },
    { id: '27', content: 'Item 27' },
    { id: '28', content: 'Item 28' },
    { id: '29', content: 'Item 29' },
    { id: '30', content: 'Item 30' },
  ];
  

  const [columns, setColumns] = useState({
    column1: items.slice(0, 15),
    column2: items.slice(15, 30),
    column3: items.slice(30, 40),
    column4: items.slice(40, 45)
  });

  const onDragEnd = (result) => {
    console.log("dragging over", result);
    const { source, destination } = result;

    if (!destination) return;

    const startColumn = columns[source.droppableId];
    const finishColumn = columns[destination.droppableId];

    const newStartColumn = [...startColumn];
    const newFinishColumn = [...finishColumn];

    const [removed] = newStartColumn.splice(source.index, 1);
    newFinishColumn.splice(destination.index, 0, removed);

    const newColumns = {
      ...columns,
      [source.droppableId]: newStartColumn,
      [destination.droppableId]: newFinishColumn
    };

    setColumns(newColumns);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div style={{ display: 'flex' }}>
        {Object.keys(columns).map((columnId, columnIndex) => (
          <Droppable key={columnId} droppableId={columnId}>
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={`list ${snapshot.isDraggingOver ? 'draggingOver' : ''}`}
              >
                {columns[columnId].map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        className={`item ${snapshot.isDragging ? 'dragging' : ''}`}
                        style={provided.draggableProps.style}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        {item.content}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
}

export default ListDnd2;
