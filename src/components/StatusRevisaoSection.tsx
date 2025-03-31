
import React, { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  RefreshCw, 
  PlayCircle 
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import FormField from '@/components/FormField';

const StatusRevisaoSection = () => {
  const { toast } = useToast();
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
  );
};

export default StatusRevisaoSection;
