import { BirthdayService } from '../src/BirthdayService';
import { EmployeesRepository } from '../src/infrastructure/EmployeesRepository';
import {
  GreetingsRepository,
  Message,
} from '../src/infrastructure/GreetingsRepository';
import { OurDate } from '../src/OurDate';

describe('Acceptance', () => {
  const SMTP_PORT = 25;
  const SMTP_URL = 'localhost';
  let messagesSent: Message[];
  let service: BirthdayService;
  let messageSender: GreetingsRepository;

  beforeEach(() => {
    messagesSent = [];

    messageSender = new (class extends GreetingsRepository {
      protected deliveryMessage(message: Message) {
        messagesSent = messagesSent.concat(message);
      }
    })(SMTP_PORT, SMTP_URL);
    const employeesRepository = new EmployeesRepository();
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
