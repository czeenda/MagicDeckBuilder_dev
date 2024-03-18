import React, { useContext } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import {MyContext} from '../../context/MyContext'



const ItemType = 'ITEM';

const Item = ({ id, name, url, index, type, from, moveItem, handleRemoveClick }) => {

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

      <div className="card-box d-inline-block" style={{

    top: `${id + 1 > 45 ? id * 2 - 90 : (id + 1 > 30 ? id * 2 - 60 : (id >= 15 ? id * 2 - 30 : id * 2))}rem`,
    left: id + 1 <= 15 ? "0" : (id + 1 > 45 ? "39rem" : (id + 1 > 30 ? "26rem" : "13rem"))
    }}

      onMouseEnter={() => setCardPreview(url)} onMouseLeave={() => setCardPreview()}>

        <div className='w-100 h-100 full'>

          <img src={url} className='magic p-0' />
          
        {/* {id + 1} {name} {url} */}
        <div className='card-x position-absolute w-100' ref={dragRef} style={{cursor: 'move'}} >
  
        </div>
        <div className='x text-center d-flex justify-content-center align-item-center' onClick={() => {handleRemoveClick(id, from); setCardPreview()}}>x</div>
        
        </div>
      </div>
      

      </>

    );
  };

  export default Item;