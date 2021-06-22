import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { validateChangeUserInfo } from '../../utils/validation';
import { Field, Form, Formik } from 'formik';
import MyTextInput from '../my-text-input';
import MySelect from '../my-select';
import MyTextArea from '../my-text-area';
import SelectLanguage from '../select-language';
import { getUserById, updateUserInfo } from '../../services/api-service';
import { logoutUser } from '../../features/userSlice';
import { useHistory } from 'react-router-dom';

const ChangeUserInfo = ({ id }) => {
    const user = useSelector(state => state.user);
    const [userData, setUserData] = useState({
        name: '',
        sex: '',
        about: '',
        native: [],
        desired: [],
        avatar: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [apiError, setApiError] = useState('');
    const native = userData.native.length ? userData.native.map(lang => ({ value: lang, label: lang })) : null;
    const desired = userData.desired.length ? userData.desired.map(lang => ({ value: lang, label: lang })) : null;
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

    useEffect(() => {
        if (!user.isAuthenticated) {
            history.push('/login');
            return;
        }

        getUserById(id)
            .then(({ data }) => {
                const user = data.profile[0];
                setUserData({
                    name: user.name,
                    sex: user.sex,
                    about: user.about,
                    native: user.native.split(','),
                    desired: user.desired.split(','),
                    avatar: ''
                });
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    dispatch(logoutUser());
                    history.push('/login');
                    return;
                }

                if (error.response.data.errorMessage) {
                    setApiError(error.response.data.errorMessage);
                } else {
                    setApiError('Something went wrong, please try again');
                }
            });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

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

            if (error.response.data.errorMessage) {
                setApiError(error.response.data.errorMessage);
            } else {
                setApiError('Something went wrong, please try again');
            }
        }
    };

    return (
        <div className="user-account-change-user-info-wrapper">
            <h2 className="user-account-change-user-info-title">Change Info:</h2>

            <Formik
                initialValues={ userData }
                validate={ validateChangeUserInfo }
                onSubmit={ handleSubmit }
                enableReinitialize={ true }
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

                                {/* todo refactor */}
                                {
                                    native
                                        ?
                                        <div className="signup-form-field-wrapper">
                                            <h3>I speak:</h3>
                                            <Field
                                                name={ 'native' }
                                                component={ SelectLanguage }
                                                options={ languages }
                                                defaultValue={ native }
                                            />
                                            { touched.native && errors.native
                                                ? <div className="signup-form-error">{ errors.native }</div>
                                                : null }
                                        </div>
                                        : null
                                }

                                {
                                    desired
                                        ?
                                        <div className="signup-form-field-wrapper">
                                            <h3>I want to learn:</h3>
                                            <Field
                                                name={ 'desired' }
                                                component={ SelectLanguage }
                                                options={ languages }
                                                defaultValue={ desired }
                                            />
                                            { touched.desired && errors.desired
                                                ? <div className="signup-form-error">{ errors.desired }</div>
                                                : null }
                                        </div>
                                        : null
                                }

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
