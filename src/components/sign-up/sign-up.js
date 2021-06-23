import React, { useEffect, useState } from 'react';
import { Form, Formik, Field } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import SelectLanguage from '../select-language';
import { validateSignup } from '../../utils/validation';
import MyTextInput from '../my-text-input';
import MySelect from '../my-select';
import MyTextArea from '../my-text-area';
import { signupUser } from '../../services/api-service';
import { setUser } from '../../features/userSlice';

import './sing-up.scss';

const SignUp = () => {
    const isAuthenticated = useSelector(state => state.user.isAuthenticated);
    const [isLoading, setIsLoading] = useState(false);
    const [apiError, setApiError] = useState('');
    const dispatch = useDispatch();
    const history = useHistory();

    const languages = [
        {
            value: 'English', label: 'English'
        },
        {
            value: 'Español', label: 'Español'
        },
        {
            value: 'Русский', label: 'Русский'
        }
    ];

    const handleSubmit = async (values, actions) => {
        setIsLoading(true);

        try {
            const res = await signupUser(values);

            dispatch(setUser(res.data));
            setIsLoading(false);
            history.push('/');
        } catch(error) {
            setIsLoading(false);

            // api error example
            // actions.setStatus({
            //     email: 'User with this email already exist'
            // });
            const errorMessage = error.response.non_field_errors;

            if (errorMessage) {
                setApiError(errorMessage);
            } else {
                // todo add handy error messages
                setApiError('Not valid data, please try again');
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
        <div className="signup">
            <div className="signup-wrapper">
                <h1 className="signup-title">Sign Up</h1>

                <Formik
                    initialValues={ {
                        name: '',
                        username: '',
                        email: '',
                        password: '',
                        password2: '',
                        sex: '',
                        about: '',
                        native: [],
                        desired: [],
                        avatar: ''
                    } }
                    validate={ validateSignup }
                    onSubmit={ handleSubmit }
                >
                    {
                        ({ setFieldValue, errors, touched, status }) => {
                            return (
                                <Form>

                                    <MyTextInput
                                        label="Name:"
                                        name="name"
                                        type="text"
                                        placeholder="Name"
                                    />

                                    <MyTextInput
                                        label="Username:"
                                        name="username"
                                        type="text"
                                        placeholder="Username"
                                    />

                                    <MyTextInput
                                        label="Email:"
                                        name="email"
                                        type="email"
                                        placeholder="example@gmail.com"
                                    />


                                    {/* api error example */}
                                    {
                                        status && status.email
                                            ? <div className="signup-form-error">{ status.email }</div>
                                            : null
                                    }

                                    <MyTextInput
                                        label="Password:"
                                        name="password"
                                        type="password"
                                        placeholder="Password"
                                    />

                                    <MyTextInput
                                        label="Repeat password:"
                                        name="password2"
                                        type="password"
                                        placeholder="Password"
                                    />

                                    <MySelect label="Sex:" name="sex">
                                        <option value="">Prefer not to say</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                    </MySelect>

                                    <MyTextArea
                                        label="About:"
                                        name="about"
                                        type="text"
                                        placeholder="Please tell about your hobbies or interests"
                                    />

                                    <div className="signup-form-field-wrapper">
                                        <h3>I speak:</h3>
                                        <Field name={ 'native' } component={ SelectLanguage } options={ languages } />
                                        { touched.native && errors.native
                                            ? <div className="signup-form-error">{ errors.native }</div>
                                            : null }
                                    </div>

                                    <div className="signup-form-field-wrapper">
                                        <h3>I want to learn:</h3>
                                        <Field name={ 'desired' } component={ SelectLanguage } options={ languages } />
                                        { touched.desired && errors.desired
                                            ? <div className="signup-form-error">{ errors.desired }</div>
                                            : null }
                                    </div>

                                    <div className="signup-form-field-wrapper">
                                        <label htmlFor="avatar">Avatar:</label>
                                        <input
                                            className="signup-form-field"
                                            id="avatar"
                                            type="file"
                                            name="avatar"
                                            onChange={ (e) => setFieldValue('avatar', e.currentTarget.files[0]) }
                                        />
                                        { errors.avatar
                                            ? <div className="signup-form-error">{ errors.avatar }</div>
                                            : null }
                                    </div>

                                    {
                                        apiError
                                            ? <div className="signup-form-error">{ apiError }</div>
                                            : null
                                    }

                                    <button className="signup-form-submit"
                                            type="submit"
                                            disabled={ isLoading }>Submit
                                    </button>
                                </Form>
                            );
                        }
                    }
                </Formik>
            </div>
        </div>
    );
};

export default SignUp;
