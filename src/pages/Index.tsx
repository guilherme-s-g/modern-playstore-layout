
import React, { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { 
  Package,
  FileUp,
  Clipboard,
  Settings,
  UploadCloud,
  PlayCircle,
  ArrowRight,
  ArrowUpRight
} from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import BasicInfoForm from '@/components/BasicInfoForm';
import FilesCredentialsForm from '@/components/FilesCredentialsForm';
import ImagesForm from '@/components/ImagesForm';
import ReleaseConfigForm from '@/components/ReleaseConfigForm';
import TabNavigation, { Tab } from '@/components/TabNavigation';
import { Button } from '@/components/ui/button';

const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [darkMode, setDarkMode] = useState(true);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [activeTab, setActiveTab] = useState('basic-info');
  
  const tabs: Tab[] = [
    { id: 'basic-info', label: 'Informações Básicas' },
    { id: 'files-credentials', label: 'Arquivos e Credenciais' },
    { id: 'images', label: 'Imagens e Assets' },
    { id: 'release-config', label: 'Configurações de Release' },
  ];
  
  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    
    // Se estiver mudando para uma seção que é uma aba do formulário, atualizar a aba ativa
    if (['basic-info', 'files-credentials', 'images', 'release-config'].includes(section)) {
      setActiveTab(section);
    }
    
    toast({
      title: "Seção alterada",
      description: `Você está agora na seção: ${section}`,
    });
  };

  const handleNavigate = (path: string) => {
    navigate(path);
    toast({
      title: "Navegando",
      description: `Você está navegando para: ${path}`,
    });
  };
  
  const renderActiveForm = () => {
    switch (activeTab) {
      case 'basic-info':
        return <BasicInfoForm />;
      case 'files-credentials':
        return <FilesCredentialsForm />;
      case 'images':
        return <ImagesForm />;
      case 'release-config':
        return <ReleaseConfigForm />;
      default:
        return <BasicInfoForm />;
    }
  };
  
  const handleToggleDarkMode = () => {
    setDarkMode(!darkMode);
    toast({
      title: darkMode ? "Modo claro ativado" : "Modo escuro ativado",
      description: "A aparência da interface foi alterada.",
    });
  };
  
  return (
    <div className="flex h-screen overflow-hidden bg-[#1E1E2E]">
      <Sidebar 
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
        darkMode={darkMode}
        onToggleDarkMode={handleToggleDarkMode}
      />
      
      <div className="flex-1 overflow-auto p-6">
        <header className="mb-6 animate-slide-in">
          <h1 className="text-2xl font-bold text-foreground">
            {activeSection === 'new-app' || ['basic-info', 'files-credentials', 'images', 'release-config'].includes(activeSection) 
              ? 'Atualização de Aplicativo' 
              : activeSection === 'history' ? 'Histórico de Publicações' 
              : activeSection === 'settings' ? 'Configurações' 
              : 'Dashboard'}
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            {activeSection === 'new-app' || ['basic-info', 'files-credentials', 'images', 'release-config'].includes(activeSection)
              ? 'Preencha os detalhes para atualizar seu aplicativo na Google Play Store' 
              : activeSection === 'history' ? 'Visualize e gerencie suas publicações anteriores'
              : activeSection === 'settings' ? 'Configure as opções do sistema' 
              : 'Visão geral dos seus aplicativos'}
          </p>
        </header>
        
        {(activeSection === 'new-app' || ['basic-info', 'files-credentials', 'images', 'release-config'].includes(activeSection)) && (
          <div className="customtk-card animate-fade-in">
            <div className="px-4 pt-4">
              <TabNavigation 
                tabs={tabs} 
                activeTab={activeTab} 
                onTabChange={(tabId) => {
                  setActiveTab(tabId);
                  setActiveSection(tabId);
                }} 
              />
            </div>
            
            <div className="px-6 py-6">
              {renderActiveForm()}
            </div>
          </div>
        )}
        
        {activeSection === 'dashboard' && (
          <div className="animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gradient-to-br from-[#003B7A] to-[#0D6EFD] rounded-xl shadow-lg p-6 border border-[#2A447F] transition-transform hover:scale-[1.02]">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-semibold text-white mb-2">Atualização de Aplicativo</h2>
                    <p className="text-white/80 mb-6">Faça o upload de novas versões do seu app para a Google Play Store</p>
                    <button 
                      className="customtk-button bg-white/90 text-[#0D6EFD] hover:bg-white flex items-center gap-2 font-medium"
                      onClick={() => handleSectionChange('new-app')}
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
                      onClick={() => handleNavigate('/gerar-aab')}
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
                      onClick={() => handleNavigate('/status-revisao')}
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
                      onClick={() => handleSectionChange('settings')}
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
        )}
        
        {activeSection === 'history' && (
          <div className="customtk-card p-6 animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">Histórico de Publicações</h2>
              <div className="flex space-x-2">
                <button className="customtk-button-secondary">Filtrar</button>
                <button className="customtk-button-secondary">Exportar</button>
              </div>
            </div>
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="bg-[#292936] p-4 rounded-lg border border-customtk-separator">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center">
                        <h3 className="font-medium">Meu Aplicativo v{2 + index/10}</h3>
                        <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${
                          index === 0 ? 'bg-green-500/20 text-green-400' : 
                          index === 1 ? 'bg-yellow-500/20 text-yellow-400' : 
                          'bg-blue-500/20 text-blue-400'
                        }`}>
                          {index === 0 ? 'Publicado' : index === 1 ? 'Em Revisão' : 'Concluído'}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Publicado em {new Date(2023, 5 - index, 10 + index).toLocaleDateString('pt-BR')}
                      </p>
                      <div className="mt-3 text-xs text-muted-foreground">
                        <div className="flex items-center gap-x-4">
                          <span>Track: Production</span>
                          <span>Rollout: 100%</span>
                          <span>Instalações: {(10000 - index * 1500).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                    <button className="customtk-button-secondary">Detalhes</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {activeSection === 'settings' && (
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
        )}
      </div>
    </div>
  );
};

export default Index;
