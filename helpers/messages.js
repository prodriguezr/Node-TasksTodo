require('colors');

const showMenu = () => {
    return new Promise((resolve) => {
        console.clear();

        console.log('========================'.green);
        console.log('   Select an option:'.green);
        console.log('========================\n'.green);
    
        console.log(`${'1'.green}.- Create new task`);
        console.log(`${'2'.green}.- List tasks`);
        console.log(`${'3'.green}.- List completed tasks`);
        console.log(`${'4'.green}.- List pending tasks`);
        console.log(`${'5'.green}.- Complete task(s)`);
        console.log(`${'6'.green}.- Remove task(s)`);
        console.log(`${'0'.green}.- Quit\n`);
    
        const readLine = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout,
        });
    
        readLine.question('Select an option: ', (option) => {
            readLine.close();
            resolve(option);
        });
    });
}

const pause = () => {
    return new Promise((resolve) => {
        const readLine = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout,
        });
    
        readLine.question(`Press ${'ENTER'.green} to continue`, (option) => {
            readLine.close();
            resolve();
        });
    });
}

module.exports = {
    showMenu,
    pause,
}