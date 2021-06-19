import React, { useState } from 'react';
import { Form, Formik } from 'formik';
import { validateLogin } from '../../utils/validation';
import MyTextInput from '../my-text-input';
import { loginUser } from '../../services/api-service';

import './login.scss';

const Login = () => {
    const [isLoading, setIsLoading] = useState(false);

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
                    onSubmit={ async (values) => {
                        setIsLoading(true);
                        try {
                            const res = await loginUser(values);
                            console.log('successfully logged in', res);
                            // todo set token to localStorage
                            setIsLoading(false);
                        } catch(error) {
                            setIsLoading(false);
                            console.log('failed', error);
                        }
                    } }
                >

                    <Form>
                        <MyTextInput
                            label="Username or email:"
                            name="username"
                            type="email"
                            placeholder="Please enter your username or email"
                        />

                        <MyTextInput
                            label="Password:"
                            name="password"
                            type="password"
                            placeholder="Password"
                        />

                        <button className="login-form-submit" type="submit" disabled={ isLoading }>Submit</button>
                    </Form>
                </Formik>
            </div>
        </div>
    );
};

export default Login;
