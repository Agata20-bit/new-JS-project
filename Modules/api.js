const host = 'https://wedev-api.sky.pro/api/v1/Agata20-bit';

export const fetchComments = () => {
    return fetch(host + '/comments').then((res) => res.json());
};

export const sendComments = (comment) => {
  // Проверяем обязательные поля
  if (!comment.id || !comment.name || !comment.text) {
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
