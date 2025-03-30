
import React, { ReactNode } from 'react';

interface FormFieldProps {
  label: string;
  hint?: string;
  maxLength?: number;
  currentLength?: number;
  required?: boolean;
  children: ReactNode;
  className?: string;
  error?: string;
}

const FormField = ({ 
  label, 
  hint, 
  maxLength, 
  currentLength = 0, 
  required = false,
  children,
  className = "",
  error
}: FormFieldProps) => {
  return (
    <div className={`mb-5 animate-fade-in ${className}`}>
      <label className="form-field-label mb-2 text-sm font-medium text-foreground/95 flex items-center">
        {label} {required && <span className="text-[#FF5252] ml-1">*</span>}
      </label>
      <div className="relative">
        {children}
      </div>
      
      <div className="flex justify-between mt-1.5">
        <div className="flex-1">
          {hint && <p className="text-xs text-foreground/60">{hint}</p>}
          {error && <p className="text-xs text-[#FF5252]">{error}</p>}
        </div>
        {maxLength && (
          <p className={`text-xs ${currentLength > maxLength ? 'text-[#FF5252]' : 'text-foreground/60'} ml-auto`}>
            {currentLength}/{maxLength}
          </p>
        )}
      </div>
    </div>
  );
};

export default FormField;
