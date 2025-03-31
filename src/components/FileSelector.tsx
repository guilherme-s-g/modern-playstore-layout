
import React from 'react';
import { Upload } from 'lucide-react';

interface FileSelectorProps {
  label: string;
  placeholder?: string;
  onSelect: (file: File) => void;
  selectedFile?: File | null;
  accept?: string;
  required?: boolean;
}

const FileSelector = ({ 
  label, 
  placeholder = "Nenhum arquivo selecionado", 
  onSelect,
  selectedFile,
  accept,
  required = false
}: FileSelectorProps) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  
  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onSelect(files[0]);
    }
  };
  
  return (
    <div className="mb-4">
      <label className="form-field-label">
        {label} {required && <span className="text-destructive">*</span>}
      </label>
      <div className="flex items-center gap-2">
        <input
          type="text"
          className="customtk-input flex-1"
          placeholder={placeholder}
          value={selectedFile ? selectedFile.name : ''}
          readOnly
        />
        <button
          type="button"
          onClick={handleClick}
          className="customtk-button"
        >
          <Upload className="w-4 h-4 mr-2 inline-block" />
          Selecionar
        </button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept={accept}
        />
      </div>
    </div>
  );
};

export default FileSelector;
