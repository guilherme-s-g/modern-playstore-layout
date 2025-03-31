
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FileUp, 
  ArrowRight, 
  UploadCloud, 
  Package, 
  Clipboard, 
  Settings, 
  ArrowUpRight 
} from 'lucide-react';

interface DashboardSectionProps {
  onSectionChange: (section: string) => void;
}

const DashboardSection = ({ onSectionChange }: DashboardSectionProps) => {
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <div className="animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-gradient-to-br from-[#003B7A] to-[#0D6EFD] rounded-xl shadow-lg p-6 border border-[#2A447F] transition-transform hover:scale-[1.02]">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-semibold text-white mb-2">Atualização de Aplicativo</h2>
              <p className="text-white/80 mb-6">Faça o upload de novas versões do seu app para a Google Play Store</p>
              <button 
                className="customtk-button bg-white/90 text-[#0D6EFD] hover:bg-white flex items-center gap-2 font-medium"
                onClick={() => onSectionChange('new-app')}
              >
                <FileUp size={18} />
                Iniciar Atualização
                <ArrowRight size={16} className="ml-1"/>
              </button>
            </div>
            <div className="bg-white/20 p-3 rounded-lg">
              <UploadCloud className="w-10 h-10 text-white" />
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-[#103824] to-[#2E7D32] rounded-xl shadow-lg p-6 border border-[#2A594F] transition-transform hover:scale-[1.02]">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-semibold text-white mb-2">Gerar AAB</h2>
              <p className="text-white/80 mb-6">Crie pacotes Android App Bundle para seu aplicativo</p>
              <button 
                className="customtk-button bg-white/90 text-[#2E7D32] hover:bg-white flex items-center gap-2 font-medium"
                onClick={() => onSectionChange('gerar-aab')}
              >
                <Package size={18} />
                Gerar AAB
                <ArrowRight size={16} className="ml-1"/>
              </button>
            </div>
            <div className="bg-white/20 p-3 rounded-lg">
              <Package className="w-10 h-10 text-white" />
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-[#614A19] to-[#FFA000] rounded-xl shadow-lg p-6 border border-[#735E35] transition-transform hover:scale-[1.02]">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-semibold text-white mb-2">Status da Revisão</h2>
              <p className="text-white/80 mb-6">Acompanhe o progresso da revisão do seu aplicativo</p>
              <button 
                className="customtk-button bg-white/90 text-[#FFA000] hover:bg-white flex items-center gap-2 font-medium"
                onClick={() => onSectionChange('status-revisao')}
              >
                <Clipboard size={18} />
                Ver Status
                <ArrowRight size={16} className="ml-1"/>
              </button>
            </div>
            <div className="bg-white/20 p-3 rounded-lg">
              <Clipboard className="w-10 h-10 text-white" />
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-[#3D284C] to-[#7B1FA2] rounded-xl shadow-lg p-6 border border-[#5A4768] transition-transform hover:scale-[1.02]">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-semibold text-white mb-2">Configurações</h2>
              <p className="text-white/80 mb-6">Personalize as configurações do sistema</p>
              <button 
                className="customtk-button bg-white/90 text-[#7B1FA2] hover:bg-white flex items-center gap-2 font-medium"
                onClick={() => onSectionChange('settings')}
              >
                <Settings size={18} />
                Configurar
                <ArrowRight size={16} className="ml-1"/>
              </button>
            </div>
            <div className="bg-white/20 p-3 rounded-lg">
              <Settings className="w-10 h-10 text-white" />
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 customtk-card p-6">
        <h2 className="text-lg font-medium text-foreground mb-4">Publicações Recentes</h2>
        <div className="space-y-3">
          {[
            { app: 'Meu App', version: '2.1.0', date: '22/05/2023', status: 'Publicado' },
            { app: 'Meu App', version: '2.0.5', date: '15/04/2023', status: 'Publicado' },
            { app: 'App Secundário', version: '1.3.2', date: '02/03/2023', status: 'Publicado' }
          ].map((item, index) => (
            <div key={index} className="flex items-center justify-between bg-[#292936] p-3 rounded-lg">
              <div>
                <p className="text-sm font-medium text-foreground">{item.app} <span className="text-muted-foreground">v{item.version}</span></p>
                <p className="text-xs text-muted-foreground">Publicado em {item.date}</p>
              </div>
              <div className="flex items-center">
                <span className="bg-green-500/20 text-green-400 text-xs px-2 py-0.5 rounded-full">{item.status}</span>
                <button className="customtk-button-secondary ml-2 p-1">
                  <ArrowUpRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
        <button className="customtk-button-secondary mt-4 w-full text-muted-foreground">
          Ver histórico completo
        </button>
      </div>
    </div>
  );
};

export default DashboardSection;
