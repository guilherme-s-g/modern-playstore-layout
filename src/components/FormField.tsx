
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
    <div className="mb-4">
      <label className="form-field-label">
        {label} {required && <span className="text-destructive">*</span>}
      </label>
      {children}
      
      <div className="flex justify-between">
        {hint && <p className="form-field-hint">{hint}</p>}
        {maxLength && (
          <p className="form-field-counter">
            {currentLength}/{maxLength}
          </p>
        )}
      </div>
    </div>
  );
};

export default FormField;
