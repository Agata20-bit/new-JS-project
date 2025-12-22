import { comments } from './Modules/comments.js';
import { renderComments } from './Modules/render-comments.js';
import { handleLikes, setupReplyHandler, setupAddCommentHandler } from './Modules/event-handlers.js';
import { fetchComments } from './Modules/comments.js';

document.addEventListener('DOMContentLoaded', async () => {
  const commentsFromAPI = await fetchComments();
  renderComments(commentsFromAPI);
  handleLikes();
  setupReplyHandler();
  setupAddCommentHandler();
  console.log('It works!');
});