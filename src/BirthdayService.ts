import fs from 'fs';
import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import path from 'path';

import { Employee } from './Employee';
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
      const employeeData = line.split(', ');
      const employee = new Employee(
        employeeData[1],
        employeeData[0],
        employeeData[2],
        employeeData[3]
      );
      if (employee.isBirthday(ourDate)) {
        this.messageSender.sendMessage(employee, smtpHost, smtpPort);
      }
    });
  }
}

export interface Message extends SMTPTransport.Options, Mail.Options {}

export class MessageSender {
  sendMessage(employee: Employee, smtpHost: string, smtpPort: number) {
    const recipient = employee.getEmail();
    const body = 'Happy Birthday, dear %NAME%!'.replace(
      '%NAME%',
      employee.getFirstName()
    );
    const subject = 'Happy Birthday!';
    const message = {
      host: smtpHost,
      port: smtpPort,
      from: 'sender@here.com',
      to: [recipient],
      subject,
      text: body
    };
    this.deliveryMessage(message);
  }

  // made protected for testing :-(
  protected deliveryMessage({ host, port, ...msg }: Message) {
    const transport = nodemailer.createTransport({ host, port });

    transport.sendMail(msg);
  }
}
