import nodemailer from 'nodemailer';

import { Message } from './BirthdayService';
import { Employee } from './Employee';

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
