export const validateSignup = values => {
    const errors = {};

    if (!values.name) {
        errors.name = 'Please enter your name';
    } else if (values.name.length > 20) {
        errors.name = 'Must be 20 characters or less';
    }

    if (values.username.length < 4) {
        errors.username = 'Must be at least 4 characters';
    } else if (values.username.length > 20) {
        errors.username = 'Must be 20 characters or less';
    }

    if (!values.email || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Please enter a valid email';
    }

    if (values.password.length < 6 || values.password.length > 60) {
        errors.password = 'Your password must contain between 6 and 60 characters.';
    }

    if (values.password !== values.password2) {
        errors.password2 = 'Password does not match.';
    }

    if (!values.native.length) {
        errors.native = 'Please select your native language';
    }

    if (!values.desired.length) {
        errors.desired = 'Please select what language do you want to learn';
    }

    if (values.avatar && (values.avatar.size / 1024) > 4096) {
        errors.avatar = 'Maximum image size 4mb';
    }

    return errors;
};

export const validateLogin = values => {
    const errors = {};

    if (values.username.length < 4) {
        errors.username = 'Must be at least 4 characters';
    }

    if (values.password.length < 6 || values.password.length > 60) {
        errors.password = 'Your password must contain between 6 and 60 characters.';
    }

    return errors;
};

export const validateChangePassword = values => {
    const errors = {};

    if (values.oldPassword.length < 6 || values.oldPassword.length > 60) {
        errors.oldPassword = 'Your password must contain between 6 and 60 characters.';
    }

    if (values.newPassword.length < 6 || values.newPassword.length > 60) {
        errors.newPassword = 'Your password must contain between 6 and 60 characters.';
    }

    if (values.newPassword !== values.newPassword2) {
        errors.newPassword2 = 'Passwords do not match.';
    }

    return errors;
};

export const validateChangeUserInfo = values => {
    const errors = {};

    if (!values.name) {
        errors.name = 'Please enter your name';
    } else if (values.name.length > 20) {
        errors.name = 'Must be 20 characters or less';
    }

    if (!values.native.length) {
        errors.native = 'Please select your native language';
    }

    if (!values.desired.length) {
        errors.desired = 'Please select what language do you want to learn';
    }

    if (values.avatar && (values.avatar.size / 1024) > 4096) {
        errors.avatar = 'Maximum image size 4mb';
    }

    return errors;
};
