export interface ICreateUser {
  password: string;
  repeatPassword: string;
  name: string;
  cel: string;
  document: string;
  email: string;
  role: string;
}

export interface ICreateCompany {
  name: string;
  cel: string;
  document: string;
  email: string;
}
