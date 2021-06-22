import React from 'react';
import { useField } from 'formik';

const MySelect = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <div className="signup-form-field-wrapper">
            <label htmlFor={ props.id || props.name }>{ label }</label>
            <select { ...field } { ...props } />
            { meta.touched && meta.error ? (
                <div className="signup-form-error">{ meta.error }</div>
            ) : null }
        </div>
    );
};

export default MySelect;
