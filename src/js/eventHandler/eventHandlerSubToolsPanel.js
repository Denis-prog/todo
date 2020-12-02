import { domElements, CONSTANTS } from '../shared';

const subToolsPanelState = {
    isOpenMenuSelection: false,
    /*     isOpenMenuTest: false,
     */
};

const openSubToolsPanelToggle = () => {
    if (Object.values(subToolsPanelState).some((item) => item)) {
        domElements.subToolsPanel.classList.add('sub-tools-panel-show');
        return;
    }

    domElements.subToolsPanel.classList.remove('sub-tools-panel-show');
};

/* const isOpenMenuTest = () => {
    const obj = {
        isChecked: !!document.querySelector('[data-type-menu="test"]:checked'),
        classNameShow: 'sub-tools-panel-option-box-show',
        domElement: domElements.test,
        setCurrentState: () => { subToolsPanelState.isOpenMenuTest = this.isChecked; },
    };

    subToolsPanelState.isOpenMenuTest = obj.isChecked;
    return obj;
}; */

const isOpenMenuSelection = () => {
    const obj = {
        isChecked: !!document.querySelector('[data-type-menu="selection"]:checked'),
        classNameShow: 'sub-tools-panel-option-box-show',
        domElement: domElements.subToolsPanelCheckboxOption,
    };

    subToolsPanelState.isOpenMenuSelection = obj.isChecked;
    return obj;
};

const displayMenuToggle = (option) => {
    const {
        isChecked, classNameShow, domElement,
    } = option;

    if (isChecked) {
        domElement.classList.add(classNameShow);
    } else {
        domElement.classList.remove(classNameShow);
    }

    openSubToolsPanelToggle();
};

const displayOptionHandler = ({ target }) => {
    const currentTypeMenu = target.dataset.typeMenu;

    if (currentTypeMenu === 'selection') {
        displayMenuToggle(isOpenMenuSelection());
    }

    /*    if (currentTypeMenu === 'test') {
        displayMenuToggle(isOpenMenuTest());
    } */
};

/* const deleteAfterConfirm = (event) => {
    if (event.target.dataset.canselBtn
        || event.target.dataset.optionCheckbox) {
        return;
    }

    document.querySelectorAll('[data-type-menu="selection"]:checked')
        .forEach((item) => {
            const parentElementItem = item.closest('[data-note]');
            parentElementItem.remove();
        });
    domElements.subToolsPanel.classList.remove('sub-tools-panel-show');
    document.removeEventListener('click', deleteAfterConfirm);
}; */

const subToolsPanelBtnHandler = ({ target }) => {
    const { action } = target.dataset;
    if (action) {
        const handler = {
            uncheckAllElement: () => {
                document.querySelectorAll('[data-type-menu="selection"]')
                    .forEach((item) => {
                        const parentElementItem = item.closest('[data-note]');
                        if (parentElementItem.dataset.confirm !== 'true') {
                            const currentItem = item;
                            currentItem.checked = false;
                        }
                    });
                displayMenuToggle(isOpenMenuSelection());
            },
            checkAllElement: () => {
                document.querySelectorAll('[data-type-menu="selection"]')
                    .forEach((item) => {
                        const currentItem = item;
                        currentItem.checked = true;
                    });
            },
            preliminaryDeleteCheckNote: () => {
                document.querySelectorAll('[data-type-menu="selection"]:checked')
                    .forEach((item) => {
                        const parentElementItem = item.closest('[data-note]');
                        parentElementItem.classList.add('cancel-delete-note-active');
                        parentElementItem.setAttribute('data-confirm-delete', true);
                    });
            },
        };

        if (Object.prototype.hasOwnProperty.call(handler, action)) {
            handler[action]();
        }
    }
};

export {
    displayOptionHandler,
    subToolsPanelBtnHandler,
    subToolsPanelState,
    openSubToolsPanelToggle,
};

/* deleteCheckElement: () => {
    document.querySelectorAll('[data-type-menu="selection"]:checked')
        .forEach((item) => {
            const parentElementItem = item.closest('[data-note]');
            parentElementItem.classList.add('cancel-delete-note-active');
            parentElementItem.setAttribute('data-confirm', 'true');

            const deleteHandler = (event) => {
                const targetItem = event.target;
                if (targetItem.dataset.action === 'deleteCheckElement') {
                    return;
                }

                if (targetItem.dataset.canselBtn) {
                    parentElementItem.classList.remove('cancel-delete-note-active');
                    parentElementItem.removeEventListener('click', deleteHandler);
                    parentElementItem.querySelector('[data-type-menu]').checked = false;
                } else {
                    parentElementItem.remove();
                    domElements.subToolsPanel.classList.remove('sub-tools-panel-show');
                }
            };

            parentElementItem.addEventListener('click', deleteHandler);
        });

    document.addEventListener('click', deleteAfterConfirm);
},
};

if (action && Object.prototype.hasOwnProperty.call(handler, action)) {
handler[action]();
}
}; */
