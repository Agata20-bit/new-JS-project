import { fetchComments } from './api.js';
import { renderComments } from './render-comments.js';
import {
    handleLikes,
    setupReplyHandler,
    setupAddCommentHandler,
} from './event-handlers.js';

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const loadingMessage = document.createElement('div');
    loadingMessage.className = 'loading-message';
    loadingMessage.textContent = 'Загружаем комментарии...';
    document.body.appendChild(loadingMessage);

    const commentsData = await fetchComments();
    const validatedComments = commentsData.comments.map(comment => ({
      id: comment.id,
      name: comment.name ?? 'Неизвестный автор',
      text: comment.text ?? '',
      date: comment.date,
      likes: comment.likes ?? 0,
      isLiked: comment.isLiked ?? false,
    }));

    comments = validatedComments;
    renderComments(comments);

    handleLikes();
    setupReplyHandler();
    setupAddCommentHandler();

    // Убираем сообщение после загрузки
    loadingMessage.remove();
  } catch (error) {
    console.error('Ошибка при загрузке комментариев:', error);
    alert('Не удалось загрузить комментарии. Проверьте подключение к сети.');
  }
});