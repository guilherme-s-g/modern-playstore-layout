
import React, { useState } from 'react';
import TabNavigation, { Tab } from '@/components/TabNavigation';
import BasicInfoForm from '@/components/BasicInfoForm';
import FilesCredentialsForm from '@/components/FilesCredentialsForm';
import ImagesForm from '@/components/ImagesForm';
import ReleaseConfigForm from '@/components/ReleaseConfigForm';

interface AppUpdateSectionProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

const AppUpdateSection = ({ activeTab, onTabChange }: AppUpdateSectionProps) => {
  const tabs: Tab[] = [
    { id: 'basic-info', label: 'Informações Básicas' },
    { id: 'files-credentials', label: 'Arquivos e Credenciais' },
    { id: 'images', label: 'Imagens e Assets' },
    { id: 'release-config', label: 'Configurações de Release' },
  ];
  
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
  
  return (
    <div className="customtk-card animate-fade-in">
      <div className="px-4 pt-4">
        <TabNavigation 
          tabs={tabs} 
          activeTab={activeTab} 
          onTabChange={onTabChange} 
        />
      </div>
      
      <div className="px-6 py-6">
        {renderActiveForm()}
      </div>
    </div>
  );
};

export default AppUpdateSection;
