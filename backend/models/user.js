"use strict";
var dbConn = require("../config/db.config");

//Employee object create
let Employee = function (user) {
  this.first_name = user.first_name;
  this.last_name = user.last_name;
  this.age = user.age;
  this.position = user.position;
  this.email = user.email;
  this.password = user.password;
  this.photo = user.photo;
  this.role = user.role;
  
};
// Crée un user
Employee.create = function (newEmp, result) {
  dbConn.query("INSERT INTO users set ?", newEmp, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      console.log(res.insertId);
      result(null, res.insertId);
    }
  });
};
//  Retrouver un user par id
Employee.findById = function (id,result, user) {
  dbConn.query(
    "Select * from users where id= ? ", 
    id,
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
      result(null, res[0])
      }
      ;
    }
  );
};
// Retrouver tout les user
Employee.findAll = function (result) {
  dbConn.query("Select * from users", function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      console.log("employees : ", res);
      result(null, res);
    }
  });
};
// Mettre un jour un user
Employee.update = function (id, employee, result) {
  dbConn.query(
    "UPDATE users SET `photo`=? WHERE `id` = ?", 
    [ 
      employee.photo,
      id
    ],
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(null, err);
      } else {
        result(null, res);
      }
    }
  );
};

// Supprimer un user

Employee.delete = function (id, result) {
  dbConn.query("DELETE FROM users WHERE id = ?", [id], function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

module.exports = Employee;
