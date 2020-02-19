import fs from 'fs';
import Mail from 'nodemailer/lib/mailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import path from 'path';

import { Employee } from './Employee';
import { GreetingsRepository } from './infrastructure/GreetingsRepository';
import { OurDate } from './OurDate';

export class BirthdayService {
  constructor(private greetingsRepository: GreetingsRepository) {}

  sendGreetings(
    fileName: string,
    ourDate: OurDate,
    smtpHost: string,
    smtpPort: number
  ) {
    const employees = this.getEmployees(fileName);

    // print all lines
    employees.forEach(employee => {
      if (employee.isBirthday(ourDate)) {
        this.greetingsRepository.sendGreetingToEmployee(
          employee,
          smtpHost,
          smtpPort
        );
      }
    });
  }

  private getEmployees(fileName: string) {
    const data = fs.readFileSync(
      path.resolve(__dirname, `../resources/${fileName}`),
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

export interface Message extends SMTPTransport.Options, Mail.Options {}
