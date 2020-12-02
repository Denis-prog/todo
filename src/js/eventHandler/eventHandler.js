import renderElement from '../render/index';
import {
    getNoteTemplate,
    getColumnTemplate,
    getNoteTemplatePreview,
} from '../views/index';
import { domElements, CONSTANTS } from '../shared';
import {
    setFocusElement,
    setCursorText,
    hiddenCursorText,
    getTextField,
    getCurrentColumnId,
    showLoader,
    hiddenLoader,
    showError,
    isNoteNew,
    removeNewNoteAttr,
} from '../services/index';
import {
    addColumnApi,
    deleteColumnApi,
    updateColumnApi,
    addNoteApi,
    updateNoteApi,
    deleteNoteApi,
} from '../api/index';
import {
    dataRepo,
    repoUpdateDataOfRecords,
} from '../dataRepo/index';
import checkToken from '../auth/auth';
import {
    parseColumn,
    parseNote,
} from '../dataHandler/index';
import {
    subToolsPanelState,
    openSubToolsPanelToggle,
} from './eventHandlerSubToolsPanel';

const setContenteditable = ({ target }, textField) => {
    if (textField) {
        textField.setAttribute('contenteditable', 'true');
        setCursorText(textField);
        return;
    }

    if (target.dataset.noteText || target.dataset.columnHeader) {
        target.setAttribute('contenteditable', 'true');
        setCursorText(target);
    }
};

const removeContenteditable = ({ target }) => {
    if (target.dataset.noteText || target.dataset.columnHeader) {
        target.removeAttribute('contenteditable');
        hiddenCursorText(target);
    }
};

const deleteEmptyNote = ({ target }) => {
    if (target.dataset.noteText && target.textContent.length === 0) {
        target.parentElement.remove();
    }
};

const addNewElement = ({ target }) => {
    const { action } = target.dataset;
    const handler = {
        addNewNotePreview: () => {
            renderElement(
                {},
                getNoteTemplatePreview,
                target.closest('#column').querySelector('[data-notes]'),
            );
            const textField = getTextField('preview', 'note', '[data-note-text]');
            setFocusElement(textField);
            setContenteditable(false, textField);
        },
        addNewColumn: () => {
            checkToken()
                .then((token) => {
                    showLoader();
                    return addColumnApi(token, {});
                })
                .then((resolve) => {
                    const newColumn = parseColumn(resolve);
                    dataRepo.addNewColumn(newColumn);
                    renderElement(
                        newColumn,
                        getColumnTemplate,
                        domElements.columnsBox,
                    );
                    const textField = getTextField(newColumn.id, 'column', '[data-column-text]');
                    setFocusElement(textField);
                    setContenteditable(false, textField);
                })
                .catch((error) => { showError(error.err); })
                .finally(() => { hiddenLoader(); });
        },
    };

    if (action && Object.prototype.hasOwnProperty.call(handler, action)) {
        handler[action]();
    }
};

const addNewNote = (event) => {
    const targetItem = event.target;
    const { typeField, preview } = targetItem.dataset;

    if (typeField === 'noteText' && preview) {
        const repo = repoUpdateDataOfRecords(event);
        const newContent = repo.getNewContent().trim();

        if (newContent) {
            const targetItemParentColumn = targetItem.closest('#column').querySelector('[data-notes]');
            checkToken()
                .then((token) => {
                    showLoader();
                    return addNoteApi(token, {
                        column: getCurrentColumnId(targetItem),
                        text: newContent,
                    });
                })
                .then((resolve) => {
                    const newNote = parseNote(resolve);
                    dataRepo.addNewNote(newNote);
                    console.log(dataRepo.dataByUser);
                    targetItem.closest('[data-note-id="preview"]').remove();
                    renderElement(
                        newNote,
                        getNoteTemplate,
                        targetItemParentColumn,
                    );
                })
                .catch((error) => {
                    targetItem.closest('[data-note-id="preview"]').remove();
                    showError(error.err);
                })
                .finally(() => {
                    hiddenLoader();
                });
        }
    }
};

const updateElement = (event) => {
    const targetItem = event.target;
    const { typeField, preview } = targetItem.dataset;

    if (typeField && !preview) {
        const repo = repoUpdateDataOfRecords(event);
        const contentInit = repo.getContent();
        const newContent = repo.getNewContent();

        if (contentInit !== newContent) {
            const columnParent = targetItem.closest('#column');
            const { columnId } = columnParent.dataset;

            const handler = {
                columnText: () => {
                    checkToken()
                        .then((token) => {
                            showLoader();
                            return updateColumnApi(token, columnId, { title: newContent });
                        })
                        .then((resolve) => {
                            dataRepo.updateColumn(columnId, resolve);
                        })
                        .catch((error) => {
                            targetItem.textContent = contentInit;
                            showError(error);
                        })
                        .finally(() => { hiddenLoader(); });
                },
                noteText: () => {
                    const noteParent = targetItem.closest('[data-note]');
                    const { noteId } = noteParent.dataset;
                    checkToken()
                        .then((token) => {
                            showLoader();
                            return updateNoteApi(
                                token,
                                noteId,
                                { text: newContent, column: columnId },
                            );
                        })
                        .then((resolve) => {
                            console.log(resolve);
                            dataRepo.updateNote(noteId, columnId, parseNote(resolve));
                            console.log(dataRepo.dataByUser);
                        })
                        .catch((error) => {
                            targetItem.textContent = contentInit;
                            showError(error);
                        })
                        .finally(() => { hiddenLoader(); });
                },
            };

            if (Object.prototype.hasOwnProperty.call(handler, typeField)) {
                handler[typeField]();
            }
        }
        /*  const columnParent = targetItem.closest('#column');
         let columnId;

         if (columnParent) { */
        /*    try {
               columnId = columnParent.dataset.columnId;
           } catch (error) {
               showError(error);
           }
    */ /* columnId = columnParent.dataset.columnId; */
    }
};

