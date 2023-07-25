import React, {useState } from 'react'
import "../css/Auth.css"
import EmailIcon from '@mui/icons-material/Email';
import LockPersonIcon from '@mui/icons-material/LockPerson';
import Person3Icon from '@mui/icons-material/Person3';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import NavbarLogin from './Navbar/NavbarLogin';
import Loading from './Loading';
import AOS from 'aos';
import useLocalStorage from "../Hooks/useLocalStorage"
import { useHistory } from 'react-router-dom';

AOS.init();

const Authentication = () => {
    const history = useHistory();
    const [details, setDetails] = useState({
        email: "", password: "", phnum: "", username: ""
    });
    const useremail = details.email;
    const userpassword = details.password;
    const userphnum = details.phnum;
    const username = details.username;
    const [errmsg, setErrmsg] = useState("");
    var validRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var validRegex2 = /[0-9]/;
    let longitude = ""
    let latitude = ""
    navigator.geolocation.getCurrentPosition((position) => {
        longitude = parseFloat(position.coords.longitude)
        latitude = parseFloat(position.coords.latitude)
    })
    const [token, setToken] = useLocalStorage("token")
    const [loggedStatus, setLoggedStatus] = useLocalStorage("loggedStatus")
    const [userID, setUserID] = useLocalStorage("userID")
    const url = 'https://greenx-backend.onrender.com/graphql';

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

    const backtoAuth = () =>{
        const wrapper = document.getElementById('wrapper')
        const succesfulReg = document.querySelector(".succesfulReg");
        wrapper.style.display = "block";
        succesfulReg.style.display = "none";
    }

    const loginUser = async() => {
        const wrapper = document.getElementById('wrapper')
        const loaderDiv = document.querySelector(".loaderDiv");
        const succesfulLog = document.querySelector(".succesfulLog");
        const succesfulReg = document.querySelector(".succesfulReg");
        succesfulLog.style.display = "none";
        succesfulReg.style.display = "none";
        wrapper.style.display = "none";
        loaderDiv.style.display = "block";

        if (!userphnum || !userpassword) {
            setErrmsg("Empty data! please fill correctly.....")
        }
        else if (userphnum.length != 10 || !userphnum.match(validRegex2)) {
            setErrmsg("please fill Phone Number correctly.....")
        }
        else {
            setErrmsg("")
            wrapper.style.display = "none";
            loaderDiv.style.display = "block";
            const requestBody = {
                query: `
                    mutation {
                        login(
                            password: "${userpassword}"
                            contactnum: "${userphnum}"
                        ){
                            token
                            id
                        }
                    }
                    `,
                variables: {}
            };

            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(requestBody)
            };

                console.log("trying");
                const response = await fetch(url, requestOptions);
                const data = await response.json();
                console.log('Mutation response:', data);
                loaderDiv.style.display = "none";
                if(data.errors){
                    console.error('Error:', data.errors);
                    alert('Error: Invalid Login');
                    succesfulLog.style.display="none"
                    wrapper.style.display = "block";
                }else{
                    succesfulReg.style.display="none"
                    succesfulLog.style.display="block"
                    setToken(data.data.login.token);
                    setUserID(data.data.login.id)
                    setLoggedStatus(true);
                    setTimeout(()=>{
                        history.push('/');
                    },3000)
                }

        }
    }
    const RegisterUser = async () => {
        const wrapper = document.getElementById('wrapper')
        const loaderDiv = document.querySelector(".loaderDiv");
        const succesfulReg = document.querySelector(".succesfulReg");
        const succesfulLog = document.querySelector(".succesfulLog");
        if (!useremail || !userpassword || !userphnum || !username) {
            setErrmsg("Empty data! please fill correctly.....")
        }
        else if (!useremail.match(validRegex)) {
            setErrmsg("please fill Email-ID correctly.....")
        }
        else if (userphnum.length != 10 || !userphnum.match(validRegex2)) {
            setErrmsg("please fill Phone Number correctly.....")
        }
        else {
            setErrmsg("")
            wrapper.style.display = "none";
            loaderDiv.style.display = "block";
            const requestBody = {
                query: `
                    mutation {
                        register(input: {
                            name: "${username}"
                            email: "${useremail}"
                            password: "${userpassword}"
                            contactnum: "${userphnum}"
                            location:{type: "Point", coordinates: [${longitude},${latitude}]}
                        }) {
                        _id
                        location{type coordinates}
                        }
                    }
                    `,
                variables: {}
            };

            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(requestBody)
            };

                console.log("trying");
                const response = await fetch(url, requestOptions);
                const data = await response.json();
                console.log('Mutation response:', data);
                loaderDiv.style.display = "none";
                if(data.errors){
                    console.error('Error:', data.errors);
                    alert(data.errors[0].message);
                    succesfulReg.style.display="none"
                    
                    setTimeout(()=>{
                        history.push('/authentication');
                        wrapper.style.display = "block";
                        setDetails({
                            password: ""
                        })
                    },1000)
                }else{
                    wrapper.style.display = "none";
                    succesfulLog.style.display="none"
                    succesfulReg.style.display="block"
                    setTimeout(()=>{
                        loginUser();
                    },2000)
                }
                

        }
    }


    return (
        <>
            <NavbarLogin />
            <div className='container'>
                <div className="wrapper" id='wrapper'>
                    <div className="formBox login" id='login'>
                        <h2>LOGIN</h2>
                        <form action='#'>
                            <div className='inputBox'>
                                <span className='icon'><EmailIcon /></span>
                                <input type="text" required value={details.phnum} onChange={(e) => { setDetails({ ...details, phnum: e.target.value }) }} />
                                <label>Phone Number</label>
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
                                <input type="text" required value={details.username} onChange={(e) => { setDetails({ ...details, username: e.target.value }) }} />
                                <label>Username</label>
                            </div>
                            <div className="inputBox">
                                <span className='icon'><EmailIcon /></span>
                                <input type="text" required value={details.email} onChange={(e) => { setDetails({ ...details, email: e.target.value }) }} />
                                <label>Email</label>
                            </div>
                            <div className="inputBox">
                                <span className='icon'><LocalPhoneIcon /></span>
                                <input type="text" required value={details.phnum} onChange={(e) => { setDetails({ ...details, phnum: e.target.value }) }} />
                                <label>Phone Number</label>
                            </div>
                            <div className='inputBox'>
                                <span className='icon'><LockPersonIcon /></span>
                                <input type="password" required value={details.password} onChange={(e) => { setDetails({ ...details, password: e.target.value }) }} />
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

                <div className="loaderDiv" style={{ "display": "none", justifyContent: "center", alignItems: "center" }}>
                    <Loading />
                </div>

                <div className='succesfulReg' style={{ "display": "none", justifyContent: "center", alignItems: "center" }}>
                    <div class="flip-card">
                        <div class="flip-card-inner" >
                            <div class="flip-card-front">
                                <p class="title">Registration <br/>Successful!!</p>
                                <p style={{fontSize:"40px"}}>✅</p>
                            </div>
                            <div class="flip-card-back">
                                <p class="title">Logging you to GreenX!</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='succesfulLog' style={{ "display": "none", justifyContent: "center", alignItems: "center" }}>
                    <div class="flip-card">
                        <div class="flip-card-inner">
                            <div class="flip-card-front">
                                <p class="title">Login <br/>Successful!!</p>
                                <p style={{fontSize:"40px"}}>✅</p>
                            </div>
                            <div class="flip-card-back">
                                <p class="title">Welome to GreenX</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Authentication