export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  position: string;
  department: string;
  joinDate: Date;
  phoneNumber?: string;
  status: 'active' | 'inactive';
} 