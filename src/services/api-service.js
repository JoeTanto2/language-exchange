import axios from 'axios';

const api = axios.create({
    baseURL: process.env.NODE_ENV === 'development'
        ? 'http://localhost:8000'
        : 'domain',
    headers: {
        'Content-Type': 'application/json',
    }
});

api.interceptors.request.use(config => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user && user.token) {
        config.headers.Authorization = `Token ${ user.token }`;
    }

    return config;
});

export const signupUser = async (values) => {
    const { name, username, email, password, sex, about, native, desired, avatar } = values;
    const formData = new FormData();
    formData.append('name', name);
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('sex', sex);
    formData.append('about', about);
    formData.append('native', JSON.stringify(native));
    formData.append('desired', JSON.stringify(desired));
    formData.append('avatar', avatar);

    return await api.post('/api/register/', formData);
};

export const loginUser = async (values) => {
    return await api.post('/api/login/', { data: values });
};

export const getUserById = async (id) => {
    return await api.get(`/api/user/${ id }`, { data: { id } });

    return await api.get(`/api/use/${id}/`, { data: { id } });

};

export const updateUserPassword = async (values) => {
    return await api.put('/api/password_update/', { data: values });
    return await api.patch('/api/password_update/', { data: values });
};

export const updateUserInfo = async (values) => {
    const { name, sex, about, native, desired, avatar, id } = values;
    const formData = new FormData();
    formData.append('user_id', id);
    formData.append('name', name);
    formData.append('sex', sex);
    formData.append('about', about);
    formData.append('native', JSON.stringify(native));
    formData.append('desired', JSON.stringify(desired));
    formData.append('avatar', avatar);

    return await api.patch('/api/profile_update/', formData);
};
