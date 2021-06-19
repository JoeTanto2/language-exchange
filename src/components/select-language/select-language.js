import React from 'react';
import Select from 'react-select';

const SelectLanguage = ({ options, field, form }) => {
    return (
        <Select
            options={ options }
            name={ field.name }
            isMulti
            value={ options ? options.find(option => option.value === field.value) : '' }
            onChange={ (option) => {
                const lang = option.map(item => item.value);
                form.setFieldValue(field.name, lang);
            } }
            onBlur={ field.onBlur }
        />
    );
};

export default SelectLanguage;