const setDraggable = ({ target }) => {
    if (target.dataset.noteText || target.dataset.columnHeader) {
        target.parentElement.setAttribute('draggable', 'true');
    }
};

const removeDraggable = ({ target }) => {
    if (target.dataset.noteText || target.dataset.columnHeader) {
        target.parentElement.removeAttribute('draggable');
    }
};

const preliminaryDeleteColumn = ({ target }) => {
    if (target.dataset.closeColumn) {
        const parentElementItem = target.parentElement;
        const idColumn = parentElementItem.dataset.columnId;
        try {
            if (!idColumn) { throw new TypeError('no id'); }
        } catch (e) { showError(e); }

        parentElementItem.classList.add('cancel-delete-column-active');
        parentElementItem.setAttribute('data-confirm-delete', true);
    }
};

const abortDeleteElement = ({ target }) => {
    const { canselDeleteBtn } = target.dataset;

    if (canselDeleteBtn) {
        const handler = {
            column: () => {
                const targetParent = target.closest('#column');
                targetParent.classList.remove('cancel-delete-column-active');
                targetParent.removeAttribute('data-confirm-delete');
            },
            note: () => {
                const targetParent = target.closest('[data-note]');
                targetParent.classList.remove('cancel-delete-note-active');
                targetParent.removeAttribute('data-confirm-delete');
                targetParent.querySelector('[data-type-menu]').checked = false;
            },
        };

        if (Object.prototype.hasOwnProperty.call(handler, canselDeleteBtn)) {
            handler[canselDeleteBtn]();
            return true;
        }
    }

    return false;
};

const deleteElementHadler = (event) => {
    const targetItem = event.target;

    if (targetItem.dataset.closeColumn) {
        return;
    }

    const allColumnWithConfrimDelete = document.querySelectorAll('[data-confirm-delete="true"]');

    if (allColumnWithConfrimDelete.length) {
        const promises = [];
        const elementsId = [];
        const currentElement = allColumnWithConfrimDelete[0].dataset.element;

        const handler = {
            column: () => {
                checkToken()
                    .then((token) => {
                        showLoader();
                        allColumnWithConfrimDelete.forEach((item) => {
                            const idColumn = item.dataset.columnId;
                            elementsId.push(idColumn);
                            promises.push(deleteColumnApi(token, idColumn));
                        });

                        Promise
                            .all(promises.map((item) => Promise
                                .resolve(item)
                                .then((value) => ({
                                    state: 'fulfilled',
                                    value,
                                }), (error) => {
                                    showError(error.err);
                                    return {
                                        state: 'rejected',
                                        reason: error,
                                    };
                                })))
                            .then((res) => {
                                allColumnWithConfrimDelete.forEach((item, index) => {
                                    if (res[index].state === 'fulfilled') {
                                        dataRepo.deleteColumn(elementsId[index]);
                                        item.remove();
                                    } else {
                                        item.classList.remove('cancel-delete-column-active');
                                        item.removeAttribute('data-confirm-delete');
                                    }
                                });
                            })
                            .finally(() => hiddenLoader());
                    });
            },
            note: () => {
                checkToken()
                    .then((token) => {
                        showLoader();
                        allColumnWithConfrimDelete.forEach((item) => {
                            const idNote = item.dataset.noteId;
                            elementsId.push(idNote);
                            promises.push(deleteNoteApi(token, idNote));
                        });

                        Promise
                            .all(promises.map((item) => Promise
                                .resolve(item)
                                .then((value) => ({
                                    state: 'fulfilled',
                                    value,
                                }), (error) => {
                                    showError(error.err);
                                    return {
                                        state: 'rejected',
                                        reason: error,
                                    };
                                })))
                            .then((res) => {
                                allColumnWithConfrimDelete.forEach((item, index) => {
                                    if (res[index].state === 'fulfilled') {
                                        const { currentColumnId } = item.dataset;
                                        dataRepo.deleteNote(elementsId[index], currentColumnId);
                                        item.remove();
                                        subToolsPanelState.isOpenMenuSelection = false;
                                        openSubToolsPanelToggle();
                                    } else {
                                        item.classList.remove('cancel-delete-column-active');
                                        item.removeAttribute('data-confirm-delete');
                                    }
                                });
                            })
                            .finally(() => hiddenLoader());
                    });
            },
        };

        if (Object.prototype.hasOwnProperty.call(handler, currentElement)) {
            handler[currentElement]();
        }
    }
};

export {
    addNewElement,
    setContenteditable,
    removeContenteditable,
    deleteEmptyNote,
    setDraggable,
    removeDraggable,
    preliminaryDeleteColumn,
    deleteElementHadler,
    updateElement,
    addNewNote,
    abortDeleteElement,
};
