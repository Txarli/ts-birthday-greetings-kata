import { GreetingsRepository } from './domain/GreetingsRepository';
import { EmployeesRepository } from './infrastructure/EmployeesRepository';
import { OurDate } from './OurDate';

export class BirthdayService {
  constructor(
    private greetingsRepository: GreetingsRepository,
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
