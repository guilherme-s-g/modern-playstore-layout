
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
  CheckCircle2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Progress } from '@/components/ui/progress';

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
  const [selectedApp, setSelectedApp] = useState('MeuApp - v2.1.0');
  
  // Simular carregamento
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleRefresh = () => {
    setRefreshing(true);
    
    // Simular atualização
    setTimeout(() => {
      setRefreshing(false);
      toast({
        title: "Status atualizado",
        description: "Os dados de revisão foram atualizados com sucesso.",
      });
    }, 2000);
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
                <Clipboard className="mr-2" /> Status da Revisão
              </h1>
              <p className="text-muted-foreground text-sm">
                Acompanhe o progresso da revisão do seu aplicativo
              </p>
            </div>
          </div>
          
          <Button 
            variant="outline" 
            className="gap-2"
            onClick={handleRefresh}
            disabled={refreshing}
          >
            <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
            Atualizar
          </Button>
        </div>
        
        {loading ? (
          <div className="bg-[#2A2A2A] rounded-lg shadow-lg border border-playstore-separator p-8 animate-pulse flex flex-col items-center justify-center">
            <div className="h-12 w-12 rounded-full bg-[#333333] mb-4"></div>
            <div className="h-6 w-64 bg-[#333333] rounded mb-3"></div>
            <div className="h-4 w-48 bg-[#333333] rounded"></div>
          </div>
        ) : (
          <>
            <div className="bg-[#2A2A2A] rounded-lg shadow-lg border border-playstore-separator p-6 animate-fade-in mb-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-14 w-14 bg-gray-700 rounded-xl mr-4 flex items-center justify-center">
                    <img 
                      src="/public/lovable-uploads/2aa8c895-c062-47d4-8ec2-4a79b5556a5c.png" 
                      alt="App Icon" 
                      className="h-10 w-10 rounded-lg"
                    />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-white">{selectedApp}</h2>
                    <div className="flex items-center mt-1">
                      <span className="bg-yellow-500/20 text-yellow-400 text-xs px-2 py-0.5 rounded-full flex items-center">
                        <Clock size={12} className="mr-1" />
                        Em Revisão
                      </span>
                      <span className="text-xs text-muted-foreground ml-3">
                        Enviado em 22/05/2023
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <select 
                    className="bg-[#333333] text-sm border border-playstore-separator rounded-md px-3 py-1.5 text-white"
                    value={selectedApp}
                    onChange={(e) => setSelectedApp(e.target.value)}
                  >
                    <option value="MeuApp - v2.1.0">MeuApp - v2.1.0</option>
                    <option value="MeuApp - v2.0.5">MeuApp - v2.0.5</option>
                    <option value="App Secundário - v1.3.2">App Secundário - v1.3.2</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-[#333333] rounded-lg p-4 border border-playstore-separator">
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Tempo em Revisão</h3>
                  <div className="flex items-baseline">
                    <span className="text-2xl font-semibold text-white">2</span>
                    <span className="text-muted-foreground ml-1">dias</span>
                    <span className="text-white mx-1">:</span>
                    <span className="text-2xl font-semibold text-white">5</span>
                    <span className="text-muted-foreground ml-1">horas</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Tempo médio: 3-7 dias</p>
                </div>
                
                <div className="bg-[#333333] rounded-lg p-4 border border-playstore-separator">
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Progresso Geral</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-semibold text-white">65%</span>
                    <BarChart4 className="text-muted-foreground" size={28} />
                  </div>
                  <div className="mt-2">
                    <Progress value={65} className="h-2" />
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <StatusCard 
                  title="Verificação de Políticas" 
                  icon={<FileText size={24} className="text-white" />}
                  status="completed"
                  description="A verificação das políticas do app foi concluída com sucesso." 
                  progress={100}
                />
                
                <StatusCard 
                  title="Verificação de Conteúdo" 
                  icon={<AlertCircle size={24} className="text-white" />}
                  status="in-progress"
                  description="A verificação de conteúdo está em andamento. Isso pode levar alguns dias." 
                  progress={50}
                />
                
                <StatusCard 
                  title="Testes do Aplicativo" 
                  icon={<Activity size={24} className="text-white" />}
                  status="in-progress"
                  description="Os testes estão sendo executados para verificar o comportamento do app." 
                  progress={75}
                />
                
                <StatusCard 
                  title="Verificação Final" 
                  icon={<CheckCircle size={24} className="text-white" />}
                  status="pending"
                  description="A verificação final ocorrerá após a conclusão de todas as etapas anteriores." 
                  progress={0}
                />
              </div>
            </div>
            
            <div className="bg-[#2A2A2A] rounded-lg shadow-lg border border-playstore-separator p-6 animate-fade-in">
              <h2 className="text-lg font-semibold mb-4 border-b border-playstore-separator pb-2">
                Histórico de Feedback
              </h2>
              
              <div className="space-y-3">
                {[
                  { date: '2023-05-22 15:32', text: 'Aplicativo enviado para revisão', type: 'info' },
                  { date: '2023-05-23 09:45', text: 'Iniciada verificação de políticas', type: 'info' },
                  { date: '2023-05-23 14:20', text: 'Verificação de políticas concluída com sucesso', type: 'success' },
                  { date: '2023-05-23 14:25', text: 'Iniciada verificação de conteúdo', type: 'info' },
                  { date: '2023-05-24 10:15', text: 'Aviso: Certifique-se de que sua política de privacidade está atualizada', type: 'warning' }
                ].map((item, index) => (
                  <div key={index} className={`p-3 rounded-lg border ${
                    item.type === 'success' ? 'bg-green-500/10 border-green-500/30 text-green-400' : 
                    item.type === 'warning' ? 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400' : 
                    'bg-[#333333] border-playstore-separator text-muted-foreground'
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
          </>
        )}
      </div>
    </div>
  );
};

export default StatusRevisao;
