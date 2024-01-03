"use client";
import {
  ICompanyRegister,
  ICompanyRegisterPassword,
} from "@/forms/companyRegister/schema";
import email from "next-auth/providers/email";
import { ReactNode, createContext, useContext, useMemo, useState } from "react";

interface ICompanyRegisterContext {
  name: string;
  cel: string;
  document: string;
  email: string;
  repeatPassword: string;
  password: string;
  setCompanyRegisterForm: (data: ICompanyRegister) => void;
  setPasswordCompanyRegisterForm: (data: ICompanyRegisterPassword) => void;
}

const CompanyRegisterContext = createContext({} as ICompanyRegisterContext);

export const CompanyRegisterProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [cel, setCel] = useState<string>("");
  const [document, setDocument] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [repeatPassword, setRepeatPassword] = useState<string>("");

  const setCompanyRegisterForm = (data: ICompanyRegister) => {
    setEmail(data.email);
    setName(data.name);
    setCel(data.cel);
    setDocument(data.document);
  };

  const setPasswordCompanyRegisterForm = (data: ICompanyRegisterPassword) => {
    setPassword(data.password);
    setRepeatPassword(data.repeatPassword);
  };

  const value = useMemo(
    () => ({
      email,
      name,
      cel,
      document,
      password,
      repeatPassword,
      setCompanyRegisterForm,
      setPasswordCompanyRegisterForm,
    }),
    [name, cel, document, email, password, repeatPassword],
  );

  return (
    <CompanyRegisterContext.Provider value={value}>
      {children}
    </CompanyRegisterContext.Provider>
  );
};

export const useCompanyRegister = () => {
  return useContext(CompanyRegisterContext);
};
