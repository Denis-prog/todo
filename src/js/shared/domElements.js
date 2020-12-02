class Dom {
    constructor() {
        this.body = document.querySelector('body');
        this.spinner = document.getElementById('spinner');
        this.errorSection = document.getElementById('error-section');
        this.errorDescription = document.getElementById('error-description');
        this.mainBoxElement = document.getElementById('mainBoxElements');
        this.columnsBox = document.getElementById('columnsBox');
        this.subToolsPanel = document.getElementById('sub-tools-panel');
        this.subToolsPanelCheckboxOption = document.getElementById('sub-tools-panel-checkbox-option');
        this.test = document.getElementById('test');
    }
}

const domElements = new Dom();

export default domElements;
