const CONSTANTS = {
    request_url: {
        createUserUrl: 'http://localhost:4000/createUser',
        getAllDataUrl: 'http://localhost:4000/getAllDataByUser',
        addColumnUrl: 'http://localhost:4000/createColumn',
        deleteColumnUrl: 'http://localhost:4000/deleteColumn/',
        updateColumnUrl: 'http://localhost:4000/updateColumn/',
        addNoteUrl: 'http://localhost:4000/createNote',
        updateNoteUrl: 'http://localhost:4000/updateNote/',
        deleteNoteUrl: 'http://localhost:4000/deleteNote/',
    },
    note: {
        id: 7,
        counterId() { this.id += 1; },
        getId() { return this.id; },
    },
    column: {
        id: 3,
        counterId() { this.id += 1; },
        getId() { return this.id; },
    },
};

export default CONSTANTS;
