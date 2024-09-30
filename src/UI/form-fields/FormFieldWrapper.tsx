export interface IFormFieldWrapperProps {
  required?: boolean;
  label: string;
  error?: string;
  children: React.ReactDOM,
  className?: string
}

export function FormFieldWrapper({
  required,
  label,
  children,
  error,
}: IFormFieldWrapperProps) {
  return (
    <label className="w-full pb-1 block">
      <span className={`mr-2 ${required ? 'field-label' : ''}`}>{label}</span>
      {children}
      <div className={'text-red-500 text-xs ' + (error ? "" : 'invisible')}>{error || "_"}</div>
    </label>
  );
}