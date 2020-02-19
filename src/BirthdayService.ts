import fs from 'fs';
import Mail from 'nodemailer/lib/mailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import path from 'path';

import { Employee } from './Employee';
import { MessageSender } from './infrastructure/MessageSender';
import { OurDate } from './OurDate';

export class BirthdayService {
  constructor(private messageSender: MessageSender) {}

  sendGreetings(
    fileName: string,
    ourDate: OurDate,
    smtpHost: string,
    smtpPort: number
  ) {
    const data = fs.readFileSync(
      path.resolve(__dirname, `../resources/${fileName}`),
      'UTF-8'
    );

    // split the contents by new line
    const lines = data.split(/\r?\n/);
    lines.shift();

    // print all lines
    lines.forEach(line => {
      const employee = this.getEmployee(line);
      if (employee.isBirthday(ourDate)) {
        this.messageSender.sendMessage(employee, smtpHost, smtpPort);
      }
    });
  }

  private getEmployee(line: string) {
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
