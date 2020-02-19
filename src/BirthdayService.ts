import Mail from 'nodemailer/lib/mailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

import { EmployeesRepository } from './infrastructure/EmployeesRepository';
import { GreetingsRepository } from './infrastructure/GreetingsRepository';
import { OurDate } from './OurDate';

export class BirthdayService {
  constructor(
    private greetingsRepository: GreetingsRepository,
    private employeesRepository: EmployeesRepository
  ) {}

  sendGreetings(ourDate: OurDate) {
    const employees = this.employeesRepository.getEmployees();

    // print all lines
    employees.forEach(employee => {
      if (employee.isBirthday(ourDate)) {
        this.greetingsRepository.sendGreetingToEmployee(employee);
      }
    });
  }
}

export interface Message extends SMTPTransport.Options, Mail.Options {}
