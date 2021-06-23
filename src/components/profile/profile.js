import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { getUserById } from '../../services/api-service';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../features/userSlice';

import './profile.scss';
import avatar from '../../assets/images/default-user-avatar.png';

const Profile = () => {
    const isAuthenticated = useSelector(state => state.user.isAuthenticated);
    const [user, setUser] = useState(null);
    const [error, setError] = useState(false);
    const { id } = useParams();
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!isAuthenticated) {
            history.push('/login');
            return;
        }

        getUserById(id)
            .then(data => setUser(data))
            .catch((error) => {
                if (error.response.status === 401) {
                    dispatch(logoutUser());
                    history.push('/login');
                }
                setError(true);
            });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    // todo add loading

    if (error) {
        return (
            <div className="profile-error">
                <h2 className="profile-error-title">Sorry, looks like this user does not exist</h2>
                <div className="profile-error-return-wrapper">
                    <span>Return to the home page</span>
                    <button
                        className="profile-error-home"
                        onClick={ () => history.push('/') }>
                        Go home
                    </button>
                </div>
            </div>
        );
    }

    return (
        <section className="profile">
            <div className="profile-wrapper">
                <div className="profile-image-wrapper">
                    <img className="profile-image" src={ avatar } alt="User avatar" />
                </div>
                <h2 className="profile-name">John doe</h2>
                <div className="profile-lang-wrapper">
                    <div className="profile-lang-list-wrapper">
                        <h3 className="profile-lang-list-title">I speak:</h3>
                        <ul className="profile-lang-list">
                            <li className="profile-lang-list-item">English</li>
                            <li className="profile-lang-list-item">Español</li>
                        </ul>
                    </div>
                    <div className="profile-lang-list-wrapper">
                        <h3 className="profile-lang-list-title">I want to practice:</h3>
                        <ul className="profile-lang-list">
                            <li className="profile-lang-list-item">Русский</li>
                        </ul>
                    </div>
                </div>

                <div className="profile-about-wrapper">
                    <h3>About:</h3>
                    <p className="profile-about"><span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid
                        debitis
                        doloribus earum esse inventore nam numquam perferendis porro voluptatibus. Ab earum eos expedita
                        nostrum
                        obcaecati placeat, temporibus. Beatae, enim, neque.</span><span>Expedita, in, molestias. Ab
                        accusamus ad
                        aperiam asperiores delectus deleniti deserunt dolores dolorum enim, eos excepturi explicabo
                        inventore
                        magni maiores maxime, necessitatibus provident quibusdam rerum sapiente sit temporibus veritatis
                        voluptas!</span><span>Commodi consequuntur et facere fugit incidunt magnam nesciunt, optio
                        possimus
                        praesentium quae quibusdam ut voluptatum! Aliquid animi esse expedita facere fuga incidunt
                        nesciunt
                        perferendis possimus sit, veniam. Beatae labore, sapiente.</span>
                    </p>
                </div>

                <button className="profile-start-chat">Start chatting</button>
            </div>
        </section>
    );
};

export default Profile;
