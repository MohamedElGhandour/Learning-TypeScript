abstract class Department {
  static fiscalYear = 2021;
  //   private id: string;
  //   public name: string;
  //   private employees: string[] = [];
  protected employees: string[] = [];

  constructor(protected readonly id: string, public name: string) {
    // this.name = name;
    // this.id = id;
    // console.log(Department.fiscalYear);
  }

  static createEmployee(name: string) {
    return { name: name };
  }

  abstract describe(this: Department): void;
  //   {
  //     // this.id = "D2";
  //     console.log(`Department (${this.id}): ${this.name}`);
  //   }

  addEmployee(employee: string) {
    this.employees.push(employee);
  }

  printEmployeesInformation() {
    console.log(this.employees.length);
    console.log(this.employees);
  }
}

class ITDepartment extends Department {
  admins: string[];
  constructor(id: string, admins: string[]) {
    super(id, "IT");
    this.admins = admins;
  }
  describe() {
    console.log(`Department IT(${this.id}): ${this.name}`);
  }
}

class AccountingDepartment extends Department {
  private lastReport: string;
  private static instance: AccountingDepartment;

  private constructor(id: string, private reports: string[]) {
    super(id, "Accounting");
    this.lastReport = reports[reports.length];
  }

  static getInstance() {
    if (AccountingDepartment.instance) return this.instance;
    this.instance = new AccountingDepartment("D2", []);
    return this.instance;
  }

  addEmployee(employee: string) {
    if (employee === "Mohamed") return console.log("the username is taken");
    this.employees.push(employee);
  }
  addReport(report: string) {
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
    if (this.lastReport) return this.lastReport;
    throw new Error("No Report Found.");
  }
  set mostRecentReport(report) {
    if (!report) throw new Error("Please Pass in a valid Report!");
    this.addReport(report);
  }
}

const employee1 = Department.createEmployee("Mohamed");

console.log(employee1, Department.fiscalYear);

const it = new ITDepartment("d1", ["Mohamed"]);

it.addEmployee("Mohamed");
it.addEmployee("Ahmed");

// accountant.employees[2] = "Yahya";
// accountant.employees.push("Ghandour");

// accountant.describe();
// accountant.name = "DUMMY";

it.describe();
it.printEmployeesInformation();

console.log(it);

// const accounting = new AccountingDepartment("D2", []);
const accounting = AccountingDepartment.getInstance();
const accounting1 = AccountingDepartment.getInstance();

console.log(accounting, accounting1);

// console.log(accounting.mostRecentReport);

accounting.addReport("Some Thing Went Wrong ...");

// accounting.mostRecentReport = "";
accounting.mostRecentReport = "Setter Is Working!";

console.log(accounting.mostRecentReport);

accounting.addEmployee("Mohamed");
accounting.addEmployee("Ahmed");

accounting.printReports();
accounting.describe();

accounting.printEmployeesInformation();

// const accountantCopy = { name: "DUMMY", describe: accountant.describe };

// accountantCopy.describe();
