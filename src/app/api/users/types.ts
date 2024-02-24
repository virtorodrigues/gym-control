export interface ICreateUser {
  password: string;
  repeatPassword: string;
  name: string;
  cel: string;
  email: string;
  role: string;
  isVerifyExistsPassword: boolean;
  company?: ICreateCompany;
  student?: ICreateStudent;
}

export interface ICreateCompany {
  name: string;
  cel: string;
  document: string;
  email: string;
}

export interface ICreateStudent {
  name: string;
  cel: string;
  document: string;
  email: string;
  birthday: string;
  companyEmail: string;
}
