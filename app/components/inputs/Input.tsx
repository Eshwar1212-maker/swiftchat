'use-client';
import clsx from "clsx"
import {
    FieldErrors, FieldValues, UseFormRegister
} from 'react-hook-form'


interface InputProps {
    label: string;
    type?: string;
    register: UseFormRegister<FieldValues>;
    id: string
    required?: boolean;
    errors: FieldErrors,
    disabled?: boolean
}


const Input: React.FC<InputProps> = ({
    label,
    id,
    type,
    required,
    register,
    errors,
    disabled
}) => {
  return (
    <div>
        <label
         className="
            block text-sm font-medium text-gray-900 leading-6
        " htmlFor={id}>
            {label}
        </label>
        <div className="mt-2">
            <input 
            id={id}
            type={type}
            disabled={disabled}
            autoComplete={id}
            {...register(id, {required})}
            className={clsx(`
                form-input
                 block w-full sm:text-sm sm:leading-5 border-0 py-1.5 shadow-sm ring-1 
                 ring-inset ring-gray-300 focus:ring-indigo-500 focus:border-indigo-500
                 placeholder:text-gray-400
            `, 
            errors[id] && "focus:ring-rose-500",
            disabled && "opacity-50 cursor-default"
            
            )}
            />
        </div>

    </div>
  )
}

export default Input