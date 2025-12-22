const host = 'https://wedev-api.sky.pro/api/v1/Agata20-bit';

export const fetchComments = () => {
    return fetch(host + '/comments')
        .then((res) => res.json())
        .then((data) => {
            return data;
        });
};
