import {useContext, useEffect, useState} from 'react';
import {MyContext} from '../../context/MyContext'

import {useAuth} from '../../context/AuthProvider'


const Preview = () => {
    
  const {auth, user, logout} = useAuth()

	const {deck, setDeck} = useContext(MyContext)

	const { deckID, setDeckID} = useContext(MyContext)

	const { deckName, setDeckName} = useContext(MyContext)

	const { cardPreview, setCardPreview} = useContext(MyContext)

  useEffect(() => {
		const loadData = async () => {
			try {
				const {data, error} = await supabase
					.from('Cards')
					.select('*')
					.eq('deck_id', deckID)
					

					console.log("ok")

					if (error) {
					console.log(error)
				} else {
					console.log("funguje")
					setDeck(data)
					console.log(data)

				}
			}
			catch (error) {
				console.log(error)
			}
		}

		loadData();
	}, [deckID])

  
    if(auth){
    return (
      <>
        <section className='row preview'>

        <img src={cardPreview} alt="" className='magic' />

        </section>
        
      </>
    )}
  };

  export default Preview