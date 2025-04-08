export interface Employee {
  id?: number;
  name: string;
  role: string;
  email: string;
  phone: string;
  startDate: Date;
  endDate?: Date;
  status: 'active' | 'inactive';
  department?: string;
  salary?: number;
}
