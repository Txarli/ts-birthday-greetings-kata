import { Employee } from './model/Employee';
import { OurDate } from './model/OurDate';

export interface EmployeesRepository {
  getEmployeesByBirthDate: (birthDate: OurDate) => Employee[];
}
