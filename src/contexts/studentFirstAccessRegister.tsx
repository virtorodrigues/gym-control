"use client";
import { IRegisterPassword } from "@/forms/password/schma";
import { IStudentRegister } from "@/forms/studentRegister/schema";
import { ReactNode, createContext, useContext, useMemo, useState } from "react";

interface IStudentFirstAccessContext {
  email: string;
  password: string;
  repeatPassword: string;
  setEmail: (email: string) => void;
  setPasswordStudentForm: (data: IRegisterPassword) => void;
}

const StudentFirstAccessContext = createContext(
  {} as IStudentFirstAccessContext,
);

export const StudentRegisterProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [repeatPassword, setRepeatPassword] = useState<string>("");

  const setPasswordStudentForm = (data: IRegisterPassword) => {
    setPassword(data.password);
    setRepeatPassword(data.repeatPassword);
  };

  const value = useMemo(
    () => ({
      email,
      password,
      repeatPassword,
      setEmail,
      setPasswordStudentForm,
    }),
    [email, password, repeatPassword],
  );

  return (
    <StudentFirstAccessContext.Provider value={value}>
      {children}
    </StudentFirstAccessContext.Provider>
  );
};

export const useStudentFirstAccess = () => {
  return useContext(StudentFirstAccessContext);
};
