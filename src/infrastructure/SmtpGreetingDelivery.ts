import { GreetingDelivery } from 'src/domain/GreetingDelivery';

import { Employee } from '../domain/model/Employee';

export class SmtpGreetingDelivery implements GreetingDelivery {
  constructor(
    private smtpPort: number,
    private smtpUrl: string,
    private transport: Transport
  ) {}

  sendGreetingToEmployee(employee: Employee) {
    const message = {
      host: this.smtpUrl,
      port: this.smtpPort,
      from: 'sender@here.com',
      to: [employee.getEmail()],
      subject: 'Happy Birthday!',
      text: `Happy Birthday, dear ${employee.getFirstName()}!`
    };
    this.transport.sendMail(message);
  }
}

export interface Transport {
  sendMail: (message: Message) => void;
}

export interface Message {
  host: string;
  port: number;
  from: string;
  to: string[];
  subject: string;
  text: string;
}
