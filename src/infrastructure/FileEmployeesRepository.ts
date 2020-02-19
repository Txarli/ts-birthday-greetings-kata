import fs from 'fs';
import path from 'path';
import { EmployeesRepository } from 'src/domain/EmployeesRepository';
import { OurDate } from 'src/domain/model/OurDate';

import { Employee } from '../domain/model/Employee';

export class FileEmployeesRepository implements EmployeesRepository {
  constructor(private fileName: string) {}

  getEmployeesByBirthDate(birthDate: OurDate) {
    const data = fs.readFileSync(
      path.resolve(__dirname, `../../resources/${this.fileName}`),
      'UTF-8'
    );
    // split the contents by new line
    const lines = data.split(/\r?\n/);
    lines.shift();
    const employees = lines
      .map(line => this.createEmployeeFromLine(line))
      .filter(employee => employee.isBirthday(birthDate));
    return employees;
  }
  private createEmployeeFromLine(line: string) {
    const employeeData = line.split(', ');
    const employee = new Employee(
      employeeData[1],
      employeeData[0],
      employeeData[2],
      employeeData[3]
    );
    return employee;
  }
}
