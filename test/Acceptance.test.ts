import { BirthdayService, Message } from '../src/BirthdayService';
import { MessageSender } from '../src/MessageSender';
import { OurDate } from '../src/OurDate';

describe('Acceptance', () => {
  const SMTP_PORT = 25;
  const SMTP_URL = 'localhost';
  let messagesSent: Message[];
  let service: BirthdayService;
  let messageSender: MessageSender;

  beforeEach(() => {
    messagesSent = [];

    messageSender = new (class extends MessageSender {
      protected deliveryMessage(message: Message) {
        messagesSent = messagesSent.concat(message);
      }
    })();
    service = new BirthdayService(messageSender);
  });

  it('base scenario', () => {
    service.sendGreetings(
      'employee_data.txt',
      new OurDate('2008/10/08'),
      SMTP_URL,
      SMTP_PORT
    );

    expect(messagesSent.length).toEqual(1);
    const message = messagesSent[0];
    expect(message.text).toEqual('Happy Birthday, dear John!');
    expect(message.subject).toEqual('Happy Birthday!');
    const tos = message.to as string[];
    expect(tos.length).toEqual(1);
    expect(tos[0]).toEqual('john.doe@foobar.com');
  });

  it('will not send emails when nobodys birthday', () => {
    service.sendGreetings(
      'employee_data.txt',
      new OurDate('2008/01/01'),
      SMTP_URL,
      SMTP_PORT
    );

    expect(messagesSent.length).toEqual(0);
  });

  it('uses correct transport', () => {
    service.sendGreetings(
      'employee_data.txt',
      new OurDate('2008/10/08'),
      SMTP_URL,
      SMTP_PORT
    );

    const message = messagesSent[0];
    expect(message.host).toEqual(SMTP_URL);
    expect(message.port).toEqual(SMTP_PORT);
  });
});
