import { escapeHtml } from './escape-html.js';

export function renderComments(comments) {
    const commentsList = document.querySelector('.comments');
    if (!commentsList) return;

    let html = '';
    comments.forEach((comment) => {
        const authorName = comment.author.name ?? 'Неизвестный автор';
        const commentText = comment.text ?? '';

        const likeClass = comment.isLiked ? '-active-like' : '';
        const loadingClass = comment.isLikeLoading ? '-loading-like' : '';

        html += `
      <li class="comment" data-id="${comment.id}">
        <div class="comment-header">
          <div>${escapeHtml(String(authorName))}</div>
          <div>${String(comment.date)}</div>
        </div>
        <div class="comment-body">
          <div class="comment-text">${escapeHtml(String(commentText))}</div>
        </div>
        <div class="comment-footer">
          <div class="likes">
            <span class="likes-counter">${Number(comment.likes)}</span>
            <button class="like-button ${likeClass} ${loadingClass}" data-id="${comment.id}"></button>
          </div>
        </div>
      </li>`;
    });

    commentsList.innerHTML = html;
}

export function updateCommentUI(commentId) {
    renderComments(comments.filter(c => c.id === commentId));
}