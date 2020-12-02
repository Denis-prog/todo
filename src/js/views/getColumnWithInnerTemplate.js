const getColumnWithInnerTemplate = (data) => {
    const { id, title, notes } = data;

    let template = `<div class="column" id="column" data-element="column" data-column-id="${id}" tabindex="0">
    <button data-cansel-delete-btn="column" class="cancel-delete-column">отменить удаление</button>
    <i class="far fa-times-circle column-close" data-close-column="true" tabindex="0"></i>
    <p class="column-header" data-column-text="true" data-type-field="columnText" data-column-header="true"  tabindex="0">${title}</p>
    <ul data-notes>`;

    if (notes && Array.isArray(notes)) {
        notes.forEach((note) => {
            template += `<li class="note ${note.isQuickly ? 'note-quickly' : ''}" data-note="true" data-element="note" data-note-id="${note.id}" data-current-column-id=${note.columnId} tabindex="0">
            <button data-cansel-delete-btn="note" class="cancel-delete-note">отменить удаление</button>
            <label class="note-checkbox-label">
                <input type="checkbox" class="note-checkbox-input" data-type-menu="selection">
                <span class="note-checkbox-custom"></span>
            </label>
            <p class="note-text" data-note-text="true" data-type-field="noteText" contenteditable="true" tabindex="0">${note.text}</p>
            </li>`;
        });
    }
    template += `</ul >
    <p class="column-footer">
        <span data-action-addNote class="action" data-action="addNewNotePreview" tabindex="0">+ Добавить карточку</span>
    </p>
    </div > `;

    return template;
};

export default getColumnWithInnerTemplate;
