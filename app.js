//---------------------------------------------------MODULES
const fs = require('fs');
const generatePage = require('./src/page-template.js');


//---------------------===--------------------------VARIABLES
const profileDataArgs = process.argv.slice(2, process.argv.length);
const [userName, githubName] = profileDataArgs;


//--------------------------------------------------FUNCTIONS
fs.writeFile('index.html',generatePage(userName, githubName), err => {
    if (err) throw err;

    console.log('Portfolio complete! Check out index.html to see the output!');
});