const Task = require("./task");

class Tasks {
    _list = {};

    constructor() {
        this._list = {};
    }

    get ArrayList() {
        const list = [];

        Object.keys(this._list).forEach(
            key => list.push(this._list[key])
        );

        return list;
    }

    addTask(desc) {
        const task = new Task(desc);

        this._list[task.id] = task;
    }

    deleteTask(id = '') {
        if (this._list[id]) {
            delete this._list[id];
        }
    }

    loadTasksFromArray(taskArray = []) {
        taskArray.forEach(task => this._list[task.id] = task);
    }

    listAll() {
        console.log('');

        this.ArrayList.forEach((task, index) => {
            const idx = `${index + 1}`.green;
            const { description, completedOn } = task;
            const status = completedOn !== null ? `Completed (${completedOn})`.green : 'Pending'.red;

            console.log(`${idx}.- ${description} :: ${status}`);
        });

        console.log('');
    }

    listComplete() {
        let i = 0;

        console.log('');

        this.ArrayList.forEach(task => {
            const { description, completedOn } = task;

            if (completedOn) {
                i++;
                
                const idx = `${i}.-`.green;

                const status = `Completed (${completedOn})`.green

                console.log(`${idx}.- ${description} :: ${status}`);
            }
        });

        console.log('');
    }

    listPending() {
        let i = 0;

        console.log('');

        this.ArrayList.forEach((task, index) => {
            const { description, completedOn } = task;

            if (!completedOn) {
                i++;
                
                const idx = `${i}.-`.green;

                const status = 'Pending'.red;

                console.log(`${idx}.- ${description} :: ${status}`);
            }
        });

        console.log('');
    }

    toggleComplete(idArray = []) {
        idArray.forEach(id => {
            if ( !this._list[id].completedOn ) {
                this._list[id].completedOn = new Date().toISOString(); 
            }
        });

        this.ArrayList.forEach(task => {
            if (!idArray.includes(task.id)) {
                task.completedOn = null;
            }
        });
    }
}

module.exports = Tasks;