import { comments } from './comments.js';
import { fetchComments, sendComments } from './api.js';
import { renderComments, updateCommentUI } from './render-comments.js';

export function handleLikes() {
  document
    .querySelector('.comments')
    .addEventListener('click', async (event) => {
      if (!event.target.classList.contains('like-button')) return;

      const button = event.target;
      const commentId = parseInt(button.dataset.id, 10);
      const comment = comments.find((c) => c.id === commentId);

      if (comment) {
        comment.isLiked = !comment.isLiked;
        comment.likes += comment.isLiked ? 1 : -1;

        // Добавляем класс анимации
        button.classList.add('-loading-like');

        try {
          await delay(2000); // Симулируем запрос к API
          updateCommentUI(commentId);
        } catch (error) {
          console.error('Ошибка при обновлении лайка:', error);
          comment.isLiked = !comment.isLiked;
          comment.likes += comment.isLiked ? -1 : 1;
        } finally {
          // Убираем класс анимации после завершения
          button.classList.remove('-loading-like');
        }
      }
    });
}

export function setupReplyHandler() {
  const commentsList = document.querySelector('.comments');
  const nameInput = document.querySelector('.add-form-name');
  const textInput = document.querySelector('.add-form-text');

  commentsList?.addEventListener('click', (event) => {
    if (event.target.classList.contains('like-button')) return;

    const commentEl = event.target.closest('.comment');
    if (!commentEl) return;

    const commentId = parseInt(commentEl.dataset.id, 10);
    if (!commentId || isNaN(commentId)) return;

    const comment = comments.find((c) => c.id === commentId);
    if (comment) {
      nameInput.value = comment.name;
      textInput.value = `> ${comment.text}\n\n`;
    }
  });
}

export function setupAddCommentHandler() {
  const addButton = document.querySelector('.add-form-button');
  const nameInput = document.querySelector('.add-form-name');
  const textInput = document.querySelector('.add-form-text');
  const addForm = document.querySelector('.add-form');

  addButton?.addEventListener('click', async () => {
    const name = nameInput.value.trim();
    const text = textInput.value.trim();

    if (!name || !text) {
      alert('Заполнены не все поля');
      return;
    }

    // Скрываем форму и показываем сообщение
    addForm.style.display = 'none';
    const loadingMessage = document.createElement('div');
    loadingMessage.className = 'loading-message';
    loadingMessage.textContent = 'Комментарий добавляется';
    addForm.parentNode.appendChild(loadingMessage);

    const date = new Date().toISOString().replace('T', ' ').slice(0, 19);

    const newComment = {
      id: Date.now(), // Добавляем уникальный ID
      name: name,
      text: text,
      date: date,
      likes: 0,
      isLiked: false,
    };

    try {
      await sendComments(newComment);
      const commentsData = await fetchComments();
      comments = commentsData.comments;
      renderComments(comments);
      nameInput.value = '';
      textInput.value = '';
    } catch (error) {
      console.error('Ошибка отправки комментария:', error);
      alert('Не удалось отправить комментарий. Попробуйте позже.');
    } finally {
      // Возвращаем форму и убираем сообщение
      addForm.style.display = 'block';
      loadingMessage.remove();
    }
  });
}

function delay(interval = 300) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, interval);
  });
}