const getNoteTemplatePreview = () => (`<li class="note" data-note="true" data-element="note" data-note-id="preview">
        <button data-cansel-btn="true" class="cancel-delete-note">отменить удаление</button>
                <label class="note-checkbox-label">
                    <input type="checkbox" class="note-checkbox-input" data-type-menu="selection">
                    <span class="note-checkbox-custom"></span>
                </label>
                <p class="note-text" data-note-text="true" data-type-field="noteText" data-preview="true" contenteditable="true" tabindex="0"></p>
        </li>`
);

export default getNoteTemplatePreview;
