import * as Form from '@radix-ui/react-form';

interface IField {
  placeholder?: string;
  label: string;
  type: string;
  className?: string;
  name: string;
}

export const Field = ({ placeholder = "", label, type, name, className = "" }: IField) => {

  return (
    <Form.Field className="flex flex-col space-y-1" name={name}>
      <div className="flex items-baseline justify-between">
        <Form.Label className="text-gray-400 text-sm">{label}</Form.Label>
      </div>
      <Form.Control asChild>
        <input
          className={`py-2 px-3 text-slate-950 rounded-md border border-gray-200 ${className}`}
          type={type}
          placeholder={placeholder}
          required
        />
      </Form.Control>
    </Form.Field>
  )
};