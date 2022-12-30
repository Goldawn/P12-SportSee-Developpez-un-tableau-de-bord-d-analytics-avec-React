import React from 'react';
import logo from '../../assets/logo/logo.svg';
import Navbar from '../Navbar/Navbar';
import './Header.css'

const Header = () => {
    return (
        <header>
            <div id="site-logo">
                <img src={logo} alt="logo du site"></img>
                <h1>SportSee</h1>
            </div>
            <Navbar/>
        </header>
    );
};

export default Header;