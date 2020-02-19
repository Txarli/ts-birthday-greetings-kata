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

    employees.forEach(employee => {
      if (employee.isBirthday(ourDate)) {
        this.greetingsRepository.sendGreetingToEmployee(employee);
      }
    });
  }
}
