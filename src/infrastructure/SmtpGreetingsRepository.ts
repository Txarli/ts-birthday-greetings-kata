import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { GreetingsRepository } from 'src/domain/GreetingsRepository';

import { Employee } from '../Employee';

export class SmtpGreetingsRepository implements GreetingsRepository {
  constructor(private smtpPort: number, private smtpUrl: string) {}

  sendGreetingToEmployee(employee: Employee) {
    const recipient = employee.getEmail();
    const body = 'Happy Birthday, dear %NAME%!'.replace(
      '%NAME%',
      employee.getFirstName()
    );
    const subject = 'Happy Birthday!';
    const message = {
      host: this.smtpUrl,
      port: this.smtpPort,
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

export interface Message extends SMTPTransport.Options, Mail.Options {}
