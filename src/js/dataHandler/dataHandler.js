import {
    getAllData,
} from '../api/index';

import {
    Note,
    Column,
} from '../model/index';

const parseNote = (obj) => {
    if (!obj) {
        return null;
    }

    const {
        id,
        column,
        isQuickly,
        text,
        // eslint-disable-next-line camelcase
        created_at,
        // eslint-disable-next-line camelcase
        updated_at,
    } = obj;

    return new Note(id, column, text, isQuickly, created_at, updated_at);
};

const parseColumn = (obj) => {
    if (!obj) {
        return null;
    }

    const {
        id,
        title,
    } = obj;

    return new Column(id, title);
};

const getRequestByUserData = (token, func, ...args) => new Promise((resolve) => {
    if (typeof func === 'function') {
        func(token).done((result) => {
            const { columns, notes } = result;
            let columnsByUser;
            let notesByUser;

            if (columns instanceof Array && notes instanceof Array) {
                columnsByUser = columns.map(args[0]);
                notesByUser = notes.map(args[1]);
                columnsByUser.forEach((column) => {
                    const notesForColumn = notesByUser
                        .filter((note) => note.columnId === column.id);
                    const currentColumn = column;
                    currentColumn.notes = notesForColumn;
                });
            }

            resolve(columnsByUser);
        });
    }
});


const getDataByUser = (token) => getRequestByUserData(token, getAllData, parseColumn, parseNote);

export {
    getDataByUser,
    parseColumn,
    parseNote,
};
