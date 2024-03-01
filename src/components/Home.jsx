import {useAuth} from './../context/AuthProvider'


const Home = () => {
	const {auth, user, logout} = useAuth()

	return (
		<>
			<h2>Home</h2>
			<p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magnam provident iusto deleniti nulla nihil quasi quae pariatur, architecto hic aspernatur.</p>

			<button onClick={()=>{ logout()  }}>Odhlasit se</button>
		</>
	);
}

export default Home;