//---------------------------------------------------MODULES
const fs = require('fs');
const generatePage = require('./src/page-template.js');

const inquirer = require('inquirer');
const { type } = require('os');

// const generateSite = require('./utils/generate-site.js');
// use object DESTRUCTURING 
const {writeFile, copyFile} = require('./utils/generate-site.js');


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
            choices: ['html', 'css', 'javaScript', 'ES6', 'node', 'bootstrap'],
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

//UNCOMMENT AFTER TESTING
promptUser()
    .then(promptProject)
    .then(portfolioData => {
        return generatePage(portfolioData);
    })
    .then(pageHTML => {
        return writeFile(pageHTML);
    })
    .then(writeFileResponse => {
        console.log(writeFileResponse);
        return copyFile();
    })
    .then(copyFileResponse => {
        console.log(copyFileResponse);
    })
    .catch(err => {
        console.log(err);
    });

// -------------------TESTING DATA--------------------//
// let mockData = {
//     name: 'Lernantino',
//     github: 'lernantino',
//     confirmAbout: true,
//     about:
//         'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque. Nulla eget fringilla nulla. Integer gravida magna mi, id efficitur metus tempus et.',
//     projects: [
//         {
//             name: 'Run Buddy',
//             description:
//                 'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque. Nulla eget fringilla nulla. Integer gravida magna mi, id efficitur metus tempus et. Nam fringilla elit dapibus pellentesque cursus.',
//             languages: ['HTML', 'CSS'],
//             link: 'https://github.com/lernantino/run-buddy',
//             feature: true,
//             confirmAddProject: true
//         },
//         {
//             name: 'Taskinator',
//             description:
//                 'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque. Nulla eget fringilla nulla. Integer gravida magna mi, id efficitur metus tempus et. Nam fringilla elit dapibus pellentesque cursus.',
//             languages: ['JavaScript', 'HTML', 'CSS'],
//             link: 'https://github.com/lernantino/taskinator',
//             feature: true,
//             confirmAddProject: true
//         },
//         {
//             name: 'Taskmaster Pro',
//             description:
//                 'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque. Nulla eget fringilla nulla. Integer gravida magna mi, id efficitur metus tempus et. Nam fringilla elit dapibus pellentesque cursus.',
//             languages: ['JavaScript', 'jQuery', 'CSS', 'HTML', 'Bootstrap'],
//             link: 'https://github.com/lernantino/taskmaster-pro',
//             feature: false,
//             confirmAddProject: true
//         },
//         {
//             name: 'Robot Gladiators',
//             description:
//                 'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque.',
//             languages: ['JavaScript'],
//             link: 'https://github.com/lernantino/robot-gladiators',
//             feature: false,
//             confirmAddProject: false
//         }
//     ]
// };
// const pageHTML = generatePage(mockData);
// fs.writeFile('./dist/index.html', pageHTML, err => {
//     if (err) throw new Error(err);

//     console.log('Page created! Check out indext.html in this directory');

//     fs.copyFile('./src/style.css', './dist/style.css', err => {
//         if (err) {
//             console.log(err);
//             return;
//         }
//         console.log('Style sheet copied successfully!');
//     });
// });