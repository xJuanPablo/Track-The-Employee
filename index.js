const inquirer = require("inquirer");
const mysql = require('mysql2');
const cTable = require("console.table");
const db = require("./config/connect");

db.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + db.threadId);

  startScreen();
});


function startScreen() {
  inquirer
    .prompt({
      type: "list",
      choices: [
        "Add department",
        "Add role",
        "Add employee",
        "View departments",
        "View roles",
        "View employees",
        "Update employee role",
        "Delete employee",
        "Delete department",
        "Quit"
      ],
      message: "What would you like to do?",
      name: "option"
    })
    .then(function(result) {
      console.log("You entered: " + result.option);

      switch (result.option) {
        case "Add department":
          addDepartment();
          break;
        case "Add role":
          addRole();
          break;
        case "Add employee":
          addEmployee();
          break;
        case "View departments":
          viewDepartment();
          break;
        case "View roles":
          viewRoles();
          break;
        case "View employees":
          viewEmployees();
          break;
        case "Update employee role":
          updateEmployee();
          break;
          case "Delete employee":
          deleteEmployee();
        default:
          quit();
      }
    });
}


function addDepartment() {


    inquirer.prompt({
      
        type: "input",
        message: "What is the name of the department?",
        name: "deptName"

    }).then(function(answer){



        db.query("INSERT INTO department (department_name) VALUES (?)", [answer.deptName] , function(err, res) {
            if (err) throw err;
            console.table(res)
            startScreen()
    })
    })
}

function addRole() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What's the name of the role?",
        name: "roleName"
      },
      {
        type: "input",
        message: "What is the salary for this role?",
        name: "salaryTotal"
      },
      {
        type: "input",
        message: "What is the department id number?",
        name: "deptID"
      }
    ])
    .then(function(answer) {


      db.query("INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)", [answer.roleName, answer.salaryTotal, answer.deptID], function(err, res) {
        if (err) throw err;
        console.table(res);
        startScreen();
      });
    });
}



function addEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What's the first name of the employee?",
        name: "eeFirstName"
      },
      {
        type: "input",
        message: "What's the last name of the employee?",
        name: "eeLastName"
      },
      {
        type: "input",
        message: "What is the employee's role id number?",
        name: "roleID"
      }
    ])
    .then(function(answer) {

      
      db.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, NULL);", [answer.eeFirstName, answer.eeLastName, answer.roleID], function(err, res) {
        if (err) throw err;
        console.table(res);
        startScreen();
      });
    });
}

function updateEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Which employee would you like to update?",
        name: "eeUpdate"
      },

      {
        type: "input",
        message: "What do you want to update to?",
        name: "updateRole"
      }
    ])
    .then(function(answer) {

      db.query('UPDATE employee SET role_id=? WHERE first_name= ?',[answer.updateRole, answer.eeUpdate],function(err, res) {
        if (err) throw err;
        console.table(res);
        startScreen();
      });
    });
}

function viewDepartment() {
  let query = "SELECT * FROM department";
  db.query(query, function(err, res) {
    if (err) throw err;
    console.table(res);
    startScreen();
  });
}

function viewRoles() {
  let query = "SELECT * FROM roles";
  db.query(query, function(err, res) {
    if (err) throw err;
    console.table(res);
    startScreen();
  });
}

function viewEmployees() {
  let query = "SELECT * FROM employee";
  db.query(query, function(err, res) {
    if (err) throw err;
    console.table(res);
    startScreen();
  });
}

function quit() {
  db.end();
  process.exit();
}


function deleteEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What's the employee's id number?",
        name: "eeIdNumber"
      },
    ])
    .then(function (answer) {
      const employeeId = answer.eeIdNumber;
      db.query("DELETE FROM employee WHERE id = ?", [employeeId], function (
        err,
        result
      ) {
        if (err) {
          console.error("Error deleting employee:", err);
        } else {
          console.log("Employee deleted successfully.");
        }
        startScreen();
      });
    })
    .catch(function (error) {
      console.error("An error occurred:", error);
      startScreen();
    });
}