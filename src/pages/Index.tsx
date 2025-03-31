
import React, { useState, useEffect } from 'react';
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
  ArrowUpRight,
  FileText,
  Circle,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  RefreshCw,
  Download,
  Home,
  History,
  Upload,
  Code,
  ClipboardList
} from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import BasicInfoForm from '@/components/BasicInfoForm';
import FilesCredentialsForm from '@/components/FilesCredentialsForm';
import ImagesForm from '@/components/ImagesForm';
import ReleaseConfigForm from '@/components/ReleaseConfigForm';
import TabNavigation, { Tab } from '@/components/TabNavigation';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import FileSelector from '@/components/FileSelector';
import FormField from '@/components/FormField';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';

const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [darkMode, setDarkMode] = useState(true);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [activeTab, setActiveTab] = useState('basic-info');
  
  const [aabActiveTab, setAabActiveTab] = useState('basic');
  const [apkFile, setApkFile] = useState<File | null>(null);
  const [keyStoreFile, setKeyStoreFile] = useState<File | null>(null);
  const [appName, setAppName] = useState('');
  const [packageName, setPackageName] = useState('');
  const [versionName, setVersionName] = useState('');
  const [versionCode, setVersionCode] = useState('');
  const [keyAlias, setKeyAlias] = useState('');
  const [keyPassword, setKeyPassword] = useState('');
  const [storePassword, setStorePassword] = useState('');
  const [minSdk, setMinSdk] = useState('21');
  const [targetSdk, setTargetSdk] = useState('33');
  const [buildToolsVersion, setBuildToolsVersion] = useState('33.0.0');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentBuildId, setCurrentBuildId] = useState<string | null>(null);
  
  const [reviewPackageName, setReviewPackageName] = useState('com.exemplo.app');
  const [reviewTrack, setReviewTrack] = useState('production');
  const [statusAtual, setStatusAtual] = useState('Aguardando...');
  const [refreshing, setRefreshing] = useState(false);
  const [monitoring, setMonitoring] = useState(false);
  const [appData, setAppData] = useState({
    trackInfo: 'production',
    version: '2.1.0',
    versionName: 'Release 2.1.0',
    lastUpdate: '22/05/2023 15:32'
  });
  
  const tabs: Tab[] = [
    { id: 'basic-info', label: 'Informações Básicas' },
    { id: 'files-credentials', label: 'Arquivos e Credenciais' },
    { id: 'images', label: 'Imagens e Assets' },
    { id: 'release-config', label: 'Configurações de Release' },
  ];
  
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

  const handleApkSelect = (file: File) => {
    setApkFile(file);
  };

  const handleKeyStoreSelect = (file: File) => {
    setKeyStoreFile(file);
  };

  const handleGenerateAAB = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!apkFile || !keyStoreFile) {
      toast({
        title: "Arquivos Obrigatórios",
        description: "Por favor, selecione o APK e o KeyStore.",
        variant: "destructive"
      });
      return;
    }
    
    if (!appName || !packageName || !versionName || !versionCode || !keyAlias) {
      toast({
        title: "Campos Obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      setTimeout(() => {
        setCurrentBuildId("build-" + Math.floor(Math.random() * 1000000));
        setAabActiveTab('logs');
        
        toast({
          title: "Processo Iniciado",
          description: "A geração do AAB foi iniciada com sucesso.",
        });
        
        setIsSubmitting(false);
      }, 1500);
      
    } catch (error) {
      toast({
        title: "Erro",
        description: error instanceof Error ? error.message : "Erro desconhecido",
        variant: "destructive"
      });
      setIsSubmitting(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'PENDING':
        return (
          <div className="flex items-center text-yellow-500">
            <Clock className="w-4 h-4 mr-1" />
            <span>Pendente</span>
          </div>
        );
      case 'PROCESSING':
        return (
          <div className="flex items-center text-blue-500">
            <Circle className="w-4 h-4 mr-1 animate-pulse" />
            <span>Processando</span>
          </div>
        );
      case 'COMPLETED':
        return (
          <div className="flex items-center text-green-500">
            <CheckCircle className="w-4 h-4 mr-1" />
            <span>Concluído</span>
          </div>
        );
      case 'FAILED':
        return (
          <div className="flex items-center text-red-500">
            <XCircle className="w-4 h-4 mr-1" />
            <span>Falhou</span>
          </div>
        );
      default:
        return (
          <div className="flex items-center text-gray-500">
            <Circle className="w-4 h-4 mr-1" />
            <span>Desconhecido</span>
          </div>
        );
    }
  };

  const handleVerifyStatus = () => {
    setRefreshing(true);
    
    setTimeout(() => {
      setRefreshing(false);
      setStatusAtual('Em revisão - Fase 2/4');
      
      toast({
        title: "Status atualizado",
        description: "As informações de revisão foram atualizadas com sucesso.",
      });
    }, 2000);
  };
  
  const handleStartMonitoring = () => {
    setMonitoring(true);
    toast({
      title: "Monitoramento iniciado",
      description: "Você será notificado sobre mudanças no status de revisão.",
    });
  };
  
  const handleStopMonitoring = () => {
    setMonitoring(false);
    toast({
      title: "Monitoramento interrompido",
      description: "O monitoramento automático foi desativado.",
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
        
        {activeSection === 'gerar-aab' && (
          <div className="customtk-card animate-fade-in">
            <div className="px-4 pt-4">
              <Tabs value={aabActiveTab} onValueChange={setAabActiveTab} className="w-full">
                <TabsList className="grid grid-cols-3 mb-4">
                  <TabsTrigger value="basic">Básico</TabsTrigger>
                  <TabsTrigger value="advanced">Avançado</TabsTrigger>
                  <TabsTrigger value="logs">Logs</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            
            <div className="px-6 py-4">
              {aabActiveTab === 'basic' && (
                <form onSubmit={handleGenerateAAB}>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField 
                        label="Nome do App"
                        required
                      >
                        <input
                          type="text"
                          value={appName}
                          onChange={(e) => setAppName(e.target.value)}
                          className="form-field"
                          placeholder="Meu Aplicativo"
                        />
                      </FormField>
                      
                      <FormField 
                        label="Package Name"
                        hint="ex: com.empresa.app"
                        required
                      >
                        <input
                          type="text"
                          value={packageName}
                          onChange={(e) => setPackageName(e.target.value)}
                          className="form-field"
                          placeholder="com.exemplo.app"
                        />
                      </FormField>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField 
                        label="Version Name"
                        hint="ex: 1.0.0"
                        required
                      >
                        <input
                          type="text"
                          value={versionName}
                          onChange={(e) => setVersionName(e.target.value)}
                          className="form-field"
                          placeholder="1.0.0"
                        />
                      </FormField>
                      
                      <FormField 
                        label="Version Code"
                        hint="ex: 1"
                        required
                      >
                        <input
                          type="number"
                          value={versionCode}
                          onChange={(e) => setVersionCode(e.target.value)}
                          className="form-field"
                          placeholder="1"
                        />
                      </FormField>
                    </div>
                    
                    <Separator className="my-4" />
                    
                    <div className="space-y-4">
                      <FileSelector
                        label="APK File"
                        placeholder="Selecione o arquivo APK"
                        onSelect={handleApkSelect}
                        selectedFile={apkFile}
                        accept=".apk"
                        required
                      />
                      
                      <FileSelector
                        label="KeyStore File"
                        placeholder="Selecione o arquivo KeyStore"
                        onSelect={handleKeyStoreSelect}
                        selectedFile={keyStoreFile}
                        accept=".jks,.keystore"
                        required
                      />
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <FormField 
                          label="Key Alias"
                          required
                        >
                          <input
                            type="text"
                            value={keyAlias}
                            onChange={(e) => setKeyAlias(e.target.value)}
                            className="form-field"
                          />
                        </FormField>
                        
                        <FormField 
                          label="Key Password"
                        >
                          <input
                            type="password"
                            value={keyPassword}
                            onChange={(e) => setKeyPassword(e.target.value)}
                            className="form-field"
                          />
                        </FormField>
                        
                        <FormField 
                          label="Store Password"
                        >
                          <input
                            type="password"
                            value={storePassword}
                            onChange={(e) => setStorePassword(e.target.value)}
                            className="form-field"
                          />
                        </FormField>
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <Button 
                        type="submit" 
                        className="bg-[#0D6EFD] hover:bg-[#0D6EFD]/80"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Processando..." : "Gerar AAB"}
                      </Button>
                    </div>
                  </div>
                </form>
              )}
              
              {aabActiveTab === 'advanced' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <FormField 
                      label="Min SDK Version"
                    >
                      <input
                        type="number"
                        value={minSdk}
                        onChange={(e) => setMinSdk(e.target.value)}
                        className="form-field"
                      />
                    </FormField>
                    
                    <FormField 
                      label="Target SDK Version"
                    >
                      <input
                        type="number"
                        value={targetSdk}
                        onChange={(e) => setTargetSdk(e.target.value)}
                        className="form-field"
                      />
                    </FormField>
                    
                    <FormField 
                      label="Build Tools Version"
                    >
                      <input
                        type="text"
                        value={buildToolsVersion}
                        onChange={(e) => setBuildToolsVersion(e.target.value)}
                        className="form-field"
                      />
                    </FormField>
                  </div>
                  
                  <div className="bg-[#333333] rounded-md p-4 border border-customtk-separator">
                    <div className="flex items-start space-x-2">
                      <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-medium">Configurações Avançadas</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Estas configurações afetam diretamente o processo de build. Altere apenas se souber o que está fazendo.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {aabActiveTab === 'logs' && (
                <div className="space-y-4">
                  {currentBuildId ? (
                    <>
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-medium">Status do Build</h3>
                          <div className="text-sm text-muted-foreground mt-1">
                            ID: <span className="font-mono">{currentBuildId}</span>
                          </div>
                        </div>
                        {getStatusBadge("PROCESSING")}
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Progresso</span>
                          <span className="text-sm">45%</span>
                        </div>
                        <Progress value={45} className="h-2" />
                      </div>
                      
                      <div className="bg-[#333333] border border-customtk-separator rounded-md p-4 h-64 overflow-y-auto font-mono text-sm">
                        <div className="py-1">
                          <span className="text-muted-foreground">10:15:30</span>
                          <span className="ml-2">Iniciando processo de build...</span>
                        </div>
                        <div className="py-1">
                          <span className="text-muted-foreground">10:15:32</span>
                          <span className="ml-2">Verificando arquivos...</span>
                        </div>
                        <div className="py-1">
                          <span className="text-muted-foreground">10:15:35</span>
                          <span className="ml-2">Preparando ambiente de build...</span>
                        </div>
                        <div className="py-1">
                          <span className="text-muted-foreground">10:15:40</span>
                          <span className="ml-2">Extraindo APK...</span>
                        </div>
                        <div className="py-1">
                          <span className="text-muted-foreground">10:15:45</span>
                          <span className="ml-2">Processando recursos...</span>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-8">
                      <FileText className="w-12 h-12 text-muted-foreground mb-4" />
                      <h3 className="font-medium text-lg">Nenhum build iniciado</h3>
                      <p className="text-muted-foreground text-center max-w-md mt-2">
                        Configure os parâmetros na aba "Básico" e inicie o processo de geração de AAB para visualizar os logs aqui.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
        
        {activeSection === 'status-revisao' && (
          <div className="customtk-card animate-fade-in">
            <div className="px-6 py-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <FormField 
                    label="Package Name" 
                    required={true}
                    className="mb-4"
                  >
                    <Input 
                      value={reviewPackageName}
                      onChange={(e) => setReviewPackageName(e.target.value)}
                      placeholder="ex: com.exemplo.app"
                      className="bg-[#333333] border-customtk-separator"
                    />
                  </FormField>
                  
                  <FormField 
                    label="Faixa" 
                    required={true}
                  >
                    <Select 
                      value={reviewTrack} 
                      onValueChange={setReviewTrack}
                    >
                      <SelectTrigger className="bg-[#333333] border-customtk-separator">
                        <SelectValue placeholder="Selecione a faixa" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="internal">Internal Testing</SelectItem>
                        <SelectItem value="alpha">Closed Testing (Alpha)</SelectItem>
                        <SelectItem value="beta">Open Testing (Beta)</SelectItem>
                        <SelectItem value="production">Production</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormField>
                  
                  <Button 
                    className="mt-6 w-full md:w-auto bg-[#0D6EFD] hover:bg-[#0D6EFD]/80"
                    onClick={handleVerifyStatus}
                    disabled={refreshing}
                  >
                    {refreshing ? (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                        Verificando...
                      </>
                    ) : (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Verificar Status
                      </>
                    )}
                  </Button>
                </div>
                
                <div className="bg-[#333333] rounded-lg p-6 border border-customtk-separator">
                  <h2 className="text-lg font-semibold text-white mb-4">Informações do Aplicativo</h2>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center border-b border-customtk-separator pb-2">
                      <span className="text-muted-foreground">Status atual:</span>
                      <span className="font-medium text-white">{statusAtual}</span>
                    </div>
                    
                    <div className="flex justify-between items-center border-b border-customtk-separator pb-2">
                      <span className="text-muted-foreground">Track:</span>
                      <span className="font-medium text-white">{appData.trackInfo}</span>
                    </div>
                    
                    <div className="flex justify-between items-center border-b border-customtk-separator pb-2">
                      <span className="text-muted-foreground">Versão:</span>
                      <span className="font-medium text-white">{appData.version}</span>
                    </div>
                    
                    <div className="flex justify-between items-center border-b border-customtk-separator pb-2">
                      <span className="text-muted-foreground">Version Name:</span>
                      <span className="font-medium text-white">{appData.versionName}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Última atualização:</span>
                      <span className="font-medium text-white">{appData.lastUpdate}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-white mb-4 border-b border-customtk-separator pb-2">
                  Histórico de atualizações
                </h2>
                
                <div className="bg-[#333333] rounded-lg p-4 border border-customtk-separator h-64 overflow-y-auto">
                  {[
                    { date: '2023-05-22 15:32', text: 'Aplicativo enviado para revisão', type: 'info' },
                    { date: '2023-05-23 09:45', text: 'Iniciada verificação de políticas', type: 'info' },
                    { date: '2023-05-23 14:20', text: 'Verificação de políticas concluída com sucesso', type: 'success' },
                    { date: '2023-05-23 14:25', text: 'Iniciada verificação de conteúdo', type: 'info' },
                    { date: '2023-05-24 10:15', text: 'Aviso: Certifique-se de que sua política de privacidade está atualizada', type: 'warning' }
                  ].map((item, index) => (
                    <div key={index} className={`p-3 rounded-lg border mb-2 ${
                      item.type === 'success' ? 'bg-green-500/10 border-green-500/30 text-green-400' : 
                      item.type === 'warning' ? 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400' : 
                      'bg-[#424242] border-customtk-separator text-muted-foreground'
                    }`}>
                      <div className="flex justify-between items-start">
                        <div className="flex items-start">
                          {item.type === 'success' && <CheckCircle size={16} className="mt-0.5 mr-2" />}
                          {item.type === 'warning' && <AlertTriangle size={16} className="mt-0.5 mr-2" />}
                          {item.type === 'info' && <Clock size={16} className="mt-0.5 mr-2" />}
                          <p className="text-sm">{item.text}</p>
                        </div>
                        <span className="text-xs opacity-80">{item.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                {!monitoring ? (
                  <Button 
                    className="bg-[#0D6EFD] hover:bg-[#0D6EFD]/80 gap-2"
                    onClick={handleStartMonitoring}
                  >
                    <PlayCircle size={18} />
                    Iniciar Monitoramento
                  </Button>
                ) : (
                  <Button 
                    className="bg-[#F44336] hover:bg-[#F44336]/80 gap-2"
                    onClick={handleStopMonitoring}
                  >
                    <span className="h-4 w-4 bg-white rounded"></span>
                    Parar Monitoramento
                  </Button>
                )}
                
                <Button 
                  variant="outline" 
                  className="gap-2"
                  onClick={handleVerifyStatus}
                  disabled={refreshing}
                >
                  <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
                  Atualizar Agora
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
