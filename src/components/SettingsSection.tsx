
import React from 'react';

interface SettingsSectionProps {
  darkMode: boolean;
  setDarkMode: (mode: boolean) => void;
}

const SettingsSection = ({ darkMode, setDarkMode }: SettingsSectionProps) => {
  return (
    <div className="customtk-card p-6 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h2 className="text-lg font-semibold border-b border-customtk-separator pb-2">Configurações da Conta</h2>
          <div>
            <label className="block text-sm font-medium mb-1">Credenciais da Google Play Console</label>
            <button className="customtk-button-secondary w-full justify-start text-left">
              Configurar credenciais
            </button>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Diretório de trabalho padrão</label>
            <button className="customtk-button-secondary w-full justify-start text-left">
              Selecionar diretório
            </button>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Tema da interface</label>
            <div className="flex items-center space-x-2">
              <button 
                className={`${darkMode ? "customtk-button" : "customtk-button-secondary"}`} 
                onClick={() => setDarkMode(true)}
              >
                Escuro
              </button>
              <button 
                className={`${!darkMode ? "customtk-button" : "customtk-button-secondary"}`} 
                onClick={() => setDarkMode(false)}
              >
                Claro
              </button>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <h2 className="text-lg font-semibold border-b border-customtk-separator pb-2">Configurações Avançadas</h2>
          <div>
            <label className="block text-sm font-medium mb-1">Ferramentas de build</label>
            <button className="customtk-button-secondary w-full justify-start text-left">
              Configurar ferramentas
            </button>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Caminho do SDK Android</label>
            <button className="customtk-button-secondary w-full justify-start text-left">
              Selecionar SDK
            </button>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Logs do sistema</label>
            <button className="customtk-button-secondary w-full justify-start text-left">
              Ver logs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsSection;
