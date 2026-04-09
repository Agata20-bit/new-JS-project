import { comments } from './comments.js';
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
                // Добавляем анимацию
                button.classList.add('-loading-like');
                comment.isLikeLoading = true;

                try {
                    await delay(2000); // Симуляция API-запроса
                    comment.isLiked = !comment.isLiked;
            comment.likes += comment.isLiked ? 1 : -1;
            updateCommentUI(commentId);
        } catch (error) {
            console.error('Ошибка при обновлении лайка:', error);
            // Откат изменений при ошибке
            comment.isLiked = !comment.isLiked;
            comment.likes += comment.isLiked ? -1 : 1;
        } finally {
            // Убираем анимацию
            button.classList.remove('-loading-like');
            comment.isLikeLoading = false;
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
            nameInput.value = comment.author.name;
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
            id: Date.now(),
            name: name,
            text: text,
            date: date,
            likes: 0,
            isLiked: false,
        };

        try {
            await sendComments(newComment);
            await loadComments(); // Перезагружаем комментарии
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