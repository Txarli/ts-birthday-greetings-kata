import { EmployeesRepository } from './infrastructure/EmployeesRepository';
import { SmtpGreetingsRepository } from './infrastructure/SmtpGreetingsRepository';
import { OurDate } from './OurDate';

export class BirthdayService {
  constructor(
    private greetingsRepository: SmtpGreetingsRepository,
    private employeesRepository: EmployeesRepository
  ) {}

  sendGreetings(ourDate: OurDate) {
    const employees = this.employeesRepository.getEmployees();

    employees.forEach(employee => {
      if (employee.isBirthday(ourDate)) {
        this.greetingsRepository.sendGreetingToEmployee(employee);
      }
    });
  }
}
