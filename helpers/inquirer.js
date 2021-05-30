const inquirer = require('inquirer');

require('colors');

const showMenu = async() => {
    const questionOptions = [
        {
            type: 'list',
            name: 'option',
            message: 'What would you like to do?',
            choices: [
                { value: '1', name: `${'1'.green}.- Create new task` },
                { value: '2', name: `${'2'.green}.- List tasks` },
                { value: '3', name: `${'3'.green}.- List completed tasks` },
                { value: '4', name: `${'4'.green}.- List pending tasks`},
                { value: '5', name: `${'5'.green}.- Complete task(s)` },
                { value: '6', name: `${'6'.green}.- Remove task(s)` },
                { value: '0', name: `${'0'.green}.- Quit\n` },        
            ],
        }        
    ];
    
    console.clear();

    console.log('========================'.green);
    console.log('   Tasks TODO\'s App'.white);
    console.log('========================\n'.green);

    const { option } = await inquirer.prompt(questionOptions);

    return option;
}

const pause = async() => {
    await inquirer.prompt(
        [
            {
                type: 'input',
                name: 'option',
                message: `Press ${'ENTER'.green} to continue`
            }
        ]
    );

    console.log('');

    return;
}

const readInput = async(message) => {
    const question = [
        {
            type: 'input',
            name: 'description',
            message,
            validate(value) {
                if (value.length === 0) {
                    return 'Enter a value for the description';
                } 
                return true;
            }
        }
    ];

    const { description } = await inquirer.prompt(question);

    return description;
}

const confirm = async(message) => {
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message,
        }
    ];

    const { ok } = await inquirer.prompt(question);

    return ok;
}

const listTasksToDelete = async( taskArray = []) => {
    let i = 0;

    const choices = taskArray.map(task => {
        i = i + 1;

        const idx = `${i.toString().green }${'.-'.green} `;

        return {
            value: task.id,
            name: `${idx} ${task.description}`,            
        }
    });

    choices.unshift({
        value: '0',
        name: `${'0.-'.green} Cancel`,
    });

    const questionOptions = [
        {
            type: 'list',
            name: 'id',
            message: 'Select task to delete',
            choices
        }
    ];

    const { id } = await inquirer.prompt(questionOptions);

    return id;
}


const listTasksToComplete = async( taskArray = []) => {
    let i = 0;

    const choices = taskArray.map(task => {
        i++;

        const idx = `${i.toString().green }${'.-'.green} `;

        return {
            value: task.id,
            name: `${idx} ${task.description}`,
            checked: task.completedOn,            
        }
    });

    const question = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Select task(s)',
            choices
        }
    ];

    const { ids } = await inquirer.prompt(question);

    return ids;
}

module.exports = {
    showMenu,
    pause,
    readInput,
    confirm,
    listTasksToDelete,
    listTasksToComplete
}