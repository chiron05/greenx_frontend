import React from 'react'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'next/image';
import Link from 'next/link';
import styles from "/styles/header.module.css"
import useLocalStorage from "../../../Hooks/useLocalStorage"


const Header2 = () => {
    const [loggedStatus, setLoggedStatus] = useLocalStorage("loggedStatus")
    const [token, setToken] = useLocalStorage("token")
    const [userId, setuserId] = useLocalStorage("userId")
    const [patientId, setpatientId] = useLocalStorage("patientId")
    const [userNum, setuserNum] = useLocalStorage("userNum")
    const [subscriptionStatus, setSubscriptionStatus] = useLocalStorage("subscriptionStatus")
    const logged = loggedStatus

    const logout = () => {
        setLoggedStatus(loggedStatus = false);
        setToken(token = null);
        setuserId(userId = null);
        setpatientId(patientId = null);
        setuserNum(userNum = null);
        setSubscriptionStatus(subscriptionStatus = null);
    }

    return (
        <>
            <Navbar collapseOnSelect className={`navbar navbar-expand-lg header-nav ${styles.navHead}`} bg="light" expand="lg">
                <Link href="/"><Navbar.Brand className='mx-4'><Image src={require("../../../public/images/logo.svg")} alt="logo" width={160} height={100} /></Navbar.Brand></Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className={styles.collapseNav}>
                    <Nav className={`me-auto ${styles.mainNav}`}>
                        <Link href="/"><a className={`${styles.mainNavA}`}>Home</a></Link>
                        <Link href="/AboutUs"><a className={`${styles.mainNavA}`}>About Us</a></Link>
                        <Link href="/Subscription"><a className={` ${styles.mainNavA}`}>Subscriptions</a></Link>
                        {(!logged) ? <></> : <Link href="/Community"><a className={` ${styles.mainNavA}`}>Community</a></Link>}
                    </Nav>
                    <Nav className="ms-auto mx-4 text-center ">
                        {/* <div className='conLogin' style={{"display":"block","marginTop":"15px" }}> */}
                        <Link href="/Login">
                            <Nav className="mx-4 navLogin">
                                <div className={`d-flex align-items-center`}>
                                    {(!logged) ? <button className={`${styles.logBtn}`}> login / Signup</button> : <>
                                        <Link href="/DashboardPage">
                                            <button className={`${styles.logBtn}`}>Dashboard</button>
                                        </Link>
                                    </>}
                                </div>
                            </Nav>
                        </Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

            <div className="mb-5">
                <br />            </div>
        </>
    )
}

export default Header2