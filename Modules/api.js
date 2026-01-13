const host = 'https://wedev-api.sky.pro/api/v1/Agata20-bit';

export const fetchComments = () => {
    return fetch(host + '/comments')
        .then((res) => res.json())
        .then((data) => {
            return data;
        });
};


export const sendComments = ({name , text}) => {
    return fetch(host + '/comments', { 
   method: 'POST',
   body: JSON.stringify({ name , text })
})
        .then((res) => res.json())
        .then((data) => {
            return data;
        });
};
