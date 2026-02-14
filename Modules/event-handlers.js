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

                try {
                    await sendComments({
                        id: comment.id,
                        name: comment.name ?? 'Неизвестный автор', // значение по умолчанию
                        text: comment.text ?? '', // значение по умолчанию
                        likes: comment.likes,
                        isLiked: comment.isLiked,
                    });
                    updateCommentUI(commentId);
                } catch (error) {
                    console.error('Ошибка при обновлении лайка:', error);
                    comment.isLiked = !comment.isLiked;
                    comment.likes += comment.isLiked ? -1 : 1;
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

    addButton?.addEventListener('click', () => {
        const name = nameInput.value.trim();
        const text = textInput.value.trim();

        if (!name || !text) {
            alert('Заполнены не все поля');
            return;
        }

        const date = new Date().toISOString().replace('T', ' ').slice(0, 19); // Например: 2023-12-05 12:34:56

        const newComment = {
            name: name,
            text: text,
            date: date,
            likes: 0,
            isLiked: false,
        };

        sendComments(newComment)
            .then(() => fetchComments())
            .then((data) => {
                comments = data.comments; // Обновляем локальный массив
                renderComments(comments);
                nameInput.value = '';
                textInput.value = '';
            })
            .catch((error) =>
                console.error('Ошибка отправки комментария:', error),
            );
    });
}
