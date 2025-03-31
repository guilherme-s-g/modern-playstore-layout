
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Clipboard, 
  CheckCircle, 
  AlertCircle, 
  Clock, 
  Activity,
  RefreshCw,
  FileText,
  ChevronRight,
  BarChart4,
  AlertTriangle,
  CheckCircle2,
  Play,
  Square,
  RotateCw,
  ArrowUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import FormField from '@/components/FormField';

const StatusCard = ({ title, icon, status, description, progress }: { 
  title: string; 
  icon: React.ReactNode; 
  status: 'completed' | 'in-progress' | 'pending' | 'warning';
  description: string;
  progress?: number;
}) => {
  const statusColors = {
    'completed': 'bg-green-500/20 text-green-400',
    'in-progress': 'bg-blue-500/20 text-blue-400',
    'pending': 'bg-gray-500/20 text-gray-400',
    'warning': 'bg-yellow-500/20 text-yellow-400'
  };

  const statusIcons = {
    'completed': <CheckCircle2 size={16} className="text-green-400" />,
    'in-progress': <Activity size={16} className="text-blue-400" />,
    'pending': <Clock size={16} className="text-gray-400" />,
    'warning': <AlertTriangle size={16} className="text-yellow-400" />
  };

  return (
    <div className="bg-[#333333] rounded-lg border border-playstore-separator p-4">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center">
          <div className="mr-3 p-2 bg-[#424242] rounded-lg">
            {icon}
          </div>
          <div>
            <h3 className="font-medium text-white">{title}</h3>
            <span className={`inline-flex items-center text-xs px-2 py-0.5 rounded-full mt-1 ${statusColors[status]}`}>
              {statusIcons[status]}
              <span className="ml-1">
                {status === 'completed' && 'Concluído'}
                {status === 'in-progress' && 'Em andamento'}
                {status === 'pending' && 'Pendente'}
                {status === 'warning' && 'Atenção necessária'}
              </span>
            </span>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="rounded-full h-8 w-8 text-muted-foreground hover:text-white">
          <ChevronRight size={18} />
        </Button>
      </div>
      
      <p className="text-sm text-muted-foreground mb-3">{description}</p>
      
      {progress !== undefined && (
        <div className="space-y-2">
          <Progress value={progress} className="h-2" />
          <p className="text-xs text-right text-muted-foreground">{progress}% concluído</p>
        </div>
      )}
    </div>
  );
};

const StatusRevisao = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [packageName, setPackageName] = useState('com.exemplo.app');
  const [track, setTrack] = useState('production');
  const [statusAtual, setStatusAtual] = useState('Aguardando...');
  const [monitoring, setMonitoring] = useState(false);
  
  // Dados simulados
  const [appData, setAppData] = useState({
    trackInfo: 'production',
    version: '2.1.0',
    versionName: 'Release 2.1.0',
    lastUpdate: '22/05/2023 15:32'
  });
  
  // Simular carregamento
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleVerifyStatus = () => {
    setRefreshing(true);
    
    // Simular verificação
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
                <Clipboard className="mr-2" /> Monitor de Status de Revisão
              </h1>
              <p className="text-muted-foreground text-sm">
                Acompanhe o progresso da revisão do seu aplicativo na Google Play
              </p>
            </div>
          </div>
        </div>
        
        {loading ? (
          <div className="bg-[#2A2A2A] rounded-lg shadow-lg border border-playstore-separator p-8 animate-pulse flex flex-col items-center justify-center">
            <div className="h-12 w-12 rounded-full bg-[#333333] mb-4"></div>
            <div className="h-6 w-64 bg-[#333333] rounded mb-3"></div>
            <div className="h-4 w-48 bg-[#333333] rounded"></div>
          </div>
        ) : (
          <div className="bg-[#2A2A2A] rounded-lg shadow-lg border border-playstore-separator p-6 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <FormField 
                  label="Package Name" 
                  required={true}
                  className="mb-4"
                >
                  <Input 
                    value={packageName}
                    onChange={(e) => setPackageName(e.target.value)}
                    placeholder="ex: com.exemplo.app"
                    className="bg-[#333333] border-playstore-separator"
                  />
                </FormField>
                
                <FormField 
                  label="Faixa" 
                  required={true}
                >
                  <Select 
                    value={track} 
                    onValueChange={setTrack}
                  >
                    <SelectTrigger className="bg-[#333333] border-playstore-separator">
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
              
              <div className="bg-[#333333] rounded-lg p-6 border border-playstore-separator">
                <h2 className="text-lg font-semibold text-white mb-4">Informações do Aplicativo</h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-playstore-separator pb-2">
                    <span className="text-muted-foreground">Status atual:</span>
                    <span className="font-medium text-white">{statusAtual}</span>
                  </div>
                  
                  <div className="flex justify-between items-center border-b border-playstore-separator pb-2">
                    <span className="text-muted-foreground">Track:</span>
                    <span className="font-medium text-white">{appData.trackInfo}</span>
                  </div>
                  
                  <div className="flex justify-between items-center border-b border-playstore-separator pb-2">
                    <span className="text-muted-foreground">Versão:</span>
                    <span className="font-medium text-white">{appData.version}</span>
                  </div>
                  
                  <div className="flex justify-between items-center border-b border-playstore-separator pb-2">
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
              <h2 className="text-lg font-semibold text-white mb-4 border-b border-playstore-separator pb-2">
                Histórico de atualizações
              </h2>
              
              <div className="bg-[#333333] rounded-lg p-4 border border-playstore-separator h-64 overflow-y-auto">
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
                    'bg-[#424242] border-playstore-separator text-muted-foreground'
                  }`}>
                    <div className="flex justify-between items-start">
                      <div className="flex items-start">
                        {item.type === 'success' && <CheckCircle2 size={16} className="mt-0.5 mr-2" />}
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
                  <Play size={18} />
                  Iniciar Monitoramento
                </Button>
              ) : (
                <Button 
                  className="bg-[#F44336] hover:bg-[#F44336]/80 gap-2"
                  onClick={handleStopMonitoring}
                >
                  <Square size={18} />
                  Parar Monitoramento
                </Button>
              )}
              
              <Button 
                variant="outline" 
                className="gap-2"
                onClick={handleVerifyStatus}
                disabled={refreshing}
              >
                <RotateCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
                Atualizar Agora
              </Button>
              
              <Button 
                variant="outline" 
                className="gap-2"
              >
                <ArrowUp size={18} />
                Promover Versão
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatusRevisao;
