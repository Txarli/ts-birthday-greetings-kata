import fs from 'fs';
import path from 'path';
import { EmployeesRepository } from 'src/domain/EmployeesRepository';

import { Employee } from '../Employee';

const FILENAME = 'employee_data.txt';

export class FileEmployeesRepository implements EmployeesRepository {
  getEmployees() {
    const data = fs.readFileSync(
      path.resolve(__dirname, `../../resources/${FILENAME}`),
      'UTF-8'
    );
    // split the contents by new line
    const lines = data.split(/\r?\n/);
    lines.shift();
    const employees = lines.map(line => this.createEmployeeFromLine(line));
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
