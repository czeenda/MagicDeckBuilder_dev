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