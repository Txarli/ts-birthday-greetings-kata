import { Employee } from './model/Employee';

export interface GreetingDelivery {
  sendGreetingToEmployee: (employee: Employee) => void;
}
