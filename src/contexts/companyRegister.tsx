"use client";
import { ICompanyRegister } from "@/forms/companyRegister/schema";
import { title } from "process";
import { ReactNode, createContext, useContext, useMemo, useState } from "react";

interface ICompanyRegisterContext {
  name: string;
  cel: string;
  document: string;
  email: string;
  logo?: string | undefined;
  repeatPassword: string;
  password: string;
  setCompanyRegisterForm: (data: ICompanyRegister) => void;
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
  const [logo, setLogo] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [repeatPassword, setRepeatPassword] = useState<string>("");

  const setCompanyRegisterForm = (data: ICompanyRegister) => {
    setEmail(data.email);
    setName(data.name);
    setCel(data.cel);
    setDocument(data.document);
    setLogo(data.logo ?? "");
  };

  const setPasswordCompanyRegisterForm = (data: ICompanyRegister) => {
    setPassword(data.email);
    setRepeatPassword(data.name);
  };

  const value = useMemo(
    () => ({
      email,
      name,
      cel,
      document,
      logo,
      password,
      repeatPassword,
      setCompanyRegisterForm,
    }),
    [name, cel, document, logo, email, password, repeatPassword],
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
