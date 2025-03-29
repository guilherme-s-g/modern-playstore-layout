
import React, { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import Sidebar from '@/components/Sidebar';
import BasicInfoForm from '@/components/BasicInfoForm';
import FilesCredentialsForm from '@/components/FilesCredentialsForm';
import ImagesForm from '@/components/ImagesForm';
import ReleaseConfigForm from '@/components/ReleaseConfigForm';
import TabNavigation, { Tab } from '@/components/TabNavigation';

const Index = () => {
  const { toast } = useToast();
  const [darkMode, setDarkMode] = useState(true);
  const [activeSection, setActiveSection] = useState('basic-info');
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
    <div className="flex h-screen overflow-hidden bg-[#222222]">
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
          <div className="bg-[#2A2A2A] rounded-lg shadow-lg border border-playstore-separator animate-fade-in">
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
          <div className="bg-[#2A2A2A] rounded-lg shadow-lg border border-playstore-separator p-6 animate-fade-in">
            <div className="flex flex-col items-center justify-center py-20">
              <h2 className="text-xl font-semibold mb-4">Bem-vindo à Automação Play Store</h2>
              <p className="text-muted-foreground text-center max-w-md mb-8">
                Selecione uma opção no menu lateral para começar a gerenciar seus aplicativos na Google Play Store.
              </p>
              <div className="grid grid-cols-2 gap-4 w-full max-w-lg">
                <button 
                  className="bg-[#0D6EFD] text-white p-4 rounded-lg shadow-sm hover:bg-[#0D6EFD]/80 transition-colors"
                  onClick={() => handleSectionChange('new-app')}
                >
                  Novo Aplicativo
                </button>
                <button 
                  className="bg-[#0D6EFD] text-white p-4 rounded-lg shadow-sm hover:bg-[#0D6EFD]/80 transition-colors"
                  onClick={() => handleSectionChange('history')}
                >
                  Histórico
                </button>
              </div>
            </div>
          </div>
        )}
        
        {activeSection === 'history' && (
          <div className="bg-[#2A2A2A] rounded-lg shadow-lg border border-playstore-separator p-6 animate-fade-in">
            <p className="text-center text-muted-foreground py-10">
              Esta é a tela de Histórico. Aqui será exibido o histórico de publicações de seus aplicativos.
            </p>
          </div>
        )}
        
        {activeSection === 'settings' && (
          <div className="bg-[#2A2A2A] rounded-lg shadow-lg border border-playstore-separator p-6 animate-fade-in">
            <p className="text-center text-muted-foreground py-10">
              Esta é a tela de Configurações. Aqui você poderá configurar os parâmetros do sistema.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
