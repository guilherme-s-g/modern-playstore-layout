
import React, { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import Sidebar from '@/components/Sidebar';
import DashboardSection from '@/components/DashboardSection';
import HistorySection from '@/components/HistorySection';
import SettingsSection from '@/components/SettingsSection';
import GerarAABSection from '@/components/GerarAABSection';
import StatusRevisaoSection from '@/components/StatusRevisaoSection';
import AppUpdateSection from '@/components/AppUpdateSection';

const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [darkMode, setDarkMode] = useState(true);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [activeTab, setActiveTab] = useState('basic-info');
  
  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    
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
              : activeSection === 'gerar-aab' ? 'Geração de AAB'
              : activeSection === 'status-revisao' ? 'Status de Revisão'
              : activeSection === 'settings' ? 'Configurações' 
              : 'Dashboard'}
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            {activeSection === 'new-app' || ['basic-info', 'files-credentials', 'images', 'release-config'].includes(activeSection)
              ? 'Preencha os detalhes para atualizar seu aplicativo na Google Play Store' 
              : activeSection === 'history' ? 'Visualize e gerencie suas publicações anteriores'
              : activeSection === 'gerar-aab' ? 'Configure e gere arquivos Android App Bundle (AAB) para publicação na Google Play Store'
              : activeSection === 'status-revisao' ? 'Acompanhe o progresso da revisão do seu aplicativo na Google Play'
              : activeSection === 'settings' ? 'Configure as opções do sistema' 
              : 'Visão geral dos seus aplicativos'}
          </p>
        </header>
        
        {(activeSection === 'new-app' || ['basic-info', 'files-credentials', 'images', 'release-config'].includes(activeSection)) && (
          <AppUpdateSection 
            activeTab={activeTab}
            onTabChange={(tabId) => {
              setActiveTab(tabId);
              setActiveSection(tabId);
            }}
          />
        )}
        
        {activeSection === 'dashboard' && (
          <DashboardSection onSectionChange={handleSectionChange} />
        )}
        
        {activeSection === 'history' && (
          <HistorySection />
        )}
        
        {activeSection === 'settings' && (
          <SettingsSection 
            darkMode={darkMode}
            setDarkMode={setDarkMode}
          />
        )}
        
        {activeSection === 'gerar-aab' && (
          <GerarAABSection />
        )}
        
        {activeSection === 'status-revisao' && (
          <StatusRevisaoSection />
        )}
      </div>
    </div>
  );
};

export default Index;
