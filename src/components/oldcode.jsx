{deckID === false ? <p>Vyberte váš balíček</p> : <>
           <p>User: {user.id}</p>
          <p>Balíček: {deckName}</p>
          <p>ID: {deckID}</p>
          <ul>
            {deck.map((element, id) => (


            <li key={id}>{id +1}. 
              ID:{element.card_id} <br/>
              Name:{element.name} <br/>
              Deck ID: {element.deck_id} <br/>
              Image:{element.image_url} <br/>
              Price:{element.price} <br/>
              Code:{element.edition_code} <br/>
              <span onClick={() => handleRemoveClick(id)}>X</span>
            </li>

  
          ))}</ul>
  

          </>}



{deck.filter((element) => element.type.includes("Land")).map((item, index) => (
  <Item key={index} id={index} name={item.name} url={item.image_url} index={index} type={item.type} moveItem={moveItem} handleRemoveClick={handleRemoveClick}/>
))}