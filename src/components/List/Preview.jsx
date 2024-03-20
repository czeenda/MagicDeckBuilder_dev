import {useContext, useEffect, useState} from 'react';
import {MyContext} from '../../context/MyContext'

import {supabase} from '../../supabase/client'


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
					.from('Cards2')
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

	const empty = () => {
		logout()
		setDeckID(false)
		setDeckName(false)
	  }

  
    if(auth){
    return (
      <>
        <section id='preview'>
			
			<div className='w-100 px-1 mt-12'>
				<img src={cardPreview} alt="" className='magic mt-3 me-1' />
			</div>

        

        </section>
        
      </>
    )}
  };

  export default Preview