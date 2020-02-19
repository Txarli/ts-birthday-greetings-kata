import { GreetingsRepository } from './domain/GreetingsRepository';
import { FileEmployeesRepository } from './infrastructure/FileEmployeesRepository';
import { OurDate } from './OurDate';

export class BirthdayService {
  constructor(
    private greetingsRepository: GreetingsRepository,
    private employeesRepository: FileEmployeesRepository
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
