//---------------------------------------------------MODULES
const fs = require('fs');
const generatePage = require('./src/page-template.js');
const inquirer = require('inquirer');
const { type } = require('os');


//---------------------===--------------------------VARIABLES
const profileDataArgs = process.argv.slice(2, process.argv.length);
const [userName, githubName] = profileDataArgs;

inquirer.prompt([
    {
        name: 'userName',
        type: 'input',
        message: 'What is your name? (required)',
    },
    {
        name: 'githubName',
        type: 'input',
        message: 'What is your GitHub Username? (required)',
    },
    {
        name: 'enterAboutMe?',
        type: 'confirm',
        message: 'Would you like to enter some information about yoself for an "about" section?',
        default: 'Yes',
    },    
    {
        name: 'projectName',
        type: 'input',
        message: 'What is the name of your project? (required)',
    },
    {
        name: 'description',
        type: 'input',
        message: 'Describe your project. (required)',
    },
    {
        name: 'builtWith',
        type: 'list',
        message: 'What technologies were used? (Check all that apply)',
        choices: ['html', 'css', 'javaScript', 'ES6', 'node'],
    },
    {
        name: 'url',
        type: 'input',
        message: 'Enter GitHub link to project. (required)',
    },
    {
        name: 'feature?',
        type: 'confirm',
        message: 'Would you like to feature this project?',
        default: 'Y',
    },
    {
        name: 'again?',
        type: 'confirm',
        message: 'Would you like to enter another project?',
        default: 'N',
    },
])
.then((answer) => {
    console.log(answer);
    console.log("Hello " + answer.userName);
    console.log("GitHub name " + answer.githubName);
});



//--------------------------------------------------FUNCTIONS
fs.writeFile('index.html',generatePage(userName, githubName), err => {
    if (err) throw err;

    console.log('Portfolio complete! Check out index.html to see the output!');
});