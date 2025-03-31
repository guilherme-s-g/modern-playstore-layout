
import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Package, Download, RefreshCw, CheckCircle } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { useToast } from "@/components/ui/use-toast";

const GerarAAB = () => {
  const [activeSection, setActiveSection] = useState('gerar-aab');
  const [darkMode, setDarkMode] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [completed, setCompleted] = useState(false);
  const { toast } = useToast();

  const handleGenerateAAB = () => {
    setGenerating(true);
    setProgress(0);
    setCompleted(false);

    // Simulação do progresso
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress = prevProgress + Math.random() * 10;
        if (newProgress >= 100) {
          clearInterval(interval);
          setCompleted(true);
          setGenerating(false);
          
          toast({
            title: "AAB gerado com sucesso!",
            description: "Seu arquivo AAB está pronto para download.",
            variant: "default",
          });
          
          return 100;
        }
        return newProgress;
      });
    }, 600);
  };

  const handleDownload = () => {
    toast({
      title: "Download iniciado",
      description: "O arquivo AAB está sendo baixado para seu computador.",
    });
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
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Gerar Arquivo AAB</h1>
          
          <Card className="customtk-card p-6 mb-6 animate-fade-in">
            <div className="flex items-center mb-4">
              <Package className="w-6 h-6 text-customtk-blue mr-3" />
              <h2 className="text-xl font-semibold">Configurações de Build</h2>
            </div>
            
            <Separator className="my-4 bg-customtk-separator" />
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="form-field-label">Versão do App</label>
                <input 
                  type="text" 
                  className="form-field" 
                  placeholder="1.0.0" 
                  defaultValue="1.2.3"
                />
                <p className="form-field-hint">Siga o formato semântico (x.y.z)</p>
              </div>
              
              <div>
                <label className="form-field-label">Build Number</label>
                <input 
                  type="number" 
                  className="form-field" 
                  placeholder="123" 
                  defaultValue="42"
                />
                <p className="form-field-hint">Número inteiro incremental</p>
              </div>
              
              <div>
                <label className="form-field-label">Tipo de Build</label>
                <select className="form-field">
                  <option value="release">Release</option>
                  <option value="debug">Debug</option>
                  <option value="profile">Profile</option>
                </select>
              </div>
              
              <div>
                <label className="form-field-label">Variante</label>
                <select className="form-field">
                  <option value="produção">Produção</option>
                  <option value="homologação">Homologação</option>
                  <option value="desenvolvimento">Desenvolvimento</option>
                </select>
              </div>
            </div>
            
            <Separator className="my-6 bg-customtk-separator" />
            
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center text-sm text-muted-foreground">
                <ArrowRight className="w-4 h-4 mr-2" />
                <span>Certifique-se de que todas as configurações estão corretas antes de gerar o AAB.</span>
              </div>
              
              <Button 
                onClick={handleGenerateAAB} 
                className="customtk-button"
                disabled={generating}
              >
                {generating ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Gerando AAB...
                  </>
                ) : (
                  <>
                    <Package className="w-4 h-4 mr-2" />
                    Gerar AAB
                  </>
                )}
              </Button>
            </div>
          </Card>
          
          {(generating || completed) && (
            <Card className="customtk-card p-6 animate-slide-in">
              <h2 className="text-xl font-semibold mb-4">
                {completed ? "AAB Gerado com Sucesso!" : "Gerando AAB..."}
              </h2>
              
              {!completed && (
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span>Progresso</span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                  <p className="text-sm text-muted-foreground">
                    Compilando e empacotando o aplicativo... aguarde.
                  </p>
                </div>
              )}
              
              {completed && (
                <div className="space-y-4">
                  <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-md text-green-400">
                    <p className="flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Arquivo AAB gerado com sucesso!
                    </p>
                  </div>
                  
                  <div className="bg-customtk-dark p-4 rounded-md border border-customtk-separator">
                    <p className="text-sm mb-2">Informações do arquivo:</p>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>Nome: meu-app-1.2.3-release.aab</li>
                      <li>Tamanho: 28.4 MB</li>
                      <li>Data: {new Date().toLocaleDateString()}</li>
                    </ul>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button 
                      onClick={handleDownload} 
                      className="customtk-button"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Baixar AAB
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default GerarAAB;
