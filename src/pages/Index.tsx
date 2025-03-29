
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
  const [activeSection, setActiveSection] = useState('new-app');
  const [activeTab, setActiveTab] = useState('basic-info');
  
  const tabs: Tab[] = [
    { id: 'basic-info', label: 'Informações Básicas' },
    { id: 'files-credentials', label: 'Arquivos e Credenciais' },
    { id: 'images', label: 'Imagens' },
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
    <div className="flex h-screen overflow-hidden bg-playstore-dark">
      <Sidebar 
        activeSection={activeSection === 'new-app' ? activeTab : activeSection}
        onSectionChange={handleSectionChange}
        darkMode={darkMode}
        onToggleDarkMode={handleToggleDarkMode}
      />
      
      <div className="flex-1 overflow-auto p-4">
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-foreground">
            {activeSection === 'new-app' ? 'Novo Aplicativo' : 
             activeSection === 'history' ? 'Histórico de Publicações' :
             activeSection === 'settings' ? 'Configurações' : 
             activeSection === 'dashboard' ? 'Dashboard' : 'Atualização de Aplicativo'}
          </h1>
          <p className="text-muted-foreground text-sm">
            {activeSection === 'new-app' ? 'Preencha os detalhes para publicar seu aplicativo na Google Play Store' : 
             activeSection === 'history' ? 'Visualize e gerencie suas publicações anteriores' :
             activeSection === 'settings' ? 'Configure as opções do sistema' : 
             activeSection === 'dashboard' ? 'Visão geral dos seus aplicativos' : ''}
          </p>
        </header>
        
        {activeSection === 'new-app' && (
          <div className="bg-playstore-darker rounded-lg shadow-sm border border-playstore-separator">
            <div className="px-4 pt-4">
              <TabNavigation 
                tabs={tabs} 
                activeTab={activeTab} 
                onTabChange={(tabId) => {
                  setActiveTab(tabId);
                  setActiveSection('new-app');
                }} 
              />
            </div>
            
            <div className="px-6 py-6">
              {renderActiveForm()}
            </div>
          </div>
        )}
        
        {activeSection === 'dashboard' && (
          <div className="bg-playstore-darker rounded-lg shadow-sm border border-playstore-separator p-6">
            <div className="flex flex-col items-center justify-center py-20">
              <h2 className="text-xl font-semibold mb-4">Bem-vindo à Automação Play Store</h2>
              <p className="text-muted-foreground text-center max-w-md mb-8">
                Selecione uma opção no menu lateral para começar a gerenciar seus aplicativos na Google Play Store.
              </p>
              <div className="grid grid-cols-2 gap-4 w-full max-w-lg">
                <button 
                  className="bg-playstore-blue text-white p-4 rounded-lg shadow-sm hover:bg-playstore-blue/80 transition-colors"
                  onClick={() => handleSectionChange('new-app')}
                >
                  Novo Aplicativo
                </button>
                <button 
                  className="bg-playstore-blue text-white p-4 rounded-lg shadow-sm hover:bg-playstore-blue/80 transition-colors"
                  onClick={() => handleSectionChange('history')}
                >
                  Histórico
                </button>
              </div>
            </div>
          </div>
        )}
        
        {activeSection === 'history' && (
          <div className="bg-playstore-darker rounded-lg shadow-sm border border-playstore-separator p-6">
            <p className="text-center text-muted-foreground py-10">
              Esta é a tela de Histórico. Aqui será exibido o histórico de publicações de seus aplicativos.
            </p>
          </div>
        )}
        
        {activeSection === 'settings' && (
          <div className="bg-playstore-darker rounded-lg shadow-sm border border-playstore-separator p-6">
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
