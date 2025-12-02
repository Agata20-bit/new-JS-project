import { renderComments } from '../render-comments.js';
import { comments } from './comments.js';

export function handleLikes() {
  document.querySelector('.comments').addEventListener('click', (event) => {
    if (event.target.classList.contains('like-button')) {
      const button = event.target;
      const commentId = parseInt(button.dataset.id, 10);
      const comment = comments.find((c) => c.id === commentId);

      if (comment) {
        if (comment.isLiked) {
          comment.likes--;
          comment.isLiked = false;
        } else {
          comment.likes++;
          comment.isLiked = true;
        }
        renderComments(comments);
      }
    }
  });
}

export function setupReplyHandler() {
  const commentsList = document.querySelector('.comments');
  const nameInput = document.querySelector('.add-form-name');
  const textInput = document.querySelector('.add-form-text');

  commentsList.addEventListener('click', (event) => {
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

  addButton.addEventListener('click', () => {
    const name = nameInput.value.trim();
    const text = textInput.value.trim();

    if (!name || !text) {
      alert('Заполнены не все поля');
      return;
    }

    const date = new Date().toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });

    const newComment = {
      id: Date.now(),
      name: name,
      date: date,
      text: text,
      likes: 0,
      isLiked: false,
    };

    comments.push(newComment);
    renderComments(comments);

    nameInput.value = '';
    textInput.value = '';
  });
}