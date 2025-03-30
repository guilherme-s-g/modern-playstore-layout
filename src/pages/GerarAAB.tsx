
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Package, 
  ArrowLeft, 
  FolderOpen, 
  Key, 
  Lock, 
  Check, 
  X,
  FileText,
  Loader2,
  Sliders,
  Code,
  Terminal,
  AlertTriangle,
  GitBranch
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import FormField from '@/components/FormField';
import { useToast } from '@/hooks/use-toast';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';

const GerarAAB = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [useDefaultKeystore, setUseDefaultKeystore] = useState(false);
  const [activeTab, setActiveTab] = useState('basic');
  const [buildProgress, setBuildProgress] = useState(0);
  const [buildLogs, setBuildLogs] = useState<string[]>([]);
  
  const [formState, setFormState] = useState({
    // Basic options
    project: '',
    keystore: '',
    keystorePassword: '',
    keyAlias: '',
    keyPassword: '',
    outputDirectory: 'Diretório padrão do projeto',
    
    // Advanced options
    minifyEnabled: true,
    shrinkResources: true,
    debuggable: false,
    proguardEnabled: true,
    bundleType: 'release',
    flavor: '',
    splitByDensity: true,
    splitByAbi: true,
    enableR8: true
  });

  const handleChange = (field: string, value: string | boolean) => {
    setFormState({
      ...formState,
      [field]: value
    });
  };

  const handleSelectProject = () => {
    // Simular seleção de projeto
    toast({
      title: "Projeto selecionado",
      description: "MeuApp-Android foi selecionado.",
    });
    handleChange('project', 'MeuApp-Android');
  };

  const handleSelectKeystore = () => {
    // Simular seleção de keystore
    toast({
      title: "Keystore selecionada",
      description: "release-key.keystore foi selecionada.",
    });
    handleChange('keystore', 'release-key.keystore');
  };

  const handleSelectOutputDir = () => {
    // Simular seleção de diretório
    toast({
      title: "Diretório selecionado",
      description: "C:/Projetos/MeuApp/release foi selecionado.",
    });
    handleChange('outputDirectory', 'C:/Projetos/MeuApp/release');
  };

  const handleGenerateAAB = () => {
    if (!formState.project) {
      toast({
        title: "Erro",
        description: "Selecione um projeto Android primeiro.",
        variant: "destructive",
      });
      return;
    }

    if (!useDefaultKeystore && !formState.keystore) {
      toast({
        title: "Erro",
        description: "Selecione uma keystore ou use a keystore padrão.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    setBuildProgress(0);
    setBuildLogs(["Iniciando processo de build..."]);
    
    // Simular processo de build com progresso
    const interval = setInterval(() => {
      setBuildProgress(prev => {
        const newProgress = prev + Math.floor(Math.random() * 10);
        
        // Adicionar logs simulados
        if (newProgress >= 20 && newProgress < 25) {
          setBuildLogs(prev => [...prev, "Verificando configurações do projeto..."]);
        } else if (newProgress >= 40 && newProgress < 45) {
          setBuildLogs(prev => [...prev, "Compilando recursos e código-fonte..."]);
        } else if (newProgress >= 60 && newProgress < 65) {
          setBuildLogs(prev => [...prev, "Aplicando ProGuard e minificação..."]);
        } else if (newProgress >= 80 && newProgress < 85) {
          setBuildLogs(prev => [...prev, "Gerando arquivo AAB..."]);
        } else if (newProgress >= 95) {
          setBuildLogs(prev => [...prev, `AAB gerado com sucesso em ${formState.outputDirectory}`]);
          clearInterval(interval);
          setIsGenerating(false);
          toast({
            title: "AAB Gerado com Sucesso",
            description: `O arquivo AAB foi gerado em ${formState.outputDirectory}`,
            variant: "default",
          });
        }
        
        return newProgress >= 100 ? 100 : newProgress;
      });
    }, 300);
  };

  return (
    <div className="min-h-screen bg-[#222222] p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => navigate('/')}
              className="mr-2"
            >
              <ArrowLeft />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-white flex items-center">
                <Package className="mr-2" /> Gerar AAB
              </h1>
              <p className="text-muted-foreground text-sm">
                Crie um arquivo Android App Bundle para publicação
              </p>
            </div>
          </div>
        </div>

        <div className="bg-[#2A2A2A] rounded-lg shadow-lg border border-playstore-separator p-6 animate-fade-in">
          <Tabs 
            value={activeTab} 
            onValueChange={setActiveTab}
            className="space-y-6"
          >
            <TabsList className="grid grid-cols-3 gap-2 bg-[#333333] p-1">
              <TabsTrigger value="basic" className="data-[state=active]:bg-playstore-blue data-[state=active]:text-white">
                <FileText className="mr-2" size={16} />
                Básico
              </TabsTrigger>
              <TabsTrigger value="advanced" className="data-[state=active]:bg-playstore-blue data-[state=active]:text-white">
                <Sliders className="mr-2" size={16} />
                Avançado
              </TabsTrigger>
              <TabsTrigger value="logs" className="data-[state=active]:bg-playstore-blue data-[state=active]:text-white">
                <Terminal className="mr-2" size={16} />
                Logs
              </TabsTrigger>
            </TabsList>

            {/* Conteúdo da aba Básico */}
            <TabsContent value="basic" className="space-y-8">
              {/* Seção Projeto Android */}
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-foreground flex items-center border-b border-playstore-separator pb-2">
                  <FileText className="mr-2" size={20} /> Projeto Android
                </h2>
                
                <div className="flex items-center justify-between bg-[#333333] p-4 rounded-lg border border-playstore-separator">
                  <div className="flex-1">
                    <Button 
                      onClick={handleSelectProject}
                      className="bg-[#0D6EFD] hover:bg-[#0D6EFD]/90 text-white"
                    >
                      <FolderOpen className="mr-2" size={16} />
                      Selecionar Projeto
                    </Button>
                    <p className="text-sm text-muted-foreground mt-2">
                      {formState.project ? (
                        <span className="flex items-center">
                          <Check size={16} className="text-green-500 mr-1" /> 
                          {formState.project}
                        </span>
                      ) : 'Nenhum projeto selecionado'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Seção Keystore */}
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-foreground flex items-center border-b border-playstore-separator pb-2">
                  <Key className="mr-2" size={20} /> Configurações da Keystore
                </h2>
                
                <div className="flex items-center space-x-2 mb-4">
                  <Switch
                    checked={useDefaultKeystore}
                    onCheckedChange={setUseDefaultKeystore}
                    className="data-[state=checked]:bg-[#0D6EFD]"
                  />
                  <span className="text-sm">Usar keystore padrão das configurações</span>
                </div>

                <div className={`space-y-5 ${useDefaultKeystore ? 'opacity-50 pointer-events-none' : ''}`}>
                  <div className="flex items-center justify-between bg-[#333333] p-4 rounded-lg border border-playstore-separator">
                    <div className="flex-1">
                      <Button 
                        onClick={handleSelectKeystore}
                        className="bg-[#0D6EFD] hover:bg-[#0D6EFD]/90 text-white"
                        disabled={useDefaultKeystore}
                      >
                        <Key className="mr-2" size={16} />
                        Selecionar Keystore
                      </Button>
                      <p className="text-sm text-muted-foreground mt-2">
                        {formState.keystore ? (
                          <span className="flex items-center">
                            <Check size={16} className="text-green-500 mr-1" /> 
                            {formState.keystore}
                          </span>
                        ) : 'Nenhuma keystore selecionada'}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <FormField 
                      label="Senha da Keystore" 
                      hint="Senha para a keystore selecionada"
                    >
                      <div className="relative">
                        <input 
                          type="password" 
                          className="form-field pr-10" 
                          placeholder="Senha da Keystore"
                          value={formState.keystorePassword}
                          onChange={(e) => handleChange('keystorePassword', e.target.value)}
                        />
                        <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
                      </div>
                    </FormField>

                    <FormField 
                      label="Key Alias" 
                      hint="Alias para a chave na keystore"
                    >
                      <input 
                        type="text" 
                        className="form-field" 
                        placeholder="Key Alias"
                        value={formState.keyAlias}
                        onChange={(e) => handleChange('keyAlias', e.target.value)}
                      />
                    </FormField>

                    <FormField 
                      label="Senha do Alias" 
                      hint="Senha para o alias da chave"
                      className="md:col-span-2"
                    >
                      <div className="relative">
                        <input 
                          type="password" 
                          className="form-field pr-10" 
                          placeholder="Senha do Alias"
                          value={formState.keyPassword}
                          onChange={(e) => handleChange('keyPassword', e.target.value)}
                        />
                        <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
                      </div>
                    </FormField>
                  </div>
                </div>
              </div>

              {/* Seção Diretório de Destino */}
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-foreground flex items-center border-b border-playstore-separator pb-2">
                  <FolderOpen className="mr-2" size={20} /> Diretório de Destino (Opcional)
                </h2>
                
                <div className="flex items-center justify-between bg-[#333333] p-4 rounded-lg border border-playstore-separator">
                  <div className="flex-1">
                    <Button 
                      onClick={handleSelectOutputDir}
                      className="bg-[#0D6EFD] hover:bg-[#0D6EFD]/90 text-white"
                    >
                      <FolderOpen className="mr-2" size={16} />
                      Selecionar Destino
                    </Button>
                    <p className="text-sm text-muted-foreground mt-2">
                      {formState.outputDirectory}
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Conteúdo da aba Avançado */}
            <TabsContent value="advanced" className="space-y-6">
              <div className="bg-[#333333] p-5 rounded-lg border border-playstore-separator">
                <h3 className="text-md font-medium mb-4 flex items-center">
                  <Code className="mr-2" size={18} />
                  Configurações de Build
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-4">
                    <FormField 
                      label="Tipo de Build" 
                      hint="Selecione o tipo de build para o AAB"
                    >
                      <select
                        className="form-field bg-[#2A2A2A]"
                        value={formState.bundleType}
                        onChange={(e) => handleChange('bundleType', e.target.value)}
                      >
                        <option value="release">Release</option>
                        <option value="debug">Debug</option>
                        <option value="profile">Profile</option>
                      </select>
                    </FormField>

                    <FormField 
                      label="Flavor" 
                      hint="Opcional: Selecione um product flavor específico"
                    >
                      <select
                        className="form-field bg-[#2A2A2A]"
                        value={formState.flavor}
                        onChange={(e) => handleChange('flavor', e.target.value)}
                      >
                        <option value="">Nenhum (padrão)</option>
                        <option value="free">Free</option>
                        <option value="paid">Paid</option>
                        <option value="demo">Demo</option>
                      </select>
                    </FormField>
                  </div>

                  <div className="space-y-4">
                    <div className="flex flex-col space-y-3">
                      <label className="text-sm font-medium flex items-center">
                        <GitBranch className="w-4 h-4 mr-2" />
                        Opções de Divisão de APKs
                      </label>

                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={formState.splitByDensity}
                          onCheckedChange={(checked) => handleChange('splitByDensity', checked)}
                          className="data-[state=checked]:bg-[#0D6EFD]"
                        />
                        <span className="text-sm">Dividir por densidade de tela</span>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={formState.splitByAbi}
                          onCheckedChange={(checked) => handleChange('splitByAbi', checked)}
                          className="data-[state=checked]:bg-[#0D6EFD]"
                        />
                        <span className="text-sm">Dividir por arquitetura (ABI)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#333333] p-5 rounded-lg border border-playstore-separator">
                <h3 className="text-md font-medium mb-4 flex items-center">
                  <Sliders className="mr-2" size={18} />
                  Otimizações
                </h3>

                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={formState.minifyEnabled}
                      onCheckedChange={(checked) => handleChange('minifyEnabled', checked)}
                      className="data-[state=checked]:bg-[#0D6EFD]"
                    />
                    <span className="text-sm">Habilitar minificação de código</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={formState.shrinkResources}
                      onCheckedChange={(checked) => handleChange('shrinkResources', checked)}
                      className="data-[state=checked]:bg-[#0D6EFD]"
                    />
                    <span className="text-sm">Reduzir recursos não utilizados</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={formState.proguardEnabled}
                      onCheckedChange={(checked) => handleChange('proguardEnabled', checked)}
                      className="data-[state=checked]:bg-[#0D6EFD]"
                    />
                    <span className="text-sm">Habilitar ProGuard</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={formState.enableR8}
                      onCheckedChange={(checked) => handleChange('enableR8', checked)}
                      className="data-[state=checked]:bg-[#0D6EFD]"
                    />
                    <span className="text-sm">Usar compilador R8</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={formState.debuggable}
                      onCheckedChange={(checked) => handleChange('debuggable', checked)}
                      className="data-[state=checked]:bg-[#0D6EFD]"
                    />
                    <span className="text-sm">Permitir debug</span>
                  </div>
                </div>

                {formState.debuggable && (
                  <div className="mt-3 p-3 bg-amber-900/20 border border-amber-500/30 rounded-md flex items-start">
                    <AlertTriangle className="text-amber-500 mr-2 mt-0.5 flex-shrink-0" size={16} />
                    <p className="text-xs text-amber-400">
                      Permitir debug em builds de produção pode expor informações sensíveis. 
                      Apenas habilite esta opção para testes.
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Conteúdo da aba Logs */}
            <TabsContent value="logs" className="space-y-6">
              <div className="bg-[#1A1A1A] rounded-lg border border-playstore-separator p-4">
                <h3 className="text-md font-medium mb-4 flex items-center">
                  <Terminal className="mr-2" size={18} />
                  Logs de Build
                </h3>

                <ScrollArea className="h-[250px] font-mono text-sm">
                  {buildLogs.length > 0 ? (
                    <div className="space-y-1">
                      {buildLogs.map((log, index) => (
                        <div key={index} className="flex">
                          <span className="text-gray-500 mr-2">{`[${index + 1}]`}</span>
                          <span>{log}</span>
                        </div>
                      ))}
                      {isGenerating && (
                        <div className="flex items-center mt-2">
                          <Loader2 className="animate-spin mr-2" size={16} />
                          <span>Processando...</span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      Nenhum log disponível. Inicie a geração do AAB para ver logs.
                    </div>
                  )}
                </ScrollArea>

                {isGenerating && (
                  <div className="mt-4">
                    <label className="text-sm mb-1 block">Progresso:</label>
                    <div className="space-y-2">
                      <Progress value={buildProgress} className="h-2" />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>0%</span>
                        <span>{buildProgress}%</span>
                        <span>100%</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>

          {/* Botão de Geração */}
          <div className="pt-6 flex justify-center border-t border-playstore-separator mt-6">
            <Button 
              className="bg-[#0D6EFD] hover:bg-[#0D6EFD]/90 text-white min-w-[200px] h-12"
              onClick={handleGenerateAAB}
              disabled={isGenerating}
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Gerando AAB...
                </>
              ) : (
                <>
                  <Package className="mr-2" size={18} />
                  Gerar AAB
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GerarAAB;
