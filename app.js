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
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('Please enter a project name!');
                    return false;
                }
            }
        },
        {
            name: 'description',
            type: 'input',
            message: 'Describe your project. (required)',
            validate: descriptionInput => {
                if (descriptionInput) {
                    return true;
                } else {
                    console.log('Please enter a project description!');
                    return false;
                }
            }
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
            validate: linkInput => {
                if (linkInput) {
                    return true;
                } else {
                    console.log('Please enter the GitHub link!');
                    return false;
                }
            }
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
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('Please enter your name!');
                    return false;
                }
            }
        },
        {
            name: 'github',
            type: 'input',
            message: 'What is your GitHub Username? (required)',
            validate: githubInput => {
                if (githubInput) {
                    return true;
                } else {
                    console.log('Please enter your GitHub Username!');
                    return false;
                }
            }
        },
        {
            type: 'confirm',
            name: 'confirmAbout',
            message: 'Would you like to enter some info about yoself for an "About" section?',
            default: true,
        },
        {
            name: 'about',
            type: 'input',
            message: 'Provide some information about yoself: ',
            when: ({ confirmAbout }) => {
                if (confirmAbout) {
                    return true;
                } else {
                    return false;
                }
            }
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
