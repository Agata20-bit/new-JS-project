import { fetchComments } from './api.js';
import { renderComments } from './render-comments.js';
import {
    handleLikes,
    setupReplyHandler,
    setupAddCommentHandler,
} from './event-handlers.js';

document.addEventListener('DOMContentLoaded', async () => {
    try {
        // 1. Загружаем комментарии с сервера
        const response = await fetchComments();

        // 2. Обновляем локальный массив comments
        comments = response.comments;

        // 3. Отрисовываем комментарии
        renderComments(comments);

        // 4. Подключаем обработчики событий
        handleLikes();
        setupReplyHandler();
        setupAddCommentHandler();

        console.log('Приложение запущено!');
    } catch (error) {
        console.error('Ошибка при загрузке комментариев:', error);
        alert(
            'Не удалось загрузить комментарии. Проверьте подключение к сети.',
        );
    }
});
