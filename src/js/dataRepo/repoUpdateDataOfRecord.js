const handler = {
    noteText: {
        content: '',
        newContent: '',
        setNewContent(data) {
            this.newContent = data;
        },
        getContent() {
            return this.content;
        },
        getNewContent() {
            return this.newContent;
        },
        updateData(data) {
            this.content = data;
        },
    },
    columnText: {
        content: 'В плане',
        newContent: '',
        setNewContent(data) {
            this.newContent = data;
        },
        getContent() {
            return this.content;
        },
        getNewContent() {
            return this.newContent;
        },
        updateData(data) {
            this.content = data;
        },
    },
};

const repoUpdateDataOfRecords = ({ target }) => {
    const { typeField } = target.dataset;

    if (typeField && typeField && Object.prototype.hasOwnProperty.call(handler, typeField)) {
        return handler[typeField];
    }

    return null;
};

export default repoUpdateDataOfRecords;
