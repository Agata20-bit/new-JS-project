import { escapeHtml } from './escape-html.js';

export function renderComments(comments) {
  const commentsList = document.querySelector('.comments');
  if (!commentsList) return;

  let html = '';
  comments.forEach((comment) => {
    // Проверяем и задаём значения по умолчанию
    const authorName = comment.name ?? 'Неизвестный автор';
    const commentText = comment.text ?? '';

    const likeClass = comment.isLiked ? '-active-like' : '';
    html += `
      <li class="comment" data-id="${comment.id}">
        <div class="comment-header">
          <div>${escapeHtml(String(authorName))}</div> <!-- Преобразуем в строку -->
          <div>${String(comment.date)}</div> <!-- Преобразуем в строку -->
        </div>
        <div class="comment-body">
          <div class="comment-text">${escapeHtml(String(commentText))}</div>
        </div>
        <div class="comment-footer">
          <div class="likes">
            <span class="likes-counter">${Number(comment.likes)}</span> <!-- Преобразуем в число -->
            <button class="like-button ${likeClass}" data-id="${comment.id}"></button>
          </div>
        </div>
      </li>`;
  });

  commentsList.innerHTML = html;
}

export function updateCommentUI(commentId) {
    const commentEl = document.querySelector(`[data-id="${commentId}"]`);
    if (!commentEl) return;

    const likesCounter = commentEl.querySelector('.likes-counter');
    const likeButton = commentEl.querySelector('.like-button');

    const comment = comments.find((c) => c.id === commentId);
    if (!comment) return;

    likesCounter.textContent = comment.likes;
    likeButton.classList.toggle('-active-like', comment.isLiked);
}
