
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
                message: 'What is your Github username?'
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


newEmployee();