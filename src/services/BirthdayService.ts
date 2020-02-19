import { EmployeesRepository } from '../domain/EmployeesRepository';
import { GreetingDelivery } from '../domain/GreetingDelivery';
import { OurDate } from '../domain/model/OurDate';

export class BirthdayService {
  constructor(
    private greetingsRepository: GreetingDelivery,
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
