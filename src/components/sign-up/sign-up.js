import React, { useState } from 'react';
import { Form, Formik, Field } from 'formik';
import SelectLanguage from '../select-language';
import { validateSignup } from '../../utils/validation';
import MyTextInput from '../my-text-input';
import MySelect from '../my-select';

import './sing-up.scss';
import MyTextArea from '../my-text-area';
import { signupUser } from '../../services/api-service';

const SignUp = () => {
    const [isLoading, setIsLoading] = useState(false);
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

    //todo redirect on successful user creation

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
                    onSubmit={ async (values) => {
                        setIsLoading(true);
                        try {
                            const res = await signupUser(values);
                            console.log('successfully created', res);
                            setIsLoading(false);
                        } catch(error) {
                            setIsLoading(false);
                            console.log('failed',error);
                        }
                    } }
                >
                    {
                        ({ setFieldValue, errors, touched }) => {
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
