const setDataToLocalStorage = (key, value) => {
    localStorage.setItem(key, value);
};

const getDataFromLocalStorge = (key) => localStorage.getItem(key);

export {
    setDataToLocalStorage,
    getDataFromLocalStorge,
};
