import { fetchComments } from './api.js';
import { renderComments } from './render-comments.js';
import {
    handleLikes,
    setupReplyHandler,
    setupAddCommentHandler,
} from './event-handlers.js';

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await fetchComments();
    const commentsData = response.comments;

    // Валидируем каждый комментарий — добавляем недостающие поля
    const validatedComments = commentsData.map(comment => ({
      id: comment.id,
      name: comment.name ?? 'Неизвестный автор', // если name отсутствует
      text: comment.text ?? '', // если text отсутствует
      date: comment.date,
      likes: comment.likes ?? 0,
      isLiked: comment.isLiked ?? false
    }));

    comments = validatedComments;
    renderComments(comments);

    handleLikes();
    setupReplyHandler();
    setupAddCommentHandler();
  } catch (error) {
    console.error('Ошибка при загрузке комментариев:', error);
    alert('Не удалось загрузить комментарии. Проверьте подключение к сети.');
  }
});