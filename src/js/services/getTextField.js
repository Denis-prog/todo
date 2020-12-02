const getTextField = (id, element, dataAttr) => {
    const selector = `[data-${element}-id="${id}"]`;
    const targetFocus = document.querySelector(selector);
    return targetFocus.querySelector([dataAttr]);
};

export default getTextField;
