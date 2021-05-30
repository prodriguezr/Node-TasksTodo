require('colors');

const { saveFile, readFile } = require('./helpers/db');
const { 
    showMenu, 
    pause, 
    readInput,
    listTasksToDelete,
    listTasksToComplete,
    confirm, 
} = require('./helpers/inquirer');
const Tasks = require('./models/tasks');

const filename = './db/db.json';

console.clear();

const main = async() => {
    let option = '';

    const tasks = new Tasks();

    const taskArray = readFile(filename);

    if (taskArray) {
      tasks.loadTasksFromArray(taskArray);
    }

    do {
        option = await showMenu();

        switch (option) {
            case '1':
                const description = await readInput('Description: ');
                tasks.addTask(description);
                
                break;
            case '2':
                tasks.listAll();

                break;
            case '3':
                tasks.listComplete();

                break;
            case '4':
                tasks.listPending();

                break;
            case '5':
                const ids = await listTasksToComplete(tasks.ArrayList);

                const ok = await confirm('Are you sure?');
                
                if (ok) {
                    tasks.toggleComplete(ids);

                    console.log('Task(s) updated successfully');
                }
            
                break;
            case '6':
                const id = await listTasksToDelete(tasks.ArrayList);
                
                if (id !== '0') {
                    const ok = await confirm('Are you sure?');
                
                    if (ok) {
                        tasks.deleteTask(id);
    
                        console.log('Task deleted successfully');
                    }
                } 

                break;
            }

        saveFile(tasks.ArrayList, filename);

        if (option !== '0') await pause();
    } while (option !== '0')
}

main();