const profileDataArgs = process.argv.slice(2, process.argv.length);
// console.log(profileDataArgs);


const printProfileData = profileDataArr => {
    
    //This for loop.....
    for (let i = 0; i < profileDataArr.length; i++) {
        const element = profileDataArr[i];
        console.log(element);
    }

    console.log("====================");

    //Is the same as this...
    profileDataArr.forEach((profileItem) => {
        console.log("fe"+profileItem);
    });

    console.log("====================");

    profileDataArr.forEach(profileItem => console.log(profileItem));
};

printProfileData(profileDataArgs);