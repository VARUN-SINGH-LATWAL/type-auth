export interface RegisterBody {
  userName: string;
  email: string;
  password: string;
  role?: string;
}

export interface LoginBody {
  userName: string;
  password: string;
}


export interface User {
  ID: number;
  userName: string;
  email: string;
  password: string;
  role: string;
  currentDate?: string;
}