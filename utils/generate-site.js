const fs = require('fs');

//creating a JS Promise!
//3 states Pending, Resolved, Rejected/failed
const writeFile = fileContent => {
    //resolve and reject are function parameters
    return new Promise((resolve, reject) => {
        fs.writeFile('./dist/index.html', fileContent, err => {
            // if there's an error, reject the Promise and sent the error to the Promise's `.catch()` method
            if (err) {
                reject(err);
                //return out of the function to make sure the Promise doesn't accidentally exectue the resove() func as well
                return;
            }
            
            //if everything went well, resolve the Promise and send the successful data to the `.then()` method
            resolve({
                ok: true,
                message: 'File create!'
            });
        });
    });
};


// //Test code for writeFile, adjust the directory param above
// //but running the test below will allow testing the reject/catch :)
// const sampleHtml = '<h1>This will be written to the file!</h1>';

// writeFile(sampleHtml)
//   .then(successfulResponse => {
//     // this will run when we use `resolve()`
//     console.log(successfulResponse);
//   })
//   .catch(errorResponse => {
//     // this will run when we use `reject()`
//     console.log(errorResponse);
//   });
// //END TESTING CODE 

const copyFile = () => {
    return new Promise((resolve, reject) => {
        fs.copyFile('./src/style.css', './dist/style.css', err => {
            if(err) {
                reject(err);
                return;
            }

            resolve({
                ok: true,
                message: 'Styles copied!'
            });
        });
    });
};

// //Test function above by calling it as is to test Reject
// //Adjust relative path to tetst Resolve case
// copyFile();