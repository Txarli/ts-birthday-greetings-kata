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
  let messagesSent: Message[];
  let service: BirthdayService;
  let messageSender: SmtpGreetingDelivery;

  beforeEach(() => {
    messagesSent = [];

    const transport: Transport = {
      sendMail: (message: Message) => {
        messagesSent = [...messagesSent, message];
      }
    };

    messageSender = new SmtpGreetingDelivery(SMTP_PORT, SMTP_URL, transport);
    const employeesRepository = new FileEmployeesRepository(FILENAME);
    service = new BirthdayService(messageSender, employeesRepository);
  });

  it('base scenario', () => {
    service.sendGreetings(new OurDate('2008/10/08'));

    expect(messagesSent.length).toEqual(1);
    const message = messagesSent[0];
    expect(message.text).toEqual('Happy Birthday, dear John!');
    expect(message.subject).toEqual('Happy Birthday!');
    const tos = message.to as string[];
    expect(tos.length).toEqual(1);
    expect(tos[0]).toEqual('john.doe@foobar.com');
  });

  it('will not send emails when nobodys birthday', () => {
    service.sendGreetings(new OurDate('2008/01/01'));

    expect(messagesSent.length).toEqual(0);
  });

  it('uses correct transport', () => {
    service.sendGreetings(new OurDate('2008/10/08'));

    const message = messagesSent[0];
    expect(message.host).toEqual(SMTP_URL);
    expect(message.port).toEqual(SMTP_PORT);
  });
});
