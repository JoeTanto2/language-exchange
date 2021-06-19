import axios from 'axios';

const api = axios.create({
    // todo add proper url
    baseURL: process.env.NODE_ENV === 'development'
        ? 'http://localhost:8000'
        : 'domain',
    headers: {
        'Content-Type': 'application/json',
    }
});

api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    config.headers.Authorization = token ? token : '';
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

    return await api.post('/api/register', { data: formData });
};

export const loginUser = async (values) => {
    return await api.post('/api/login', { data: values });
};

export const getUserById = async (id) => {
    return await api.get(`/api/use/${id}`, { data: { id } });
};

// todo add logout
