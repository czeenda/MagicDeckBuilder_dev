 import {useAuth} from '../context/AuthProvider'

import {useNavigate} from 'react-router-dom'

export const Login = () => {
	const {login} = useAuth()
	const navigate = useNavigate()

	const handleClick = async () =>{
		try {
			const {data, error} = await login('j.seycek@gmail.com', '123qwe');
			if (error) {
				console.log(error)
			}
			if (data.user && data.session) {
				// console.log('prihlaseny', data.user)
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
			<button onClick={handleClick}>Prihlasit se</button>
		</>
	)
}

export default Login;