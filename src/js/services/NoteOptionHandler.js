const isNoteNew = (target) => target.closest('[data-note-new]');

const removeNewNoteAttr = (target) => {
    target.closest('[data-note-new]').removeAttribut('data-note-new');
};

export {
    isNoteNew,
    removeNewNoteAttr,
};
