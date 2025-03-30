
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
  Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import FormField from '@/components/FormField';
import { useToast } from '@/hooks/use-toast';
import { Switch } from '@/components/ui/switch';

const GerarAAB = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [useDefaultKeystore, setUseDefaultKeystore] = useState(false);
  const [formState, setFormState] = useState({
    project: '',
    keystore: '',
    keystorePassword: '',
    keyAlias: '',
    keyPassword: '',
    outputDirectory: 'Diretório padrão do projeto'
  });

  const handleChange = (field: string, value: string) => {
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
    
    // Simular operação de geração
    setTimeout(() => {
      setIsGenerating(false);
      toast({
        title: "AAB Gerado com Sucesso",
        description: `O arquivo AAB foi gerado em ${formState.outputDirectory}`,
        variant: "default",
      });
    }, 3000);
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
          <div className="space-y-8">
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

            {/* Botão de Geração */}
            <div className="pt-4 flex justify-center">
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
    </div>
  );
};

export default GerarAAB;
