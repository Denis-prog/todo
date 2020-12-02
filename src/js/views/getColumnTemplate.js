const getColumnTemplate = (data) => {
    const { id, title } = data;

    return (
        `<div class="column" id="column" data-element="column" data-column-id="${id}" tabindex="0">
        <button data-cansel-delete-btn="column" class="cancel-delete-column">отменить удаление</button>
        <i class="far fa-times-circle column-close" data-close-column="true" tabindex="0"></i>
        <p class="column-header" data-column-text="true" data-type-field="columnText" data-column-header="true"  tabindex="0">${title}</p>
        <ul data-notes>
        </ul>
        <p class="column-footer">
            <span data-action-addNote class="action" data-action="addNewNotePreview" tabindex="0">+ Добавить карточку</span>
        </p>
    </div>`
    );
};

export default getColumnTemplate;
