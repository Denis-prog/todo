const getNoteTemplate = (data) => {
    const {
        id,
        columnId,
        text,
        isQuickly,
    } = data;
    return (`<li class="note ${isQuickly ? 'note-quickly' : ''}" data-note="true" data-element="note" data-note-id="${id}" data-current-column-id=${columnId}>
        <button data-cansel-delete-btn="note" class="cancel-delete-note">отменить удаление</button>
                <label class="note-checkbox-label">
                    <input type="checkbox" class="note-checkbox-input" data-type-menu="selection">
                    <span class="note-checkbox-custom"></span>
                </label>
                <p class="note-text" data-note-text="true" data-type-field="noteText" tabindex="0">${text}</p>
        </li>`
    );
};

export default getNoteTemplate;
