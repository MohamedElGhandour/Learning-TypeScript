"use strict";
class Department {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.employees = [];
    }
    static createEmployee(name) {
        return { name: name };
    }
    addEmployee(employee) {
        this.employees.push(employee);
    }
    printEmployeesInformation() {
        console.log(this.employees.length);
        console.log(this.employees);
    }
}
Department.fiscalYear = 2021;
class ITDepartment extends Department {
    constructor(id, admins) {
        super(id, "IT");
        this.admins = admins;
    }
    describe() {
        console.log(`Department IT(${this.id}): ${this.name}`);
    }
}
class AccountingDepartment extends Department {
    constructor(id, reports) {
        super(id, "Accounting");
        this.reports = reports;
        this.lastReport = reports[reports.length];
    }
    static getInstance() {
        if (AccountingDepartment.instance)
            return this.instance;
        this.instance = new AccountingDepartment("D2", []);
        return this.instance;
    }
    addEmployee(employee) {
        if (employee === "Mohamed")
            return console.log("the username is taken");
        this.employees.push(employee);
    }
    addReport(report) {
        this.reports.push(report);
        this.lastReport = report;
    }
    printReports() {
        console.log(this.reports);
    }
    describe() {
        console.log(`Department Accounting(${this.id}): ${this.name}`);
    }
    get mostRecentReport() {
        if (this.lastReport)
            return this.lastReport;
        throw new Error("No Report Found.");
    }
    set mostRecentReport(report) {
        if (!report)
            throw new Error("Please Pass in a valid Report!");
        this.addReport(report);
    }
}
const employee1 = Department.createEmployee("Mohamed");
console.log(employee1, Department.fiscalYear);
const it = new ITDepartment("d1", ["Mohamed"]);
it.addEmployee("Mohamed");
it.addEmployee("Ahmed");
it.describe();
it.printEmployeesInformation();
console.log(it);
const accounting = AccountingDepartment.getInstance();
const accounting1 = AccountingDepartment.getInstance();
console.log(accounting, accounting1);
accounting.addReport("Some Thing Went Wrong ...");
accounting.mostRecentReport = "Setter Is Working!";
console.log(accounting.mostRecentReport);
accounting.addEmployee("Mohamed");
accounting.addEmployee("Ahmed");
accounting.printReports();
accounting.describe();
accounting.printEmployeesInformation();
