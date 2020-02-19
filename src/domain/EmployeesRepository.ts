import { Employee } from 'src/Employee';

export interface EmployeesRepository {
  getEmployees: () => Employee[];
}
