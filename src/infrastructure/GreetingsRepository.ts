import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

import { Employee } from '../Employee';

const SMTP_PORT = 25;
const SMTP_URL = 'localhost';

export class GreetingsRepository {
  sendGreetingToEmployee(employee: Employee) {
    const recipient = employee.getEmail();
    const body = 'Happy Birthday, dear %NAME%!'.replace(
      '%NAME%',
      employee.getFirstName()
    );
    const subject = 'Happy Birthday!';
    const message = {
      host: SMTP_URL,
      port: SMTP_PORT,
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

interface Message extends SMTPTransport.Options, Mail.Options {}
