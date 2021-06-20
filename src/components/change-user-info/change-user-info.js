import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { validateChangeUserInfo } from '../../utils/validation';
import { Field, Form, Formik } from 'formik';
import MyTextInput from '../my-text-input';
import MySelect from '../my-select';
import MyTextArea from '../my-text-area';
import SelectLanguage from '../select-language';
import { updateUserInfo } from '../../services/api-service';

const ChangeUserInfo = () => {
    const user = useSelector(state => state.user);
    const [isLoading, setIsLoading] = useState(false);
    const [apiError, setApiError] = useState('');

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

    // todo fetch user data and insert as initial values

    const handleSubmit = async (values) => {
        setIsLoading(true);

        try {
            const { id } = user.info;
            await updateUserInfo({ ...values, id });

            setIsLoading(false);
            console.log('updated info successfully');
            // todo handle success
        } catch(error) {
            setIsLoading(false);

            // api error example
            // actions.setStatus({
            //     email: 'User with this email already exist'
            // });

            if (error.response.non_field_errors) {
                setApiError(error.response.non_field_errors);
            } else {
                // todo add handy error messages
                setApiError('Not valid data, please try again');
            }
        }
    };

    return (
        <div className="user-account-change-user-info-wrapper">
            <h2 className="user-account-change-user-info-title">Change Info:</h2>

            <Formik
                initialValues={ {
                    name: '',
                    sex: '',
                    about: '',
                    native: ['Español'],
                    desired: ['English'],
                    avatar: ''
                } }
                validate={ validateChangeUserInfo }
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

                                {/* api error example */ }
                                {
                                    status && status.email
                                        ? <div className="signup-form-error">{ status.email }</div>
                                        : null
                                }

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
                                    <Field
                                        name={ 'native' }
                                        component={ SelectLanguage }
                                        options={ languages }
                                        defaultValue={ {
                                            value: 'Español', label: 'Español'
                                        } }
                                    />
                                    { touched.native && errors.native
                                        ? <div className="signup-form-error">{ errors.native }</div>
                                        : null }
                                </div>

                                <div className="signup-form-field-wrapper">
                                    <h3>I want to learn:</h3>
                                    <Field
                                        name={ 'desired' }
                                        component={ SelectLanguage }
                                        options={ languages }
                                        defaultValue={ {
                                            value: 'English', label: 'English'
                                        } }
                                    />
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
    );
};

export default ChangeUserInfo;
