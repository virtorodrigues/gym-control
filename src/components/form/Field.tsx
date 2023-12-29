import * as Form from "@radix-ui/react-form";
import { InputHTMLAttributes } from "react";
import { useFormContext } from "react-hook-form";

interface IField extends InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  label: string;
  type: string;
  className?: string;
  name: string;
  required?: boolean;
}

export const Field = ({
  placeholder = "",
  label,
  type,
  name,
  className = "",
  required = false,
  ...props
}: IField) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[`${name}`];

  return (
    <Form.Field className={`flex flex-col space-y-1 ${className}`} name={name}>
      <div className="flex items-baseline justify-between">
        <Form.Label className="text-sm text-gray-500">
          {label}
          {required && <span className="text-red-600"> *</span>}
        </Form.Label>
      </div>
      <div className="col-span-12 flex flex-col items-start gap-1 text-left">
        <Form.Control asChild>
          <input
            className={`${
              error ? "border-red-700 focus:border-gray-200" : ""
            } w-full rounded-md border border-gray-200 px-3 py-2 text-slate-950 placeholder:text-sm`}
            type={type}
            placeholder={placeholder}
            {...register(name)}
            {...props}
          />
        </Form.Control>
        <p className="text-sm text-red-700">{error?.message as any}</p>
      </div>
    </Form.Field>
  );
};
