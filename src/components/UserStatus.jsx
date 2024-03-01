import {useAuth} from './../context/AuthProvider'
import Login from "./Login"

const UserStatus = () => {
	const {auth, user, logout} = useAuth()

	return (
		<div style={{border: '5px solid blue', margin: '1em', padding: '1em'}}>

			{auth
			 ? <>
			 		<h2>Uživatel je přihlášený</h2>
					<p>{user.email}</p>
					<button onClick={()=>{ logout()  }}>Odhlásit</button>
			   </>
			 : <>
			 		<h2>Nenní přihlášený</h2>
					 <Login />
			   </>
			}


		</div>
	);
}

export default UserStatus;