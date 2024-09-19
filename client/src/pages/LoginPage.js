import React, { useContext } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../userContext';


// POST REQ. SEND USING AXIOS BELOW

// async function login(e) {
//   e.preventDefault();

//   try {
//     const response = await axios.post('http://localhost:4000/login', { username, password });

//     if (response.status === 200) { 
//       // Authentication was successful; you can redirect the user or perform other actions here.
//       console.log('Login successful'); 
//     } else {
//       // Handle authentication failure (e.g., show an error message)
//       console.error('Login failed');
//     }
//   } catch (error) { 
//     // Handle network or other errors
//     console.error('Network error:', error); 
//   }
// }


const LoginPage = () => {

  const {setUserInfo} = useContext(UserContext);

  const [alertF, setalertF] = useState('popAlert');
  const [alertS, setalertS] = useState('popAlert');

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const nav = useNavigate();

  async function login(e){
    e.preventDefault();

    const response = await fetch('http://localhost:4000/login', {
      method: 'POST',
      body: JSON.stringify( {username,password} ),
      headers: {'Content-Type': 'application/json'},
      credentials: 'include'
    });

    if( response.status === 200 ){
      // this changes the navbar from login to logout.
      // setUserInfo that is in context api, its value changes
      response.json().then( userInfo => {
        setUserInfo(userInfo);
      })

      // Set the notification CSS properties to make it visible
      setalertS('alertSshow');

      // Delay the navigation by 10 seconds to allow the notification to be shown
      setTimeout(() => {
        nav("/");
      }, 5000);

      // After 10 seconds, set the notification CSS properties back to the original
      setTimeout(() => {
        setalertS('popAlert');
      }, 4000);
    }

    else{
      setalertF('alertFshow');
      setUsername('');
      setPassword('');

      setTimeout(() => {
        setalertF('popAlert');
      }, 10000);
    }
  }
  

  return ( 
    <>
      {/* For Alert if error occurs during Login */}
      <div className={alertF}>
          <img className='caution' alt='⚠' src='./caution.png' /> &nbsp; Login Failed !!!
      </div>

      {/* For Alert if user is Logged-in successfully */}
      <div className={alertS}>
          &ensp; <img className='congo' alt='🎊' src='./congratulation-1.png' /> &nbsp; Successfully Logged-in &nbsp; <img className='congo' alt='🎉' src='./congratulation-2.png' /> &ensp; 
      </div>

      {/* Login Form */}
      <form className='login' onSubmit={login}>
        <h1 className='login_h' > Login </h1>
        <input type='text' 
          placeholder='Username'
          value={username}
          onChange={e => setUsername(e.target.value) }
        />
        <input type='password' 
          placeholder='Password'
          value={password}
          onChange={e => setPassword(e.target.value) }
        />
        <button className='reg_btn'> Login </button>
      </form>
    </>
  )
}

export default LoginPage