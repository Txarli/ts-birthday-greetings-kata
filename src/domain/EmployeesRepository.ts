import { Employee } from './model/Employee';

export interface EmployeesRepository {
  getEmployees: () => Employee[];
}
