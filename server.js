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

// function to view all the departments
function listDepartment() {
  const stringInfo = `
  SELECT department.id, 
  department.name FROM department;
  `;
  db.query(stringInfo, (err, result) => {
    if (err) throw err;
    console.table(result);
    init();
  })
};

// function to view all the roles
function listRoles() {
  const stringInfo = `
    SELECT role.id, 
    role.title, 
    department.name AS department, 
    role.salary 
    FROM role 
    JOIN department ON role.department_id = department.id;
    `;
  db.query(stringInfo, (err, result) => {
    if (err) throw err;
    console.table(result);
    init();
  })
};

// function for viewing all employees
function listEmployees() {
  const stringInfo = `
  SELECT employee.id,  
  employee.first_name, 
  employee.last_name, 
  role.title, 
  department.name AS department,
  role.salary,
  CONCAT(manager.first_name, ' ', manager.last_name) AS manager 
  FROM employee
  JOIN role ON employee.role_id = role.id
  JOIN department on role.department_id = department.id
  LEFT JOIN employee manager ON manager.id = employee.manager_id;
  `;
  db.query(stringInfo, (err, result) => {
    if (err) throw err;
    console.table(result);
    init();
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
      message: 'Enter the new role',
      name: 'role'
    },
    {
      type: 'input',
      message: 'Enter the salary for this role',
      name: 'salary'
    },
    {
      type: 'list',
      message: 'Which department does this role belong to?',
      choices: ['Accounting', 'Management', 'Development', 'Human Resources'],
      name: 'departmentType'
    }
  ])
    .then((data) => {
      console.log(data);
      db.query(`
      INSERT INTO role 
      (title, 
      salary, 
      department.name AS department) 
      VALUES (?, ?, ?)`, [data.role, data.salary, data.departmentType], function (err, results) {
        if (err) {
          throw err;
        }
        console.table(results);
      });
    })
}

// function for adding a new employee

// function for updating a current employee

init();

