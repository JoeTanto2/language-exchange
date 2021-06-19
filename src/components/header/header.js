import React from 'react';
import { Link } from 'react-router-dom';

import './header.scss';

const Header = () => {
    return (
        <header className="header">
            <h2 className="header-logo">Logo</h2>
            <div className="header-login-wrapper">
                <Link to="/login"><button className="header-login">Login</button></Link>
                <Link to="/signup"><button className="header-signup">Signup</button></Link>
            </div>
        </header>
    );
};

export default Header;
