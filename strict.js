import { comments } from './Modules/comments.js';
import { renderComments } from './Modules/render-comments.js';
import { handleLikes, setupReplyHandler, setupAddCommentHandler } from './Modules/event-handlers.js';

document.addEventListener('DOMContentLoaded', () => {
  renderComments(comments);
  handleLikes();
  setupReplyHandler();
  setupAddCommentHandler();
  console.log('It works!');
});