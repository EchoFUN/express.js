function Person(name) {
   this.name = name;
}

Person.prototype = {
   getName : function() {
      return this.name;
   }
}

function Employee(name, employeeID) {
   this.name = name;
   this.employeeID = employeeID;
}

Employee.prototype = new Person();

Employee.prototype.getEmployeeID = function() {
   return this.employeeID;
};

var zhang = new Employee("ZhangSan", "1234");

console.log(zhang.getName());
// "ZhangSan" 