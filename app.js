//---------------------------------------------------MODULES
const fs = require('fs');
const generatePage = require('./src/page-template.js');

const inquirer = require('inquirer');
const { type } = require('os');


//---------------------===--------------------------VARIABLES
const promptProject = () => {
    console.log(`
    ===================
    Add a New Project
    ===================
    `);
    return inquirer.prompt([
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
            type: 'checkbox',
            message: 'What technologies were used? (Check all that apply)',
            choices: ['html', 'css', 'javaScript', 'ES6', 'node','bootstrap'],
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
            default: false,
        },
        {
            name: 'doAgain',
            type: 'confirm',
            message: 'Would you like to enter another project?',
            default: false,
        },
    ]);
};

const promptUser = () => {
    return inquirer.prompt([
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
            name: 'enterAboutMe',
            type: 'confirm',
            message: 'Would you like to enter some information about yoself for an "about" section?',
            default: false,
        },
    ]);
        // .then((answer) => {
        //     console.log(answer);
        //     console.log("Hello " + answer.userName);
        //     console.log("GitHub name " + answer.githubName);
        // });
};


promptUser()
    .then(answers => console.log(answers))
    .then(promptProject)
    .then(projectAnswers => console.log(projectAnswers));

//--------------------------------------------------FUNCTIONS
// fs.writeFile('index.html', generatePage(userName, githubName), err => {
//     if (err) throw err;

//     console.log('Portfolio complete! Check out index.html to see the output!');
// });
