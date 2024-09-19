import React, { useState } from 'react'

const RegisterPage = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [alertF, setalertF] = useState('popAlert');
    const [alertS, setalertS] = useState('popAlert');

    async function register(e) {
        e.preventDefault();

        const response = await fetch('http://localhost:4000/register', {    // http request to backend
            method: 'POST', 
            body: JSON.stringify({username,password}),
            headers: {'Content-Type': 'application/json'},
        });

        if( response.status === 200 ){
            // className is changed to change the css properties so notificaiton will be visible
            setalertS('alertSshow');    

            setTimeout(() => {
                setalertS('popAlert');  
            }, 10000);  // after 10 sec. set className to original to remove popup
            console.log(response);
        }
        else{
            setalertF('alertFshow');

            setTimeout(() => {
              setalertF('popAlert');
            }, 10000);
        }

        setUsername('');
        setPassword('');
    }
    
    return (
        <>
            {/* For Alert if error occurs during Registration */}
            <div className={alertF}>
                <img className='caution' alt='⚠' src='./caution.png' /> &nbsp; Registration Failed !!!
            </div>

            {/* For Alert if user is Registered successfully */}
            <div className={alertS}>
                &ensp; <img className='congo' alt='🎊' src='./congratulation-1.png' /> &nbsp; Registration Successful &nbsp; <img className='congo' alt='🎉' src='./congratulation-2.png' /> &ensp; 
            </div>

            {/* Registration Form */}
            <form className='register' onSubmit={register}>
                <h1 className='register_h' > Register </h1>
                <input type='text'
                    placeholder='Username'  
                    value={username} 
                    onChange={e => setUsername(e.target.value) } />
                <input type='password' 
                    placeholder='Password'
                    value={password}
                    onChange={e => setPassword(e.target.value) }/>
                <button className='reg_btn'> Register </button>
            </form>
        </>
  )
}

export default RegisterPage