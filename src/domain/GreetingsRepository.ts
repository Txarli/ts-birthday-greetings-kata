import { Employee } from './model/Employee';

export interface GreetingsRepository {
  sendGreetingToEmployee: (employee: Employee) => void;
}
