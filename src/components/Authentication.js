import React from 'react'
import  "../css/Auth.css"
import EmailIcon from '@mui/icons-material/Email';
import LockPersonIcon from '@mui/icons-material/LockPerson';
// import Navbar from '../Components/Navbar/Navbar';
import Person3Icon from '@mui/icons-material/Person3';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import Navbar from './Navbar/Navbar';
const Authentication = () => {
     
    const registerLink = ()=>{
        const login = document.getElementById('login')
        const register = document.getElementById('register')
        const wrapper = document.getElementById('wrapper')
        login.style.display="none"
        register.style.position="relative"
        register.style.left="-410px"
    }

    const loginLink = ()=>{
        const login = document.getElementById('login')
        const register = document.getElementById('register')
        const wrapper = document.getElementById('wrapper')
        login.style.display="block"
        register.style.position="absolute"
        register.style.left="0px"
    }

    return (
        <>
            <Navbar/>
            <div className='container'>
                <div className="wrapper" id='wrapper'>
                    <div className="formBox login" id='login'>
                        <h2>LOGIN</h2>
                        <form action='#'>
                            <div className='inputBox'>
                                <span className='icon'><EmailIcon /></span>
                                <input type="text" required />
                                <label>Email</label>
                            </div>
                            <div className="inputBox">
                                <span className='icon'><LockPersonIcon /></span>
                                <input type="password" required />
                                <label>Password</label>
                            </div>
                            <div className='forget'>
                                <a href='#'>Forget Password?</a>
                            </div>
                            <button type='button' className='btn'>Login</button>
                            <div className='loginRegister'>
                                <p>Don&apos;t hav an account? <a href="#" className='registerLink' onClick={registerLink}> Register </a></p>
                            </div>
                        </form>
                    </div>

                    <div className='formBox register' id='register'>
                        <h2>Registration</h2>
                        <form action='#'>
                            <div className='inputBox'>
                                <span className='icon'><Person3Icon /></span>
                                <input type="text" required />
                                <label>Username</label>
                            </div>
                            <div className="inputBox">
                                <span className='icon'><EmailIcon /></span>
                                <input type="text" required />
                                <label>Email</label>
                            </div>
                            <div className="inputBox">
                                <span className='icon'><LocalPhoneIcon /></span>
                                <input type="text" required />
                                <label>Phone Number</label>
                            </div>
                            <div className='inputBox'>
                                <span className='icon'><LockPersonIcon /></span>
                                <input type="password" required />
                                <label>Password</label>
                            </div>
                            <button type='button' className='btn'>Register</button>
                            <div className='loginRegister'>
                                <p>Already have an account?<a href="#" className='loginLink' onClick={loginLink}> Login</a></p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Authentication