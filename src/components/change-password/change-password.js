import React, { useState } from 'react';
import { Form, Formik } from 'formik';
import { validateChangePassword } from '../../utils/validation';
import MyTextInput from '../my-text-input';
import { updateUserPassword } from '../../services/api-service';
import { useSelector } from 'react-redux';

const ChangePassword = () => {
    const user = useSelector(state => state.user);
    const [isLoading, setIsLoading] = useState(false);
    const [apiError, setApiError] = useState('');

    const handleSubmit = async (values) => {
        setIsLoading(true);

        try {
            const { id } = user.info;
            const valuesCopy = Object.assign({ id }, values);
            delete valuesCopy.newPassword2;
            await updateUserPassword(valuesCopy);
            setIsLoading(false);
            // todo handle success
            console.log('successfully changed password');
        } catch(error) {
            setIsLoading(false);
            console.log('error ', error);
            if (error.response.non_field_errors) {
                setApiError(error.response.non_field_errors);
            } else {
                // todo add handy error messages
                setApiError('Something went wrong while updating your password, please try again');
            }
        }
    };

    return (
        <div className="user-account-change-password-wrapper">
            <h2 className="user-account-change-password-title">Change password:</h2>

            <Formik
                initialValues={ {
                    oldPassword: '',
                    newPassword: '',
                    newPassword2: ''
                } }
                validate={ validateChangePassword }
                onSubmit={ handleSubmit }
            >

                <Form>
                    <MyTextInput
                        label="Old password:"
                        name="oldPassword"
                        type="password"
                        placeholder="Old password"
                    />

                    <MyTextInput
                        label="New password:"
                        name="newPassword"
                        type="password"
                        placeholder="New password"
                    />

                    <MyTextInput
                        label="Repeat new password:"
                        name="newPassword2"
                        type="password"
                        placeholder="New password"
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
    );
};

export default ChangePassword;
