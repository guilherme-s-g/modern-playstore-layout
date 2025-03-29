
import React, { ReactNode } from 'react';

interface FormFieldProps {
  label: string;
  hint?: string;
  maxLength?: number;
  currentLength?: number;
  required?: boolean;
  children: ReactNode;
}

const FormField = ({ 
  label, 
  hint, 
  maxLength, 
  currentLength = 0, 
  required = false,
  children 
}: FormFieldProps) => {
  return (
    <div className="mb-5">
      <label className="form-field-label mb-2 text-sm font-medium text-foreground/90">
        {label} {required && <span className="text-destructive">*</span>}
      </label>
      <div className="relative">
        {children}
      </div>
      
      <div className="flex justify-between mt-1">
        {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
        {maxLength && (
          <p className="text-xs text-muted-foreground ml-auto">
            {currentLength}/{maxLength}
          </p>
        )}
      </div>
    </div>
  );
};

export default FormField;
