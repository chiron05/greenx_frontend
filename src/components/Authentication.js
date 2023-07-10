import React, { useState } from 'react'
import "../css/Auth.css"
import EmailIcon from '@mui/icons-material/Email';
import LockPersonIcon from '@mui/icons-material/LockPerson';
// import Navbar from '../Components/Navbar/Navbar';
import Person3Icon from '@mui/icons-material/Person3';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import Navbar from './Navbar/Navbar';
import Loading from './Loading';

const Authentication = () => {
    const [details, setDetails] = useState({
        email: "", password: "", phnum: "", username: ""
    });
    const useremail = details.email.trim();
    const userpassword = details.password.trim();
    const userphnum = details.phnum.trim();
    const username = details.username.trim();
    const [errmsg, setErrmsg] = useState("");
    var validRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var validRegex2 = /[0-9]/;


    const registerLink = () => {
        const login = document.getElementById('login')
        const register = document.getElementById('register')
        login.style.display = "none"
        register.style.position = "relative"
        register.style.left = "-410px"
    }
    const loginLink = () => {
        const login = document.getElementById('login')
        const register = document.getElementById('register')

        login.style.display = "block"
        register.style.position = "absolute"
        register.style.left = "0px"
    }

    const loginUser = () => {
        const wrapper = document.getElementById('wrapper')
        const loaderDiv = document.querySelector(".loaderDiv");
        if (!useremail || !userpassword) {
            setErrmsg("Empty data! please fill correctly.....")
        }
        else if (!useremail.match(validRegex)) {
            setErrmsg("please fill Email-ID correctly.....")
        }
        else {
            setErrmsg("")
            wrapper.style.display = "none";
            loaderDiv.style.display = "block";
            
        }
    }
    const RegisterUser = () =>{
        const wrapper = document.getElementById('wrapper')
        const loaderDiv = document.querySelector(".loaderDiv");
        console.log(userphnum.length);
        if (!useremail || !userpassword || !userphnum || !username) {
            setErrmsg("Empty data! please fill correctly.....")
        }
        else if (!useremail.match(validRegex)) {
            setErrmsg("please fill Email-ID correctly.....")
        }
        else if (userphnum.length!=10 || !userphnum.match(validRegex2)){
            setErrmsg("please fill Phone Number correctly.....")
        }
        else {
            setErrmsg("")
            wrapper.style.display = "none";
            loaderDiv.style.display = "block";
            
        }
    }


    return (
        <>
            <Navbar />
            <div className='container'>
                <div className="wrapper" id='wrapper'>
                    <div className="formBox login" id='login'>
                        <h2>LOGIN</h2>
                        <form action='#'>
                            <div className='inputBox'>
                                <span className='icon'><EmailIcon /></span>
                                <input type="text" required value={details.email} onChange={(e) => { setDetails({ ...details, email: e.target.value }) }} />
                                <label>Email</label>
                            </div>
                            <div className="inputBox">
                                <span className='icon'><LockPersonIcon /></span>
                                <input type="password" required value={details.password} onChange={(e) => { setDetails({ ...details, password: e.target.value }) }} />
                                <label>Password</label>
                            </div>
                            <div style={{ color: 'white', fontSize: "15px", display: "block", marginBottom: "10px" }}>{errmsg}</div>
                            <button type='button' className='btn' onClick={loginUser}>Login</button>
                            <div className='loginRegister'>
                                <p>Don&apos;t hav an account? <a href='#' className='registerLink' onClick={registerLink}> Register </a></p>
                            </div>
                        </form>

                    </div>

                    <div className='formBox register' id='register'>
                        <h2>Registration</h2>
                        <form action='#'>
                            <div className='inputBox'>
                                <span className='icon'><Person3Icon /></span>
                                <input type="text" required value={details.username} onChange={(e) => { setDetails({ ...details, username: e.target.value }) }}/>
                                <label>Username</label>
                            </div>
                            <div className="inputBox">
                                <span className='icon'><EmailIcon /></span>
                                <input type="text" required value={details.email} onChange={(e) => { setDetails({ ...details, email: e.target.value }) }}/>
                                <label>Email</label>
                            </div>
                            <div className="inputBox">
                                <span className='icon'><LocalPhoneIcon /></span>
                                <input type="text" required value={details.phnum} onChange={(e) => { setDetails({ ...details, phnum: e.target.value }) }}/>
                                <label>Phone Number</label>
                            </div>
                            <div className='inputBox'>
                                <span className='icon'><LockPersonIcon /></span>
                                <input type="password" required value={details.password} onChange={(e) => { setDetails({ ...details, password: e.target.value }) }}/>
                                <label>Password</label>
                            </div>
                            <div style={{ color: 'white', fontSize: "15px", display: "block", marginBottom: "10px" }}>{errmsg}</div>
                            <button type='button' className='btn' onClick={RegisterUser}>Register</button>
                            <div className='loginRegister'>
                                <p>Already have an account?<a href="#" className='loginLink' onClick={loginLink}> Login</a></p>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="loaderDiv" style={{ "display": "none" , marginBottom:"500px"}}>
                    <Loading/>
                </div>
            </div>
        </>
    )
}

export default Authentication