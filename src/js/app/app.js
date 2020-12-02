import {
    domElements,
    CONSTANTS,
} from '../shared/index';
import {
    addNewElement,
    setContenteditable,
    removeContenteditable,
    deleteEmptyNote,
    setDraggable,
    removeDraggable,
    preliminaryDeleteColumn,
    displayOptionHandler,
    subToolsPanelBtnHandler,
    deleteElementHadler,
    updateElement,
    addNewNote,
    abortDeleteElement,
} from '../eventHandler/index';
import {
    getColumnWithInnerTemplate,
} from '../views/index';
import renderElement from '../render/index';
import {
    checkAuth,
} from '../api';
import {
    dataRepo,
    repoUpdateDataOfRecords,
} from '../dataRepo/index';
import checkToken from '../auth/auth';
import {
    showLoader,
    hiddenLoader,
    showError,
} from '../services/index';

const init = () => {
    checkToken()
        .then((token) => { showLoader(); return checkAuth(token); })
        .then((token) => dataRepo.getUserData(token))
        .then((data) => {
            data.forEach((item) => renderElement(
                item,
                getColumnWithInnerTemplate,
                domElements.columnsBox,
            ));
            domElements.body.addEventListener('click', (event) => {
                addNewElement(event);
                preliminaryDeleteColumn(event);
                const isaAbortDelete = abortDeleteElement(event);

                if (!isaAbortDelete) {
                    deleteElementHadler(event);
                }

                subToolsPanelBtnHandler(event);
            });

            document.addEventListener('keyup', (event) => {
                if (event.code === 'Enter') {
                    addNewElement(event);
                    preliminaryDeleteColumn(event);
                    subToolsPanelBtnHandler(event);
                    setContenteditable(event);
                }
            });

            domElements.body.addEventListener('focusin', (event) => {
                const targetItem = event.target;
                removeDraggable(event);
                const repoUpdateData = repoUpdateDataOfRecords(event);
                if (repoUpdateData) {
                    repoUpdateData.updateData(targetItem.textContent);
                }
            });

            domElements.body.addEventListener('focusout', (event) => {
                removeContenteditable(event);
                deleteEmptyNote(event);
                setDraggable(event);

                const repoUpdateData = repoUpdateDataOfRecords(event);

                if (repoUpdateData) {
                    repoUpdateData.setNewContent(event.target.textContent);
                }

                addNewNote(event);
                updateElement(event);
            });

            domElements.body.addEventListener('dblclick', (event) => {
                setContenteditable(event);
                event.target.focus();
            });

            domElements.body.addEventListener('change', (event) => {
                displayOptionHandler(event);
            });

            domElements.body.addEventListener('dragstart', (event) => {

            });
        })
        .catch((error) => showError(error.err))
        .finally(() => hiddenLoader());

    /*          */

    /* columns.forEach((column) => {
    const notesForColumn = getNotesForColumn(column.id, notes);
    renderElement([column, notesForColumn], getColumnWithInnerTemplate, domElements.columnsBox);
    }); */
};

export default init;
