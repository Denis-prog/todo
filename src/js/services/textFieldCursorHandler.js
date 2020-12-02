const setCursorText = (field) => {
    field.classList.add('cursor-text');
    const range = document.createRange();
    range.selectNodeContents(field);
    range.collapse(false);
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
};

const hiddenCursorText = (field) => {
    field.classList.remove('cursor-text');
};

export {
    setCursorText,
    hiddenCursorText,
};
