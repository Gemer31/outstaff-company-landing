"use client";

import { convertToClass } from "@/utils/convert-to-class.util";
import { UseFormRegister } from "react-hook-form";
import { FormFieldWrapper } from "./FormFieldWrapper";

interface ISelectFormFieldProps {
  options: string[],
  required?: boolean;
  label: string;
  name: string;
  error: string;
  onBlur?: () => void;
  register: unknown;
}

const hostClass: string = convertToClass([
  "relative",
  "bg-custom-black-2",
  "border-custom-black-2",
  "border-2",
  "rounded-md",
  "mt-1",
  "w-full",
  "px-2.5",
  "py-1",
]);

export function SelectFormField({
  label,
  name,
  register,
  error,
  required,
  options,
  onBlur,
}: ISelectFormFieldProps) {
  return (
    <FormFieldWrapper label={label} error={error} required={required}>
      <select
        className={hostClass}
        onBlur={onBlur}
        name="select"
        {...(register as UseFormRegister<Record<string, unknown>>)(name)}
      >
        {
          options.map((item, index) => {
            return <option key={index} value={item}>{item}</option>
          })
        }
      </select>
    </FormFieldWrapper>
  );
}
