import {useAuth} from './../context/AuthProvider'


const Home = () => {
	const {auth, user, logout} = useAuth()

	return (
		<>
			<h2>Balíčky</h2>
			<p>Zde budou vidět balíčky přihlášeného uživatle.</p>

			<button onClick={()=>{ logout()  }}>Odhlasit se</button>
		</>
	);
}

export default Home;