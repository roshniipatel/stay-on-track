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
};

// tutor helped cut and clean up large blocks of codes!

// function to view all the departments
function listDepartment() {
  const request = "SELECT * FROM department";
  db.query(request, function (err, response) {
    if (err) throw err;
    console.log("Viewing all departments");
    console.table(response);
  })
};

// function to view all the roles
function listRoles() {
  let request = "SELECT * FROM role";
  db.query(request, function (err, response) {
    if (err) throw err;
    console.log("Viewing all the roles");
    console.table(response);
  })
};

// function for viewing all employees
function listEmployees() {
  const request = "SELECT * FROM employee";
  db.query(request, function (err, response) {
    if (err) throw err;
    console.log("Viewing all employees");
    console.table(response);
  })
};

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
function addRole() {
  inquirer.prompt([
    {
      type: 'input',
      message: 'What is the new chosen role?',
      name: 'role'
    },
    {
      type: 'input',
      message: 'What is the salary for this role?',
      name: 'salary'
    },
    {
      type: 'list',
      message: 'Which department does this role belong to?',
      choices: ['1', '2', '3', '4'],
      name: 'department'
    }
  ])
    .then(function (response) {
      db.query('INSERT INTO role(title, salary, department_id) VALUES (?,?,?)',
        [response.role, response.salary, response.department]), function (err, response) {
          if (err) throw err;
          console.table(response);
        }
    })
};

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
          console.table(response);
        }
    })
};

// function for updating a current employee


init();
