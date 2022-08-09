'use strict';

// TODO: Write the homework code in this file
const fs = require("fs");
const args = process.argv.slice(2);
const arg = args[0];


const createFile = fs.appendFileSync('./todos.txt', '', (err) => {
    if (err) throw err;
    console.log('To-dos list created');
  });

function readFile() {
    return new Promise(
      resolve => fs.readFile("todos.txt",'utf8', (err, data) => resolve(err ? '' : data)
      )
    );
}
  
function appendFile(...text) {
    return new Promise(
      (resolve, reject) => fs.appendFile("todos.txt",`${text.join(' ')}\n`,
        (err, data) => err
          ? reject(err)
          : resolve(data)
      )
    );
  };  

function printHelp() {
  if(!arg || arg === "help"){
    console.log(`Usage: node index.js [options]
    HackYourFuture Node.js Week 2 - Lecture To-Do App
    Options:
      list          read all to-dos
      add           add to-do
      update        updates item on specific location
      remove        removes specific entry at specific location
      reset         resets file with removing all previous data
      help          show this help text
      `);
};
};

const index = args[1];

function updateFile(index, ...text) { 
    const todo = fs.readFileSync("todos.txt", 'utf8').split('\n');
    let newItem = '';
    if (index >= 0 && index < text.length) {
      const item = todo[index];
      for (let i = 1; i < text.length; i++) { 
        newItem += `${text[i]} `
      }
      const updatedText = newItem;
      
      todo.splice(index, 1);
      todo.splice(index, 0,`${updatedText}`);
      const newData = todo.join('\n');
      fs.writeFileSync("todos.txt", newData, 'utf8');
      console.log(`A to-do item was updated  with new text: ${item} to ${updatedText}`);
    };
};



function removeFile(index) {
    const todo = fs.readFileSync("todos.txt", 'utf8').split('\n');
  if (index >= 0 && index < todo.length) {
    const item = todo[index];
    todo.splice(index, 1);
    const newData = todo.join('\n');
    fs.writeFileSync("todos.txt", newData, 'utf8');
    console.log(`A to-do item was removed  by its 1-base index: ${item}`);
  } 
};

function resetFile() {
    fs.unlinkSync("todos.txt");
    
    fs.open("todos.txt", 'w', function (err, data) {
      if (err) throw err;
      console.log("All to-do items war removed from the list");
    })
  }


switch(arg){
    case "reset": {
        resetFile();
    }
    case 'list': {
        readFile()
            .then(data => console.log(`To-Dos:\n${data}`));
    break;
    }
    case 'add': {
    appendFile(...args)
      .then(() => console.log('Wrote to-do to file'))
      .then(() => readFile())
      .then(data => console.log(`\nTo-Dos:\n${data}`))
      .catch(console.error);
    break;
    }
    case "remove": {
        removeFile(index);
        break;
    }
    case 'update':{
    updateFile(index, ...args);
    break;
    }
    case 'help': {
        printHelp();
        break;
    }
    default: {
        printHelp();
        break;
    }
};
