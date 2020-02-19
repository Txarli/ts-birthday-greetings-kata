import { Message, Transport } from '../SmtpGreetingDelivery';

export class InMemoryTransport implements Transport {
  messagesSent: Message[];
  constructor() {
    this.messagesSent = [];
  }
  sendMail(message: Message) {
    this.messagesSent = [...this.messagesSent, message];
  }
}
