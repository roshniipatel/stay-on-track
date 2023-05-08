// GIVEN a command-line application that accepts user input
// WHEN I start the application
// THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
// WHEN I choose to view all departments
// THEN I am presented with a formatted table showing department names and department ids
// WHEN I choose to view all roles
// THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
// WHEN I choose to view all employees
// THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
// WHEN I choose to add a department
// THEN I am prompted to enter the name of the department and that department is added to the database
// WHEN I choose to add a role
// THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
// WHEN I choose to add an employee
// THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
// WHEN I choose to update an employee role
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database 

// imports
const inquirer = require('inquirer');
const mysql = require('mysql2');

// connecting to mysql database
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'shadow_db'
  },
  console.log(`You have connected to the shadow_db database ➰.`)
);

function init() {
  inquirer.prompt([
    {
      type: 'list',
      message: 'What do you want to do?',
      name: 'start',
      choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update an employee role',
        'Leave the application'
      ],
    }
  ])
    .then((answer) => {
      console.log(answer);
      switch (answer.start) {
        case 'View all departments':
          listDepartment();
          break;
        case 'View all roles':
          listRoles();
          break;
        case 'View all employees':
          listEmployees();
          break;
        case 'Add a department':
          addDepartment();
          break;
        case 'Add a role':
          addRole();
          break;
        case 'Add an employee':
          addEmployee();
          break;
        case 'Delete an employee':
          deleteEmployee();
          break;
        case 'Leave the application':
          Leave();
          break;
        default:
          console.log("Uh-Oh, somethin' looks fishy..")
      }
    })
};

// function to leave the app
function Leave() {
  console.log('Toodles!');
  db.exit();
}

// tutor helped cut and clean up large blocks of codes!

// function to view all the departments
function listDepartment() {
  const request = "SELECT * FROM department";
  db.query(request, function (err, response) {
    if (err) throw err;
    console.log("Viewing all departments");
    console.table(response);
  })
}

// function to view all the roles
function listRoles() {
  let request = "SELECT * FROM role";
  db.query(request, function (err, response) {
    if (err) throw err;
    console.log("Viewing all the roles");
    console.table(response);
  })
}

// function for viewing all employees
function listEmployees() {
  const request = "SELECT * FROM employee";
  db.query(request, function (err, response) {
    if (err) throw err;
    console.log("Viewing all employees");
    console.table(response);
  })
}

// function for adding a department 
function addDepartment() {
  inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is the name of the new Department?'
    }
  ])
    .then((answer) => {
      const { name } = answer;
      const stringInfo = `INSERT INTO department (name) VALUES (?)`;
      db.query(stringInfo, name, (err, result) => {
        if (err) throw err;
        console.log(`'${name}' added to department database`);
        viewDepartments();
      })
    })
};

// function for adding a role


// function for adding a new employee
function addEmployee() {
  inquirer.prompt([
    {
      type: 'input',
      message: 'What is the first name of this employee?',
      name: 'FirstName'
    },
    {
      type: 'input',
      message: 'What is the last name of this employee?',
      name: 'LastName'
    },
    {
      type: 'input',
      message: 'What is the role ID of this employee?',
      name: 'RoleID'
    },
    {
      type: 'input',
      message: 'What is the manager ID of this employee?',
      name: 'ManagerID'
    }

  ])
    .then(function (response) {
      db.query('INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)',
        [response.FirstName, response.LastName, response.RoleID, response.ManagerID]), function (err, response) {
          if (err) throw err;
          console.table(res);
        }
    })
}

// function for updating a current employee

init();
