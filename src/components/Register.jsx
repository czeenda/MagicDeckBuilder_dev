import { useState } from 'react'
import {useAuth} from '../context/AuthProvider'


export const Register = () => {
	const {register} = useAuth()

	const [ email, setEmail] = useState("@")
	const [ password, setPassword] = useState("")

	const handleClick = () =>{

		try {
			const {data, error} = register(email, password)

			if (!error && data) {
				console.log("Registration Successful. Check your email to confirm your account");
			}
		}
		catch (error) {
			console.log("Error in Creating Account");
		}

	}

	return (
		<>

			<h2>Registrace</h2>

			<form>
				<input type="text" className='form-control border mb-11' value={email} onChange={(event) => setEmail(event.target.value)} />
				<input type="password" className='form-control border mb-11' value={password} onChange={(event) => setPassword(event.target.value)} />
				
			</form>

			<button className="btn btn-secondary" onClick={handleClick}>Registrovat</button>

		</>
	)
}

export default Register;