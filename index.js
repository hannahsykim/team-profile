
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const inquirer = require('inquirer');
const fs = require('fs');
const employees = [];

//TODO - write your inquirer app here to gather information about the team members, and generate the HTML file using fs
function newEmployee() {
inquirer.prompt([
    {
        type: 'input',
        message: 'What is name of the employee?',
        name: 'name',
    },
    {
        type: 'list',
        message: 'What position is this employee?',
        name: 'position',
        choices: ['Manager', 'Intern', 'Engineer'],
    },
    {
        type: 'input',
        message: 'What is the employee id?',
        name: 'id',
    },
    {
        type: 'input',
        message: 'What is the email of the employee?',
        name: 'email',
    }
]).then(({position, email, id, name}) => {
    switch (position) {
        case 'Manager' :
        // ask about office number
        inquirer.prompt([
            {
                type: 'input',
                name: 'officeNumber',
                message: 'What is the office number?'
            }
        ]).then(({ officeNumber }) => {
            employees.push(new Manager(
                name,
                id,
                email,
                officeNumber,
            ))
            another()
        });
            break;

        case 'Intern':
        // ask about school 
        inquirer.prompt([
            {
                type: 'input',
                name: 'school',
                message: 'What is name of the school?'
            }
        ]).then(({ school }) => {
            employees.push(new Intern(
                name,
                id,
                email,
                school,
            
            ))
            another()
        });
            break;

        case 'Engineer':
        // ask about github
        inquirer.prompt([
            {
                type: 'input',
                name: 'github',
                message: 'What is the Github username?'
            }
        ]).then(({ github }) => {
            employees.push(new Engineer(
                name,
                id,
                email,
                github,
            ))
            another()
        });
            break;
        
        default :
        //uh oh
        
    }
  })
};

function another() {
    return inquirer.prompt([
        {
            type: 'confirm',
            name: 'more',
            message: 'create another?'
        }
    ]).then(({ more }) => {
            if (more) newEmployee()
            else renderHTMLFile()
        })
    
};

function managerCard(manager) {
    return `
    <div class = "col-auto mb-3">
     <div class = "card" style="width: 18rem;">
        <div class = "card-header">
            <h5 class = "card-title">${manager.name}</h3>
            <small class="text-muted">${manager.role}</small>
        </div>
        <ul class = "list-group list-group-flush">
            <li class = "list-group-item">Id: ${manager.id}</li>
            <li class = "list-group-item">Email: ${manager.email}</li>
            <li class = "list-group-item">Office Number: ${manager.officeNumber}</li>
        </ul>
     </div>
    </div>
    `;
}

function engineerCard(engineer) {
    return `
    <div class = "col-auto mb-3">
     <div class = "card" style="width: 18rem;">
        <div class = "card-header">
            <h5 class = "card-title">${engineer.name}</h3>
            <small class="text-muted">${engineer.role}</small>
        </div>
        <ul class = "list-group list-group-flush">
            <li class = "list-group-item">Id: ${engineer.id}</li>
            <li class = "list-group-item">Email: ${engineer.email}</li>
            <li class = "list-group-item">Github: ${engineer.github}</li>
        </ul>
     </div>   
    </div>
    `;
}

function internCard(intern) {
    return `
    <div class = "col-auto mb-3">
     <div class = "card" style="width: 18rem;">
        <div class = "card-header">
            <h5 class = "card-title">${intern.name}</h3>
            <small class="text-muted">${intern.role}</small>
        </div>
        <ul class = "list-group list-group-flush">
            <li class = "list-group-item">Id: ${intern.id}</li>
            <li class = "list-group-item">Email: ${intern.email}</li>
            <li class = "list-group-item">School: ${intern.school}</li>
        </ul>
     </div>  
    </div>
    `;
}

function renderHTMLFile() {
    fs.writeFileSync('./index.html', /*html*/`
    <html>
        <head>
            <title> Team Profile </title>
            <link rel="stylesheet" href="styles.css">
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css">
        </head>
        <body>
            <div class = "container-fluid mt-4">
                <div class = "justify-content-center mb-4">
                      <h1 id="title">Team Profile</h1>
                </div>
                <div class = "row justify-content-center">
                    ${employees.map((employee) => {
                        switch (employee.getRole()) {
                          case "Manager":
                            return managerCard(employee);
                          case "Engineer":
                            return engineerCard(employee);
                          case "Intern":
                            return internCard(employee);
                        }
                      }
                      ).join("")}   
                </div>
            </div>
        </body>
    </html>
    `
)};
newEmployee();