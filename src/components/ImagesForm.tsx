
import React, { useState } from 'react';
import FileSelector from './FileSelector';
import { Plus, X, Image as ImageIcon } from 'lucide-react';

const ImagesForm = () => {
  const [appIcon, setAppIcon] = useState<File | null>(null);
  const [featureGraphic, setFeatureGraphic] = useState<File | null>(null);
  const [screenshots, setScreenshots] = useState<File[]>([]);
  
  const handleIconSelect = (file: File) => {
    setAppIcon(file);
  };
  
  const handleFeatureGraphicSelect = (file: File) => {
    setFeatureGraphic(file);
  };
  
  const handleScreenshotSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newScreenshots = Array.from(files);
      setScreenshots(prev => [...prev, ...newScreenshots].slice(0, 8));
    }
  };
  
  const removeScreenshot = (index: number) => {
    setScreenshots(prev => prev.filter((_, i) => i !== index));
  };
  
  return (
    <div className="animate-fade-in">
      <h2 className="text-lg font-medium mb-6">Imagens do Aplicativo</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <FileSelector
          label="Ícone do App (512x512 PNG)"
          placeholder="Selecione o ícone do app"
          onSelect={handleIconSelect}
          selectedFile={appIcon}
          accept=".png"
          required
        />
        
        <FileSelector
          label="Feature Graphic (1024x500 PNG)"
          placeholder="Selecione o feature graphic"
          onSelect={handleFeatureGraphicSelect}
          selectedFile={featureGraphic}
          accept=".png"
          required
        />
      </div>
      
      <div className="mb-8">
        <h3 className="form-field-label">
          Screenshots (2-8 imagens, JPEG/PNG) <span className="text-destructive">*</span>
        </h3>
        <p className="form-field-hint mb-3">Proporção 16:9 (1920x1080) ou 9:16 (1080x1920)</p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          {screenshots.map((screenshot, index) => (
            <div key={index} className="relative group">
              <div className="aspect-[9/16] bg-playstore-field rounded-md overflow-hidden flex items-center justify-center border border-border">
                <img
                  src={URL.createObjectURL(screenshot)}
                  alt={`Screenshot ${index + 1}`}
                  className="h-full w-full object-cover"
                />
              </div>
              <button
                type="button"
                onClick={() => removeScreenshot(index)}
                className="absolute -top-2 -right-2 bg-destructive text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
          
          {screenshots.length < 8 && (
            <label className="aspect-[9/16] bg-playstore-field rounded-md border border-dashed border-border flex flex-col items-center justify-center cursor-pointer hover:bg-playstore-field/80 transition-colors">
              <Plus className="w-8 h-8 mb-2 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Adicionar</span>
              <input
                type="file"
                accept=".jpg,.jpeg,.png"
                multiple
                onChange={handleScreenshotSelect}
                className="hidden"
              />
            </label>
          )}
        </div>
        
        <p className="text-sm text-muted-foreground">
          {screenshots.length > 0 ? `${screenshots.length} de 8 screenshots selecionados` : "Nenhum screenshot selecionado"}
        </p>
      </div>
      
      <div className="bg-muted/30 rounded-md p-4">
        <div className="flex items-center">
          <ImageIcon className="w-5 h-5 mr-2 text-muted-foreground" />
          <h3 className="text-sm font-medium">Dicas para imagens de qualidade</h3>
        </div>
        <ul className="mt-2 text-sm text-muted-foreground list-disc pl-5 space-y-1">
          <li>Use imagens de alta resolução que mostrem claramente os recursos do app</li>
          <li>Evite texto excessivo nas capturas de tela</li>
          <li>Mantenha uma identidade visual consistente em todas as imagens</li>
          <li>Destaque os principais recursos do seu aplicativo</li>
        </ul>
      </div>
    </div>
  );
};

export default ImagesForm;
