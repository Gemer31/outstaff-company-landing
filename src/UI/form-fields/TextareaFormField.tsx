"use client";

import { convertToClass } from "@/utils/convert-to-class.util";
import { UseFormRegister } from "react-hook-form";
import { FormFieldWrapper } from "./FormFieldWrapper";

interface ITextareaFormFieldProps {
  required?: boolean;
  rows?: number;
  placeholder: string;
  error: string;
  label: string;
  name: string;
  register: unknown;
}

const textareaClass: string = convertToClass([
  'bg-custom-black-2',
  "border-custom-black-2",
  "border-2",
  "rounded-md",
  "mt-1",
  "w-full",
  "px-2.5",
  "py-1",
  "resize-none",
]);

export function TextareaFormField({
  label,
  name,
  register,
  required,
  error,
  placeholder,
  rows,
}: ITextareaFormFieldProps) {
  return (
    <FormFieldWrapper label={label} error={error} required={required}>
      <textarea
        rows={rows || 5}
        placeholder={placeholder}
        className={textareaClass}
        {...(register as UseFormRegister<Record<string, unknown>>)(name)}
      />
    </FormFieldWrapper>
  );
}
