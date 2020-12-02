import {
    showError,
} from './loaderVisualHandler';

const getCurrentColumnId = (target) => {
    const parentcolumn = target.closest('#column');
    let currentColumnId;
    try {
        currentColumnId = parentcolumn.dataset.columnId;
    } catch (error) {
        showError(error);
    }
    return currentColumnId;
};

export default getCurrentColumnId;
