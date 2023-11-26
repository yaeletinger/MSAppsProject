import api from '../api';

export const gethitsFirst = async() => {
    return await api.get('/hits').then(res => res);
}

export const gethitsByPage = async(page) => {
    return await api.get(`/hits/getHitsByPage?page=${page}`).then(res => res);
}

export const gethitsByCategory = async(page, category) => {
    return await api.get(`/hits/getHitsByPage?page=${page}&?category=${category}`).then(res => res);
}





