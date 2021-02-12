module.exports = templateData => {
    // console.log(templateData);

    //destructure projects and about from templateData based on property key names
    const {projects, about, ...header} = templateData;

    console.log(projects);
    console.log(about);
    console.log(header);

    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Portfolio Demo</title>
    </head>

    <body>
        <h1>${templateData.name}</h1>
        <h2><a href="https://github.com/${templateData.githubName}">Github</a></h2>
    </body>
    </html>
    `;
};