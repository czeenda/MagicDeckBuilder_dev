import React, { useContext } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import {MyContext} from '../../context/MyContext'



const Item = ({ id, name, url, index, from, moveItem, handleRemoveClick }) => {

  const {cardPeview, setCardPreview} = useContext(MyContext)

  const ItemType = 'ITEM';


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

      <div className="card-box d-inline-block" style={{

    top: `${index + 1 > 45 ? index * 2 - 90 : (index + 1 > 30 ? index * 2 - 60 : (index >= 15 ? index * 2 - 30 : index * 2))}rem`,
    left: index + 1 <= 15 ? "0" : (index + 1 > 45 ? "39rem" : (index + 1 > 30 ? "26rem" : "13rem"))
    }}

      onMouseEnter={() => setCardPreview(url)} onMouseLeave={() => setCardPreview()}>

        <div className='w-100 h-100 full'>

          <img src={url} className='magic p-0' />
          
        {/* {id + 1} {name} {url} */}
        <div className='card-x position-absolute w-100' ref={dragRef} style={{cursor: 'move', opacity: isDragging ? 0.1 : 1}} >
  
        </div>
        <div className='x text-center d-flex justify-content-center align-item-center' onClick={() => {handleRemoveClick(index); setCardPreview()}}>x</div>
        
        </div>
      </div>
      

      </>

    );
  };

  export default Item;