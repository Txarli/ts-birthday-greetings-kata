import { Employee } from 'src/Employee';

export interface GreetingsRepository {
  sendGreetingToEmployee: (employee: Employee) => void;
}
