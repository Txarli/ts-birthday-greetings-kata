import { EmployeesRepository } from '../domain/EmployeesRepository';
import { GreetingDelivery } from '../domain/GreetingDelivery';
import { OurDate } from '../domain/model/OurDate';

export class BirthdayService {
  constructor(
    private greetingDelivery: GreetingDelivery,
    private employeesRepository: EmployeesRepository
  ) {}

  sendGreetings(ourDate: OurDate) {
    const employees = this.employeesRepository.getEmployeesByBirthDate(ourDate);

    employees.forEach(employee => {
      this.greetingDelivery.sendGreetingToEmployee(employee);
    });
  }
}
