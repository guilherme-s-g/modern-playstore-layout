
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import FileSelector from '@/components/FileSelector';
import FormField from '@/components/FormField';
import { useQuery } from '@tanstack/react-query';
import { AlertTriangle, CheckCircle, Circle, Clock, FileText, XCircle } from 'lucide-react';

const API_BASE_URL = 'http://localhost:8000/api';

interface BuildStatus {
  status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED';
  progress: number;
  logs: Array<{ timestamp: string; message: string }>;
  error?: string;
}

const GerarAAB = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('basic');
  
  // Form state
  const [appName, setAppName] = useState('');
  const [packageName, setPackageName] = useState('');
  const [versionName, setVersionName] = useState('');
  const [versionCode, setVersionCode] = useState('');
  const [minSdk, setMinSdk] = useState('21');
  const [targetSdk, setTargetSdk] = useState('33');
  const [buildToolsVersion, setBuildToolsVersion] = useState('33.0.0');
  const [keyAlias, setKeyAlias] = useState('');
  const [keyPassword, setKeyPassword] = useState('');
  const [storePassword, setStorePassword] = useState('');
  const [apkFile, setApkFile] = useState<File | null>(null);
  const [keyStoreFile, setKeyStoreFile] = useState<File | null>(null);
  
  // Build process state
  const [currentBuildId, setCurrentBuildId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch build status if we have a build ID
  const { data: buildStatus, refetch: refetchBuildStatus } = useQuery({
    queryKey: ['buildStatus', currentBuildId],
    queryFn: async () => {
      if (!currentBuildId) return null;
      const response = await fetch(`${API_BASE_URL}/build/${currentBuildId}`);
      if (!response.ok) {
        throw new Error('Erro ao buscar status do build');
      }
      return response.json() as Promise<BuildStatus>;
    },
    enabled: !!currentBuildId,
    refetchInterval: currentBuildId ? 2000 : false,
  });

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
      
      const formData = new FormData();
      formData.append('apkFile', apkFile);
      formData.append('keyStoreFile', keyStoreFile);
      
      // Adicionar configuração como JSON
      const config = {
        appName,
        packageName,
        versionName,
        versionCode: parseInt(versionCode, 10),
        keyAlias,
        keyPassword,
        storePassword,
        minSdk: parseInt(minSdk, 10),
        targetSdk: parseInt(targetSdk, 10),
        buildToolsVersion
      };
      
      formData.append('config', JSON.stringify(config));
      
      const response = await fetch(`${API_BASE_URL}/generate-aab`, {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error('Erro ao iniciar o processo de geração de AAB');
      }
      
      const result = await response.json();
      setCurrentBuildId(result.buildId);
      setActiveTab('logs');
      
      toast({
        title: "Processo Iniciado",
        description: "A geração do AAB foi iniciada com sucesso.",
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: error instanceof Error ? error.message : "Erro desconhecido",
        variant: "destructive"
      });
    } finally {
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

  return (
    <div className="p-6 bg-[#222222] text-foreground min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-2">Geração de AAB</h1>
        <p className="text-muted-foreground mb-6">
          Configure e gere arquivos Android App Bundle (AAB) para publicação na Google Play Store.
        </p>
        
        <div className="bg-[#2A2A2A] border border-playstore-separator rounded-lg shadow-md overflow-hidden">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="px-4 pt-4">
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="basic">Básico</TabsTrigger>
                <TabsTrigger value="advanced">Avançado</TabsTrigger>
                <TabsTrigger value="logs">Logs</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="basic" className="px-6 py-4">
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
            </TabsContent>
            
            <TabsContent value="advanced" className="px-6 py-4">
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
                
                <div className="bg-[#333333] rounded-md p-4 border border-playstore-separator">
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
            </TabsContent>
            
            <TabsContent value="logs" className="px-6 py-4">
              {currentBuildId ? (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">Status do Build</h3>
                      <div className="text-sm text-muted-foreground mt-1">
                        ID: <span className="font-mono">{currentBuildId}</span>
                      </div>
                    </div>
                    {buildStatus && getStatusBadge(buildStatus.status)}
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Progresso</span>
                      <span className="text-sm">{buildStatus?.progress || 0}%</span>
                    </div>
                    <Progress value={buildStatus?.progress || 0} className="h-2" />
                  </div>
                  
                  <div className="bg-[#333333] border border-playstore-separator rounded-md p-4 h-64 overflow-y-auto font-mono text-sm">
                    {buildStatus?.logs?.map((log, index) => (
                      <div key={index} className="py-1">
                        <span className="text-muted-foreground">
                          {new Date(log.timestamp).toLocaleTimeString()}
                        </span>
                        <span className="ml-2">{log.message}</span>
                      </div>
                    ))}
                    
                    {buildStatus?.status === 'FAILED' && (
                      <div className="py-1 text-red-500">
                        <span className="text-muted-foreground">
                          {new Date().toLocaleTimeString()}
                        </span>
                        <span className="ml-2">Erro: {buildStatus.error}</span>
                      </div>
                    )}
                    
                    {!buildStatus?.logs?.length && (
                      <div className="flex items-center justify-center h-full text-muted-foreground">
                        <FileText className="w-5 h-5 mr-2" />
                        Aguardando logs...
                      </div>
                    )}
                  </div>
                  
                  {buildStatus?.status === 'COMPLETED' && (
                    <div className="bg-green-500/20 border border-green-500/30 rounded-md p-4">
                      <div className="flex items-start space-x-2">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <h3 className="font-medium text-green-500">Build Concluído!</h3>
                          <p className="text-sm mt-1">
                            O arquivo AAB foi gerado com sucesso. Você pode baixá-lo agora.
                          </p>
                          <Button className="mt-2 bg-green-600 hover:bg-green-700">
                            Baixar AAB
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8">
                  <FileText className="w-12 h-12 text-muted-foreground mb-4" />
                  <h3 className="font-medium text-lg">Nenhum build iniciado</h3>
                  <p className="text-muted-foreground text-center max-w-md mt-2">
                    Configure os parâmetros na aba "Básico" e inicie o processo de geração de AAB para visualizar os logs aqui.
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default GerarAAB;
