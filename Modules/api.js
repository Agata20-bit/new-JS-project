const host = 'https://wedev-api.sky.pro/api/v1/Agata20-bit';

export const fetchComments = () => {
    return fetch(host + '/comments')
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        });
};

export const sendComments = (comment) => {
    if (!comment.name || !comment.text) {
        return Promise.reject(new Error('Недостаточно данных для отправки'));
    }
    return fetch(host + '/comments', {
        method: 'POST',
        body: JSON.stringify(comment),
        headers: {
            'Content-Type': 'application/json',
        },
    }).then((res) => res.json());
};