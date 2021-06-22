import React from 'react';
import { useField } from 'formik';

const MyTextArea = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <div className="signup-form-field-wrapper">
            <label htmlFor={ props.id || props.name }>{ label }</label>
            <textarea className="signup-form-field" { ...field } { ...props } rows="10"/>
            { meta.touched && meta.error ? (
                <div className="signup-form-error">{ meta.error }</div>
            ) : null }
        </div>
    );
};

export default MyTextArea;
