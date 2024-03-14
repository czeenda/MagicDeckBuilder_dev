import React, { useContext } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import {MyContext} from '../../context/MyContext'



const ItemType = 'ITEM';

const Item = ({ id, name, url, index, moveItem, handleRemoveClick }) => {

  const {cardPeview, setCardPreview} = useContext(MyContext)


    const [{ isDragging }, drag] = useDrag({
      type: ItemType, // Define the type here
      item: { id, index },
      collect: monitor => ({
        isDragging: monitor.isDragging(),
      }),
    });
  
    const [, drop] = useDrop({
      accept: ItemType,
      hover(item, monitor) {
        if (!dragRef.current) {
          return;
        }
        const dragIndex = item.index;
        const hoverIndex = index;
        if (dragIndex === hoverIndex) {
          return;
        }
        moveItem(dragIndex, hoverIndex);
        item.index = hoverIndex;
      },
    });

   
  
    const dragRef = React.useRef(null);
    drag(drop(dragRef));
  
    return (
      <>

      <div class="card-box d-inline-block" style={{top: `${id * 2}rem` }} 

      onMouseEnter={() => setCardPreview(url)} onMouseLeave={() => setCardPreview()}>

        <div className='w-100 h-100 full'>

          <img src={url} className='magic' />
          
        {/* {id + 1} {name} {url} */}
        <div className='card-x position-absolute w-100' ref={dragRef} style={{cursor: 'move'}}>
        
        </div>
        <div className='x text-center d-flex justify-content-center align-item-center' onClick={() => handleRemoveClick(id)}>x</div>
        </div>
      </div>
      

      </>

    );
  };

  export default Item;