import { OurDate } from '../src/domain/model/OurDate';
import { FileEmployeesRepository } from '../src/infrastructure/FileEmployeesRepository';
import {
  Message,
  SmtpGreetingDelivery,
  Transport,
} from '../src/infrastructure/SmtpGreetingDelivery';
import { BirthdayService } from '../src/services/BirthdayService';

describe('Acceptance', () => {
  const SMTP_PORT = 25;
  const SMTP_URL = 'localhost';
  const FILENAME = 'employee_data.txt';
  let service: BirthdayService;
  let messageDelivery: SmtpGreetingDelivery;
  let transport: InMemoryTransport;

  beforeEach(() => {
    transport = new InMemoryTransport();

    messageDelivery = new SmtpGreetingDelivery(SMTP_PORT, SMTP_URL, transport);
    const employeesRepository = new FileEmployeesRepository(FILENAME);
    service = new BirthdayService(messageDelivery, employeesRepository);
  });

  it('base scenario', () => {
    service.sendGreetings(new OurDate('2008/10/08'));

    expect(transport.messagesSent.length).toEqual(1);
    const message = transport.messagesSent[0];
    expect(message.text).toEqual('Happy Birthday, dear John!');
    expect(message.subject).toEqual('Happy Birthday!');
    const tos = message.to as string[];
    expect(tos.length).toEqual(1);
    expect(tos[0]).toEqual('john.doe@foobar.com');
  });

  it('will not send emails when nobodys birthday', () => {
    service.sendGreetings(new OurDate('2008/01/01'));

    expect(transport.messagesSent.length).toEqual(0);
  });

  it('uses correct transport', () => {
    service.sendGreetings(new OurDate('2008/10/08'));

    const message = transport.messagesSent[0];
    expect(message.host).toEqual(SMTP_URL);
    expect(message.port).toEqual(SMTP_PORT);
  });
});

class InMemoryTransport implements Transport {
  messagesSent: Message[];

  constructor() {
    this.messagesSent = [];
  }

  sendMail(message: Message) {
    this.messagesSent = [...this.messagesSent, message];
  }
}
