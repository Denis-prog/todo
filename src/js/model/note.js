export default class Note {
    constructor(id, column, text, isQuickly, dateCreate, dateUpdate) {
        this.id = id;
        this.columnId = column;
        this.text = text;
        this.isQuickly = isQuickly;
        this.dateCreate = dateCreate;
        this.dateUpdate = dateUpdate;
    }
}
