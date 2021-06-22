import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import ChangePassword from '../change-password';
import ChangeUserInfo from '../change-user-info';

import './user-account.scss';

const UserAccount = () => {
    const user = useSelector(state => state.user);
    const history = useHistory();

    useEffect(() => {
        if (!user.isAuthenticated) {
            history.push('/login');
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <section className="user-account">
            <div className="user-account-wrapper">
                <h1 className="user-account-title">Edit user data</h1>

                <ChangePassword />

                <ChangeUserInfo id={ user.info.id } />
            </div>
        </section>
    );
};

export default UserAccount;
