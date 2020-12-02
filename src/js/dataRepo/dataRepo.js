import { getDataByUser } from '../dataHandler/index';

class Repo {
    constructor() {
        this.dataByUser = [];
    }

    getUserData = (token) => (this.dataByUser.length
        ? Promise.resolve(this.dataByUser)
        : getDataByUser(token).then((result) => {
            this.dataByUser = result;
            return this.dataByUser;
        }));

    addNewColumn = (obj) => {
        this.dataByUser.push(obj);
    };

    deleteColumn = (id) => {
        this.dataByUser = this.dataByUser.filter((item) => item.id !== id);
    }

    updateColumn = (id, obj) => {
        const column = this.dataByUser.find((currentColumn) => currentColumn.id === id);
        column.title = obj.title;
    }

    addNewNote = (obj) => {
        const { columnId } = obj;
        const column = this.dataByUser.find((item) => item.id === columnId);
        column.notes.push(obj);
    }

    updateNote = (noteId, columnId, obj) => {
        const column = this.dataByUser
            .find((currentColumn) => currentColumn.id === columnId);

        const noteIndex = column.notes.findIndex((currentNote) => currentNote.id === noteId);
        column.notes.splice(noteIndex, noteIndex, obj);
    }

    deleteNote = (noteId, columnId) => {
        const column = this.dataByUser
            .find((currentColumn) => currentColumn.id === columnId);
        const noteIndex = column.notes.findIndex((currentNote) => currentNote.id === noteId);
        column.notes.splice(noteIndex, noteIndex);
    }
}

const dataRepo = new Repo();

export {
    dataRepo,
};
