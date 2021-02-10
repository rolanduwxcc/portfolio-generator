//---------------------------------------------------MODULES
const fs = require('fs');
const generatePage = require('./src/page-template.js');

const inquirer = require('inquirer');
const { type } = require('os');


//---------------------===--------------------------VARIABLES
const promptProject = portfolioData => {
    //if there's no 'projects' array property, create one
    if (!portfolioData.projects) {
        portfolioData.projects = [];
    }

    console.log(`
    ===================
    Add a New Project
    ===================
    `);
    return inquirer.prompt([
        {
            name: 'name',
            type: 'input',
            message: 'What is the name of your project? (required)',
        },
        {
            name: 'description',
            type: 'input',
            message: 'Describe your project. (required)',
        },
        {
            name: 'languages',
            type: 'checkbox',
            message: 'What technologies were used? (Check all that apply)',
            choices: ['html', 'css', 'javaScript', 'ES6', 'node','bootstrap'],
        },
        {
            name: 'link',
            type: 'input',
            message: 'Enter GitHub link to project. (required)',
        },
        {
            name: 'feature',
            type: 'confirm',
            message: 'Would you like to feature this project?',
            default: false,
        },
        {
            name: 'confirmAddProject',
            type: 'confirm',
            message: 'Would you like to enter another project?',
            default: false,
        },
    ])
    .then(projectData => {
        portfolioData.projects.push(projectData);
        if (projectData.confirmAddProject) {
            return promptProject(portfolioData);
        }
        else {
            return portfolioData;
        }
    });
};

const promptUser = () => {
    return inquirer.prompt([
        {
            name: 'name',
            type: 'input',
            message: 'What is your name? (required)',
        },
        {
            name: 'github',
            type: 'input',
            message: 'What is your GitHub Username? (required)',
        },
        {
            name: 'about',
            type: 'input',
            message: 'Provide some information about yoself: ',
        },
    ]);
        // .then((answer) => {
        //     console.log(answer);
        //     console.log("Hello " + answer.userName);
        //     console.log("GitHub name " + answer.githubName);
        // });
};


promptUser()
    .then(promptProject)
    .then(portfolioData => {
        console.log(portfolioData);
    });

//--------------------------------------------------FUNCTIONS
// fs.writeFile('index.html', generatePage(userName, githubName), err => {
//     if (err) throw err;

//     console.log('Portfolio complete! Check out index.html to see the output!');
// });
