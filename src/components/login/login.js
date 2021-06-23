import React, { useEffect, useState } from 'react';
import { Form, Formik } from 'formik';
import { validateLogin } from '../../utils/validation';
import MyTextInput from '../my-text-input';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../services/api-service';
import { setUser } from '../../features/userSlice';
import { useHistory } from 'react-router-dom';

import './login.scss';

const Login = () => {
    const isAuthenticated = useSelector(state => state.user.isAuthenticated);
    const [isLoading, setIsLoading] = useState(false);
    const [apiError, setApiError] = useState('');
    const dispatch = useDispatch();
    const history = useHistory();

    const handleSubmit = async (values) => {
        setIsLoading(true);

        try {
            const res = await loginUser(values);
            dispatch(setUser(res.data));
            setIsLoading(false);
            history.push('/');
        } catch(error) {
            setIsLoading(false);

            if (error.response.non_field_errors) {
                setApiError(error.response.non_field_errors);
            } else {
                // todo add handy error messages
                setApiError('Not valid credentials, please try again');
            }
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            history.push('/');
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="login">
            <div className="login-wrapper">
                <h1 className="login-title">Login</h1>

                <Formik
                    initialValues={ {
                        username: '',
                        password: ''
                    } }
                    validate={ validateLogin }
                    onSubmit={ handleSubmit }
                >

                    <Form>
                        <MyTextInput
                            label="Username or email:"
                            name="username"
                            type="text"
                            placeholder="Please enter your username or email"
                        />

                        <MyTextInput
                            label="Password:"
                            name="password"
                            type="password"
                            placeholder="Password"
                        />

                        {
                            apiError
                                ? <div className="signup-form-error">{ apiError }</div>
                                : null
                        }

                        <button className="login-form-submit" type="submit" disabled={ isLoading }>Submit</button>
                    </Form>
                </Formik>
            </div>
        </div>
    );
};

export default Login;
