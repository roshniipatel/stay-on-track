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
        case 'Update an employee role':
          updateEmployee();
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
  db.end();
};

// tutor helped cut and clean up large blocks of codes!
// function to view all the departments
function listDepartment() {
  const request = "SELECT * FROM department";
  db.query(request, function (err, response) {
    if (err) throw err;
    console.log("Viewing all departments");
    console.table(response);
    init();
  })
};

// function to view all the roles
function listRoles() {
  let request = "SELECT * FROM role";
  db.query(request, function (err, response) {
    if (err) throw err;
    console.log("Viewing all the roles");
    console.table(response);
    init();
  })
};

// function for viewing all employees
function listEmployees() {
  const request = "SELECT * FROM employee";
  db.query(request, function (err, response) {
    if (err) throw err;
    console.log("Viewing all employees");
    console.table(response);
    init();
  })
};

// function for adding a department 
function addDepartment() {
  inquirer.prompt([
    {
      type: 'input',
      message: 'What is the name of the new Department?',
      name: 'name'
    }
  ])

    .then(function (response) {
      db.query(`INSERT INTO department (name) VALUES (?)`,
        [response.name]), function (err, response) {
          if (err) throw err;
          console.table(response);
        }
        init();
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
        type: 'input',
        message: 'Which department does this role belong to?',
        name: 'department'
      }
    ])
    .then(function (response) {
      db.query('INSERT INTO role(title, salary, department_id) VALUES (?,?,?)',
        [response.role, response.salary, response.department]), function (err, response) {
          if (err) throw err;
          console.table(response);
        }
        init();
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
        init();
    })
};

// function for updating a current employee's role
function updateEmployee() {
  inquirer.prompt([
    {
      type: 'input',
      message: 'What is the ID of the employee you want to update?',
      name: 'id'
    },
    {
      type: 'input',
      message: 'What is the new role ID for this employee?',
      name: 'role_id'
    }
  ])
    .then(function (response) {
      db.query('UPDATE employee SET role_id = ? WHERE id = ?',
        [response.role_id, response.id], function (err, response) {
          if (err) throw err;
          console.table(response);
          console.log(`Employee ${response.id} has been updated with new role ID ${response.role_id}`);
        });
        init();
    });
}

init();
