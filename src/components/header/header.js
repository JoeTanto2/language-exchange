import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../features/userSlice';

import './header.scss';

const Header = () => {
    const isAuthenticated = useSelector(state => state.user.isAuthenticated);
    const dispatch = useDispatch();

    return (
        <header className="header">
            <h2 className="header-logo">Logo</h2>

            {
                !isAuthenticated
                    ?
                    <div className="header-login-wrapper">
                        <Link to="/login">
                            <button className="header-login">Login</button>
                        </Link>
                        <Link to="/signup">
                            <button className="header-signup">Signup</button>
                        </Link>
                    </div>
                    :
                    <div className="header-login-wrapper">
                        <Link to="/account">
                            <button className="header-login">My account</button>
                        </Link>
                        <button className="header-signup" onClick={ () => dispatch(logoutUser()) }>Logout</button>
                    </div>
            }
        </header>
    );
};

export default Header;
