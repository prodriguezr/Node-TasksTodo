const { v4: uuidv4 } = require('uuid');

class Task {
    id = '';
    description = '';
    completedOn = null; // Fecha

    constructor(desc) {
        this.id = uuidv4();
        this.description = desc;
    }
}

module.exports = Task;