import * as Form from '@radix-ui/react-form';

interface IField {
  placeholder?: string;
  label: string;
  type: string;
  className?: string;
  name: string;
  required?: boolean;
}

export const Field = ({ placeholder = "", label, type, name, className = "", required = false }: IField) => {

  return (
    <Form.Field className={`flex flex-col space-y-1 ${className}`} name={name}>
      <div className="flex items-baseline justify-between">
        <Form.Label className="text-gray-500 text-sm">
          {label}
          {required && <span className='text-red-600'> *</span>}
        </Form.Label>
      </div>
      <Form.Control asChild>
        <input
          className="py-2 px-3 text-slate-950 rounded-md border border-gray-200 col-span-12 placeholder:text-sm"
          type={type}
          placeholder={placeholder}
          required
        />
      </Form.Control>
    </Form.Field>
  )
};