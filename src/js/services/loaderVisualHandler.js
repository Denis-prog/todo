import {
    domElements,
} from '../shared/index';


const showLoader = () => {
    domElements.body.classList.add('overflow-hidden-loader');
    domElements.spinner.classList.add('display-block');
};

const hiddenLoader = () => {
    domElements.body.classList.remove('overflow-hidden-loader');
    domElements.spinner.classList.remove('display-block');
};

const showError = (textError) => {
    domElements.body.classList.add('overflow-hidden-error');
    domElements.errorSection.classList.add('display-block');
    if (textError) {
        domElements.errorDescription.textContent = textError;
    }
};

export {
    showLoader,
    hiddenLoader,
    showError,
};
