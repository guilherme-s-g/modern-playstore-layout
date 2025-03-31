
import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { Card } from '@/components/ui/card';
import TabNavigation, { Tab } from '@/components/TabNavigation';
import { ClipboardList, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

const StatusRevisao = () => {
  const [activeSection, setActiveSection] = useState('status-revisao');
  const [darkMode, setDarkMode] = useState(true);
  const [activeTab, setActiveTab] = useState('em-analise');

  const statusTabs: Tab[] = [
    {
      id: 'em-analise',
      label: 'Em Análise',
      icon: <ClipboardList className="w-4 h-4" />
    },
    {
      id: 'aprovados',
      label: 'Aprovados',
      icon: <CheckCircle className="w-4 h-4" />
    },
    {
      id: 'rejeitados',
      label: 'Rejeitados',
      icon: <XCircle className="w-4 h-4" />
    }
  ];

  // Dados de exemplo para os diferentes status
  const statusData = {
    'em-analise': [
      { appName: 'Meu App Teste', version: '1.2.0', submitDate: '2023-10-15', estimatedTime: '5 dias' },
      { appName: 'App Financeiro', version: '2.0.1', submitDate: '2023-10-14', estimatedTime: '3 dias' }
    ],
    'aprovados': [
      { appName: 'Meu App', version: '1.1.0', approvedDate: '2023-10-01', publishDate: '2023-10-02' },
      { appName: 'App de Fotos', version: '3.4.2', approvedDate: '2023-09-28', publishDate: '2023-09-30' }
    ],
    'rejeitados': [
      { appName: 'App Game', version: '2.2.0', rejectedDate: '2023-10-05', reason: 'Violação de políticas de conteúdo' },
      { appName: 'Social App', version: '1.5.0', rejectedDate: '2023-09-20', reason: 'Problemas de privacidade' }
    ]
  };

  return (
    <div className="flex h-screen bg-customtk-darker">
      <Sidebar 
        activeSection={activeSection} 
        onSectionChange={setActiveSection}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
      />
      
      <div className="flex-1 p-6 overflow-auto">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Status de Revisão de Apps</h1>
          
          <TabNavigation 
            tabs={statusTabs} 
            activeTab={activeTab} 
            onTabChange={setActiveTab}
            variant="pills"
          />
          
          <Card className="customtk-card p-6 animate-fade-in">
            {activeTab === 'em-analise' && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Aplicativos em Análise</h2>
                <div className="space-y-4">
                  {statusData['em-analise'].map((app, index) => (
                    <div key={index} className="bg-customtk-dark p-4 rounded-md border border-customtk-separator">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-medium">{app.appName}</h3>
                          <p className="text-sm text-muted-foreground">Versão: {app.version}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm">Enviado em: {app.submitDate}</p>
                          <p className="text-sm text-yellow-400">Tempo estimado: {app.estimatedTime}</p>
                        </div>
                      </div>
                      <div className="mt-2 flex items-center">
                        <AlertCircle className="text-yellow-400 w-4 h-4 mr-2" />
                        <span className="text-sm">Em análise pela equipe Google Play</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {activeTab === 'aprovados' && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Aplicativos Aprovados</h2>
                <div className="space-y-4">
                  {statusData['aprovados'].map((app, index) => (
                    <div key={index} className="bg-customtk-dark p-4 rounded-md border border-customtk-separator">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-medium">{app.appName}</h3>
                          <p className="text-sm text-muted-foreground">Versão: {app.version}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm">Aprovado em: {app.approvedDate}</p>
                          <p className="text-sm">Publicado em: {app.publishDate}</p>
                        </div>
                      </div>
                      <div className="mt-2 flex items-center">
                        <CheckCircle className="text-green-400 w-4 h-4 mr-2" />
                        <span className="text-sm">Aprovado e publicado na Play Store</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {activeTab === 'rejeitados' && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Aplicativos Rejeitados</h2>
                <div className="space-y-4">
                  {statusData['rejeitados'].map((app, index) => (
                    <div key={index} className="bg-customtk-dark p-4 rounded-md border border-customtk-separator">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-medium">{app.appName}</h3>
                          <p className="text-sm text-muted-foreground">Versão: {app.version}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm">Rejeitado em: {app.rejectedDate}</p>
                        </div>
                      </div>
                      <div className="mt-2">
                        <div className="flex items-center">
                          <XCircle className="text-red-400 w-4 h-4 mr-2" />
                          <span className="text-sm">Rejeitado</span>
                        </div>
                        <p className="mt-1 text-sm text-red-400">Motivo: {app.reason}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StatusRevisao;
