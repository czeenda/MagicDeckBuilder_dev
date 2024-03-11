import { useState } from 'react'
import {useAuth} from '../context/AuthProvider'

import {useNavigate} from 'react-router-dom'

export const Login = () => {
	const {login} = useAuth()
	const navigate = useNavigate()

	const [ email, setEmail] = useState("")
	const [ password, setPassword] = useState("")

	const [ message, setMessage] = useState("")

	const handleClick = async () =>{
		try {
			const {data, error} = await login(email, password);
			if (error) {
				console.log(error)
				setMessage("Špatný email nebo heslo.")
			}
			if (data.user && data.session) {
				console.log('prihlaseny', data.user)
				// prihlaseneho uzivatele presmerujeme na home
				navigate('/')
			}
		}
		catch (error) {
			console.log(error)
		}

	}

	return (
		<>
			<h2>Login</h2>
			{message}
			<form>
				<input type="text" value={email} onChange={(event) => setEmail(event.target.value)} />
				<input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
			</form>
			<button onClick={handleClick}>Prihlasit se</button>
		</>
	)
}

export default Login;