const fs = require('fs');

const saveFile = (data, filename) => {
    if (!fs.existsSync(filename))
        return null;
        
    fs.writeFileSync(filename, JSON.stringify(data));
}

const readFile = (filename) => {
    if (!fs.existsSync(filename))
        return null;
    
    return JSON.parse(fs.readFileSync(filename, { encoding: 'utf-8'}));
}

module.exports = {
    readFile, 
    saveFile,
}