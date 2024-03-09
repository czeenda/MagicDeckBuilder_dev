import {useAuth} from '../context/AuthProvider'


export const Register = () => {
	const {register} = useAuth()

	const handleClick = () =>{
		try {
			const {data, error} = register('j.seycek@gmail.com','123qwe ')

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

			<button onClick={handleClick}>Registrovat</button>

		</>
	)
}

export default Register;