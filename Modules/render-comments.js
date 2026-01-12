import { escapeHtml } from './escape-html.js';


export function renderComments(comments) {
  const commentsList = document.querySelector('.comments');
  let html = '';

  comments.forEach((comment) => {
    const likeClass = comment.isLiked ? '-active-like' : '';
    html += `
      <li class="comment" data-id="${comment.id}">
        <div class="comment-header">
          <div>${escapeHtml(comment.author.name)}</div>
          <div>${comment.date}</div>
        </div>
        <div class="comment-body">
          <div class="comment-text">${escapeHtml(comment.text)}</div>
        </div>
        <div class="comment-footer">
          <div class="likes">
            <span class="likes-counter">${comment.likes}</span>
            <button class="like-button ${likeClass}" data-id="${comment.id}"></button>
          </div>
        </div>
      </li>`;
  });

  commentsList.innerHTML = html;
}