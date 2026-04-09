import { comments } from './Modules/comments.js';
import { renderComments } from './Modules/render-comments.js';
import {
    handleLikes,
    setupReplyHandler,
    setupAddCommentHandler,
} from './Modules/event-handlers.js';
import { fetchComments } from './Modules/api.js';

function showLoadingMessage(text) {
    const loadingMessage = document.createElement('div');
    loadingMessage.className = 'loading-message';
    loadingMessage.textContent = text;
    document.body.appendChild(loadingMessage);
    return loadingMessage;
}

function hideLoadingMessage(loadingMessage) {
    if (loadingMessage) loadingMessage.remove();
}

async function loadComments() {
    const loadingMessage = showLoadingMessage('Загружаем комментарии...');

    try {
        const commentsData = await fetchComments();
        const validatedComments = commentsData.comments.map((comment) => ({
            id: comment.id,
            name: comment.name ?? 'Неизвестный автор',
            text: comment.text ?? '',
            date: comment.date,
            likes: comment.likes ?? 0,
            isLiked: comment.isLiked ?? false,
        }));

        comments.length = 0;
        comments.push(...validatedComments);
        renderComments(comments);
        handleLikes();
        setupReplyHandler();
    } catch (error) {
        console.error('Ошибка при загрузке комментариев:', error);
        alert('Не удалось загрузить комментарии. Проверьте подключение к сети.');
    } finally {
        hideLoadingMessage(loadingMessage);
    }
}

document.addEventListener('DOMContentLoaded', loadComments);