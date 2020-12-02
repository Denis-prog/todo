import {
    domElements,
    CONSTANTS,
} from '../shared/index';

import {
    setDataToLocalStorage,
    getDataFromLocalStorge,
} from '../localStorage/index';

const checkToken = () => new Promise((resolve, reject) => {
    const token = getDataFromLocalStorge('token');
    if (!token) {
        reject(new Error('no token'));
    }
    resolve(token);
});

export default checkToken;
